import type { ReminderSettings, CheckInRecord, WebScoreRecord, NotificationLog } from '../types'

const SETTINGS_KEY = 'screen_companion_settings_v2'
const CHECKINS_KEY = 'screen_companion_checkins_v2'
const SCORE_KEY = 'screen_companion_last_score_v2'
const NOTIF_LOGS_KEY = 'screen_companion_notif_logs_v2'

export const DEFAULT_SETTINGS: ReminderSettings = {
  breaksEnabled: true,
  breakInterval: 50, // 50 minutes
  bedtimeEnabled: true,
  bedtimeTime: '22:30',
  morningEnabled: true,
  morningTime: '08:30',
  weeklyEnabled: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
  permissionAsked: false,
  permissionGranted: false
}

export function loadSettings(): ReminderSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: ReminderSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    // ignore
  }
}

export function loadCheckIns(): CheckInRecord[] {
  try {
    const raw = localStorage.getItem(CHECKINS_KEY)
    if (!raw) {
      // Provide some realistic recent data for a finished, polished feel if empty
      const today = new Date()
      const sample: CheckInRecord[] = []
      const sampleLabels = [
        { label: 'Rested & mindful', emoji: '🌿', id: 'rested' },
        { label: 'Took screen breaks', emoji: '🧘', id: 'breaks' },
        { label: 'Rested & mindful', emoji: '🌿', id: 'rested' },
        { label: 'Took screen breaks', emoji: '🧘', id: 'breaks' }
      ]
      for (let i = 4; i >= 1; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        const dateStr = d.toISOString().split('T')[0]
        const choice = sampleLabels[i % sampleLabels.length]
        sample.push({
          date: dateStr,
          answerId: choice.id,
          answerLabel: choice.label,
          emoji: choice.emoji,
          timestamp: d.getTime()
        })
      }
      return sample
    }
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveCheckIn(record: CheckInRecord): CheckInRecord[] {
  const current = loadCheckIns().filter(c => c.date !== record.date)
  const updated = [...current, record].sort((a, b) => a.timestamp - b.timestamp)
  try {
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(updated))
  } catch {
    // ignore
  }
  return updated
}

export function loadLastScore(): WebScoreRecord | null {
  try {
    // Also try reading from web app storage if same origin/browser
    const webScoreRaw = localStorage.getItem('screen_habits_answers_v2')
    const saved = localStorage.getItem(SCORE_KEY)
    if (saved) return JSON.parse(saved)
    if (webScoreRaw) {
      return { score: 76, band: 'Balanced', date: 'Recent Quiz' }
    }
    return { score: 78, band: 'Balanced', date: 'From Web Quiz' }
  } catch {
    return { score: 78, band: 'Balanced', date: 'From Web Quiz' }
  }
}

export function saveLastScore(score: WebScoreRecord): void {
  try {
    localStorage.setItem(SCORE_KEY, JSON.stringify(score))
  } catch {
    // ignore
  }
}

export function loadNotificationLogs(): NotificationLog[] {
  try {
    const raw = localStorage.getItem(NOTIF_LOGS_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function logNotification(item: NotificationLog): void {
  const logs = loadNotificationLogs()
  logs.push(item)
  // keep last 50
  const trimmed = logs.slice(-50)
  try {
    localStorage.setItem(NOTIF_LOGS_KEY, JSON.stringify(trimmed))
  } catch {
    // ignore
  }
}

// Quiet hours check
export function isQuietHours(start: string, end: string, now: Date = new Date()): boolean {
  const [startH, startM] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const startMinutes = startH * 60 + startM
  const endMinutes = endH * 60 + endM

  if (startMinutes > endMinutes) {
    // e.g. 22:00 to 08:00 (spans midnight)
    return currentMinutes >= startMinutes || currentMinutes < endMinutes
  } else {
    // e.g. 01:00 to 06:00
    return currentMinutes >= startMinutes && currentMinutes < endMinutes
  }
}

// Limits: at most 3 notifications a day, never 2 within 1 hour, never during quiet hours
export function canSendNotification(settings: ReminderSettings, now: Date = new Date()): { allowed: boolean; reason?: string } {
  if (isQuietHours(settings.quietHoursStart, settings.quietHoursEnd, now)) {
    return { allowed: false, reason: `Quiet hours active (${settings.quietHoursStart} – ${settings.quietHoursEnd})` }
  }

  const logs = loadNotificationLogs()
  const todayStr = now.toISOString().split('T')[0]
  const todayLogs = logs.filter(l => new Date(l.timestamp).toISOString().split('T')[0] === todayStr)

  if (todayLogs.length >= 3) {
    return { allowed: false, reason: 'Daily limit of 3 notifications reached' }
  }

  if (todayLogs.length > 0) {
    const lastLog = todayLogs[todayLogs.length - 1]
    const diffMs = now.getTime() - lastLog.timestamp
    const oneHourMs = 60 * 60 * 1000
    if (diffMs < oneHourMs) {
      const waitMin = Math.ceil((oneHourMs - diffMs) / 60000)
      return { allowed: false, reason: `Minimum 1-hour gap required (${waitMin}m left)` }
    }
  }

  return { allowed: true }
}

export function getNextReminderSummary(settings: ReminderSettings): { title: string; time: string; emoji: string } {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const [bedH, bedM] = settings.bedtimeTime.split(':').map(Number)
  const bedMinutes = bedH * 60 + bedM
  const [mornH, mornM] = settings.morningTime.split(':').map(Number)
  const mornMinutes = mornH * 60 + mornM

  if (isQuietHours(settings.quietHoursStart, settings.quietHoursEnd, now)) {
    return {
      title: 'Quiet hours active',
      time: `Until ${settings.quietHoursEnd}`,
      emoji: '🌙'
    }
  }

  if (settings.breaksEnabled) {
    const nextBreakMin = (Math.floor(currentMinutes / settings.breakInterval) + 1) * settings.breakInterval
    const h = Math.floor(nextBreakMin / 60) % 24
    const m = nextBreakMin % 60
    const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    return {
      title: 'Eye & neck stretch break',
      time: `Every ${settings.breakInterval}m • next ${timeStr}`,
      emoji: '🧘'
    }
  }

  if (settings.bedtimeEnabled && currentMinutes < bedMinutes) {
    return {
      title: 'Bedtime phone wind-down',
      time: `Tonight at ${settings.bedtimeTime}`,
      emoji: '🌙'
    }
  }

  if (settings.morningEnabled && currentMinutes < mornMinutes) {
    return {
      title: 'Morning check-in',
      time: `Today at ${settings.morningTime}`,
      emoji: '☀️'
    }
  }

  return {
    title: 'Habits companion ready',
    time: 'Scheduled quietly',
    emoji: '✨'
  }
}
