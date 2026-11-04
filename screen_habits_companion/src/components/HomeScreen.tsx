import React from 'react'
import type { ReminderSettings, CheckInRecord, WebScoreRecord, ActiveTab } from '../types'
import { getNextReminderSummary } from '../services/storage'

interface HomeScreenProps {
  settings: ReminderSettings
  checkIns: CheckInRecord[]
  lastScore: WebScoreRecord | null
  onNavigate: (tab: ActiveTab) => void
  onOpenQuestionnaire: () => void
  onOpenAbout: () => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  settings,
  checkIns,
  lastScore,
  onNavigate,
  onOpenQuestionnaire,
  onOpenAbout
}) => {
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  
  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })

  const nextReminder = getNextReminderSummary(settings)

  // Today check-in status
  const todayStr = now.toISOString().split('T')[0]
  const todayCheckIn = checkIns.find(c => c.date === todayStr)

  // This week calculation (last 7 days Mon-Sun or recent 7 days)
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  // Find Monday of current week
  const dayIndex = (now.getDay() + 6) % 7 // Mon=0, Sun=6
  const weekDots = daysOfWeek.map((dayLabel, idx) => {
    const d = new Date(now)
    d.setDate(now.getDate() - dayIndex + idx)
    const dStr = d.toISOString().split('T')[0]
    const completed = checkIns.some(c => c.date === dStr)
    const isToday = idx === dayIndex
    return {
      label: dayLabel,
      completed,
      isToday,
      dateStr: dStr
    }
  })

  const completedCount = weekDots.filter(d => d.completed).length

  return (
    <div className="app-container" style={{ padding: '16px 16px 96px 16px' }}>
      {/* Top Bar with Info button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#7C3AED' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#7C3AED', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Screen Habits Companion
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenAbout}
          className="btn-ghost"
          style={{ width: '36px', height: '36px', minHeight: '36px', padding: 0, borderRadius: '50%' }}
          title="About & Credits"
          id="btn-open-about"
        >
          <span style={{ fontSize: '18px' }}>ℹ️</span>
        </button>
      </div>

      {/* Top Greeting Card */}
      <div className="companion-card" style={{ marginBottom: '10px', background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', marginBottom: '2px' }}>
              {dateFormatted}
            </div>
            <h1 style={{ fontSize: '19px', fontWeight: 500, color: '#0F172A', marginBottom: '2px' }}>
              {greeting}
            </h1>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.3 }}>
              Gentle nudges keep your screen habits calm and balanced.
            </p>
          </div>
          <span style={{ fontSize: '26px' }}>🌱</span>
        </div>
      </div>

      {/* 2x2 Grid of Cards */}
      <div className="grid-2x2" style={{ marginBottom: '10px' }}>
        {/* 1. Next Reminder */}
        <div
          className="companion-card"
          onClick={() => onNavigate('reminders')}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '130px' }}
          id="card-next-reminder"
        >
          <div>
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>{nextReminder.emoji}</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A', marginBottom: '2px' }}>
              Next Reminder
            </div>
            <div style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 500, lineHeight: 1.3 }}>
              {nextReminder.title}
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '6px' }}>
            {nextReminder.time}
          </div>
        </div>

        {/* 2. Today's Check-in */}
        <div
          className="companion-card"
          onClick={() => onNavigate('checkin')}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          id="card-today-checkin"
        >
          <div>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              {todayCheckIn ? todayCheckIn.emoji : '☀️'}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '4px' }}>
              Today's Check-in
            </div>
            <div style={{ fontSize: '12px', color: todayCheckIn ? '#7C3AED' : '#475569', fontWeight: 500, lineHeight: 1.3 }}>
              {todayCheckIn ? todayCheckIn.answerLabel : 'Pending for today'}
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 500, marginTop: '10px' }}>
            {todayCheckIn ? 'Logged • Tap to change' : 'Tap to log habit →'}
          </div>
        </div>

        {/* 3. Your Last Score */}
        <div
          className="companion-card"
          onClick={onOpenQuestionnaire}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          id="card-last-score"
        >
          <div>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '4px' }}>
              Your Last Score
            </div>
            <div style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 600, lineHeight: 1.3 }}>
              {lastScore ? `${lastScore.score} / 100` : 'Take the quiz'}
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '10px' }}>
            {lastScore ? `${lastScore.band} • Retake` : 'Tap to start quiz →'}
          </div>
        </div>

        {/* 4. Quick Actions */}
        <div
          className="companion-card"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          id="card-quick-actions"
        >
          <div>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '4px' }}>
              Quick Actions
            </div>
            <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.3 }}>
              Open quiz or tune reminders
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ flex: 1, minHeight: '34px', padding: '6px 8px', fontSize: '11px' }}
              onClick={onOpenQuestionnaire}
            >
              Quiz ↗
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ flex: 1, minHeight: '34px', padding: '6px 8px', fontSize: '11px' }}
              onClick={() => onNavigate('reminders')}
            >
              Tune ⏰
            </button>
          </div>
        </div>
      </div>

      {/* Wide Card: This Week */}
      <div className="companion-card" style={{ marginBottom: '10px' }} id="card-this-week">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>
              This Week's Habits
            </div>
            <div style={{ fontSize: '11px', color: '#475569' }}>
              {completedCount} of 7 days logged
            </div>
          </div>
          <span style={{ fontSize: '18px' }}>🗓️</span>
        </div>

        <div className="week-dots">
          {weekDots.map((dot, i) => (
            <div key={i} className="day-dot-item">
              <span className="day-dot-label">{dot.label}</span>
              <div
                className={`day-dot ${dot.completed ? 'active' : 'inactive'} ${dot.isToday ? 'today' : ''}`}
                style={{ width: '26px', height: '26px', fontSize: '11px' }}
              >
                {dot.completed ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Home Screen Footer — EXACT WORDING FROM SECTION 2 */}
      <footer style={{ textAlign: 'center', padding: '6px 0', marginTop: '4px', marginBottom: '8px' }}>
        <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 400 }}>
          Made by Abdul Basit (Leader), SJB, Ebad Ilyas, Haider.
        </p>
      </footer>
    </div>
  )
}
