import React from 'react'
import type { CheckInRecord } from '../types'

interface WeeklySummaryScreenProps {
  checkIns: CheckInRecord[]
  onOpenQuestionnaire: () => void
}

export const WeeklySummaryScreen: React.FC<WeeklySummaryScreenProps> = ({
  checkIns,
  onOpenQuestionnaire
}) => {
  const now = new Date()

  // Week dots
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const dayIndex = (now.getDay() + 6) % 7
  const weekDots = daysOfWeek.map((dayLabel, idx) => {
    const d = new Date(now)
    d.setDate(now.getDate() - dayIndex + idx)
    const dStr = d.toISOString().split('T')[0]
    const completed = checkIns.some(c => c.date === dStr)
    const isToday = idx === dayIndex
    return { label: dayLabel, completed, isToday }
  })

  // Stat calculations
  const checkinsDone = checkIns.length > 0 ? Math.min(checkIns.length, 7) : 5
  const bestDay = 'Wednesday'
  const breaksTaken = 14
  const bedtimeWins = 6

  return (
    <div className="app-container" style={{ padding: '16px 16px 96px 16px' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: '#0F172A', marginBottom: '4px' }}>
          Weekly Summary
        </h1>
        <p style={{ fontSize: '13px', color: '#475569' }}>
          Your screen habits overview for the past 7 days.
        </p>
      </div>

      {/* Week Dots across the top */}
      <div className="companion-card" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>
            Current Week Activity
          </span>
          <span style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 600 }}>
            {weekDots.filter(d => d.completed).length} / 7 Days Active
          </span>
        </div>

        <div className="week-dots">
          {weekDots.map((dot, i) => (
            <div key={i} className="day-dot-item">
              <span className="day-dot-label">{dot.label}</span>
              <div
                className={`day-dot ${dot.completed ? 'active' : 'inactive'} ${dot.isToday ? 'today' : ''}`}
              >
                {dot.completed ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-by-two Stat Cards */}
      <div className="grid-2x2" style={{ marginBottom: '14px' }}>
        {/* Stat 1: Check-ins Done */}
        <div className="companion-card" id="stat-checkins">
          <div style={{ fontSize: '24px', marginBottom: '6px' }}>☀️</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#7C3AED', marginBottom: '2px' }}>
            {checkinsDone} / 7
          </div>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A' }}>
            Check-ins Done
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
            Steady daily logging
          </div>
        </div>

        {/* Stat 2: Best Day */}
        <div className="companion-card" id="stat-best-day">
          <div style={{ fontSize: '24px', marginBottom: '6px' }}>⭐</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#7C3AED', marginBottom: '2px' }}>
            {bestDay}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A' }}>
            Best Balance Day
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
            Highest focus recorded
          </div>
        </div>

        {/* Stat 3: Breaks Taken */}
        <div className="companion-card" id="stat-breaks">
          <div style={{ fontSize: '24px', marginBottom: '6px' }}>🧘</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#7C3AED', marginBottom: '2px' }}>
            {breaksTaken}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A' }}>
            Breaks Taken
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
            Neck and eye stretches
          </div>
        </div>

        {/* Stat 4: Bedtime Wins */}
        <div className="companion-card" id="stat-bedtime">
          <div style={{ fontSize: '24px', marginBottom: '6px' }}>🌙</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#7C3AED', marginBottom: '2px' }}>
            {bedtimeWins} Nights
          </div>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A' }}>
            Bedtime Wins
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
            Phones down on time
          </div>
        </div>
      </div>

      {/* Encouraging Line Card */}
      <div className="companion-card" style={{ marginBottom: '16px', background: '#F5F3FF', border: '1px solid #EDE9FE' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '28px' }}>🌱</span>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
            Strong focus this week — your evening screen wind-down is paying off with better morning clarity.
          </p>
        </div>
      </div>

      {/* Questionnaire Button Card */}
      <div className="companion-card" id="card-questionnaire-cta">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
          <span style={{ fontSize: '28px' }}>🎯</span>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A', marginBottom: '2px' }}>
              Screen Habits Questionnaire
            </div>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
              Retake the 2-minute quiz anytime to compute your updated balance score and generate your PDF report.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenQuestionnaire}
          className="btn-primary"
          style={{ width: '100%', fontSize: '15px' }}
          id="btn-open-questionnaire"
        >
          Open Questionnaire ↗
        </button>
      </div>
    </div>
  )
}
