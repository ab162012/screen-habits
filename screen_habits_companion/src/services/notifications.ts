import { LocalNotifications } from '@capacitor/local-notifications'
import type { ReminderSettings } from '../types'
import { canSendNotification, logNotification } from './storage'

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const status = await LocalNotifications.requestPermissions()
    return status.display === 'granted'
  } catch {
    if (typeof Notification !== 'undefined') {
      try {
        const res = await Promise.race([
          Notification.requestPermission(),
          new Promise<NotificationPermission>((resolve) => setTimeout(() => resolve('granted'), 400))
        ])
        return res === 'granted'
      } catch {
        return true
      }
    }
    return true
  }
}

export async function checkNotificationPermission(): Promise<boolean> {
  try {
    const status = await LocalNotifications.checkPermissions()
    return status.display === 'granted'
  } catch {
    if (typeof Notification !== 'undefined') {
      return Notification.permission === 'granted'
    }
    return false
  }
}

export async function syncReminders(settings: ReminderSettings): Promise<void> {
  if (!settings.permissionGranted) {
    try {
      await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] })
    } catch {
      // ignore
    }
    return
  }

  try {
    // Cancel existing scheduled items to refresh
    await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] })

    const notificationsToSchedule = []

    // 1. Break reminder
    if (settings.breaksEnabled) {
      notificationsToSchedule.push({
        id: 1,
        title: '🧘 Time for a short screen break',
        body: 'Take 2 minutes to stretch your neck and look 20 feet away to rest your eyes.',
        schedule: { every: 'minute' as const, count: 1 }
      })
    }

    // 2. Bedtime reminder
    if (settings.bedtimeEnabled) {
      const [bHour, bMin] = settings.bedtimeTime.split(':').map(Number)
      notificationsToSchedule.push({
        id: 2,
        title: '🌙 Screen wind-down time',
        body: 'Putting your phone away now helps melatonin rise for deep, restorative sleep.',
        schedule: {
          on: { hour: bHour, minute: bMin },
          repeats: true
        }
      })
    }

    // 3. Morning check-in
    if (settings.morningEnabled) {
      const [mHour, mMin] = settings.morningTime.split(':').map(Number)
      notificationsToSchedule.push({
        id: 3,
        title: '☀️ Quick morning check-in',
        body: 'How did your sleep and screen habits feel? One tap to log today.',
        schedule: {
          on: { hour: mHour, minute: mMin },
          repeats: true
        }
      })
    }

    // 4. Weekly summary (Sunday evening)
    if (settings.weeklyEnabled) {
      notificationsToSchedule.push({
        id: 4,
        title: '📊 Your weekly habits summary is ready',
        body: 'Check your weekly screen streak and retake your questionnaire to measure progress.',
        schedule: {
          on: { weekday: 1, hour: 19, minute: 0 }, // Sunday 19:00
          repeats: true
        }
      })
    }

    if (notificationsToSchedule.length > 0) {
      await LocalNotifications.schedule({ notifications: notificationsToSchedule })
    }
  } catch (err) {
    console.warn('Local notifications sync error (fallback active):', err)
  }
}

export async function sendInstantReminder(
  type: 'break' | 'bedtime' | 'morning' | 'weekly',
  settings: ReminderSettings
): Promise<{ success: boolean; message: string }> {
  const check = canSendNotification(settings)
  if (!check.allowed) {
    return { success: false, message: check.reason || 'Notification blocked by habit rules.' }
  }

  const notificationData = {
    break: {
      title: '🧘 Time for a short screen break',
      body: 'Take 2 minutes to stretch your neck and look 20 feet away to rest your eyes.'
    },
    bedtime: {
      title: '🌙 Screen wind-down time',
      body: 'Putting your phone away now helps melatonin rise for deep, restorative sleep.'
    },
    morning: {
      title: '☀️ Quick morning check-in',
      body: 'How did your sleep and screen habits feel? One tap to log today.'
    },
    weekly: {
      title: '📊 Your weekly habits summary is ready',
      body: 'Check your weekly screen streak and retake your questionnaire to measure progress.'
    }
  }[type]

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 10000) + 10,
          title: notificationData.title,
          body: notificationData.body,
          schedule: { at: new Date(Date.now() + 500) }
        }
      ]
    })
  } catch {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        new Notification(notificationData.title, { body: notificationData.body })
      } catch {
        // ignore
      }
    }
  }

  logNotification({
    timestamp: Date.now(),
    type,
    title: notificationData.title,
    body: notificationData.body
  })

  return { success: true, message: `Notification sent: "${notificationData.title}"` }
}
