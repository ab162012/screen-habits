import React, { useState } from 'react'
import type { CheckInRecord } from '../types'

interface CheckInScreenProps {
  checkIns: CheckInRecord[]
  onSaveCheckIn: (record: CheckInRecord) => void
  onCancel: () => void
}

export const CheckInScreen: React.FC<CheckInScreenProps> = ({
  checkIns,
  onSaveCheckIn,
  onCancel
}) => {
  const [selected, setSelected] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]

  // Calculate streak
  let streak = 0
  const sortedDates = [...new Set(checkIns.map(c => c.date))].sort().reverse()
  let checkDate = new Date(now)
  // Check if today or yesterday is logged to continue streak
  for (let i = 0; i < 30; i++) {
    const dStr = checkDate.toISOString().split('T')[0]
    if (sortedDates.includes(dStr)) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else if (i === 0) {
      // today not logged yet, check yesterday
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

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

  const options = [
    {
      id: 'rested',
      emoji: '🌿',
      label: 'Rested & mindful',
      desc: 'Slept well, calm screen habits'
    },
    {
      id: 'breaks',
      emoji: '🧘',
      label: 'Took screen breaks',
      desc: 'Rested eyes and stretched neck'
    },
    {
      id: 'late_scrolling',
      emoji: '🌙',
      label: 'Late night scrolling',
      desc: 'Used phone in bed before sleep'
    },
    {
      id: 'eye_strain',
      emoji: '👁️',
      label: 'Heavy eye strain',
      desc: 'Long stretches without a break'
    }
  ]

  const handleSelect = (opt: typeof options[0]) => {
    setSelected(opt.id)
    setConfirmed(true)

    const record: CheckInRecord = {
      date: todayStr,
      answerId: opt.id,
      answerLabel: opt.label,
      emoji: opt.emoji,
      timestamp: Date.now()
    }

    setTimeout(() => {
      onSaveCheckIn(record)
    }, 450)
  }

  return (
    <div className="app-container" style={{ padding: '16px 16px 96px 16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={onCancel}
          className="btn-ghost"
          style={{ padding: '8px 12px', fontSize: '13px' }}
        >
          ← Back
        </button>

        <span style={{ fontSize: '13px', fontWeight: 600, color: '#7C3AED' }}>
          Daily Check-in
        </span>

        <div style={{ width: '50px' }} />
      </div>

      {/* Small Streak Card on top */}
      <div className="companion-card" style={{ marginBottom: '16px', background: '#F5F3FF', border: '1px solid #EDE9FE' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🔥</span>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#7C3AED' }}>
                {streak + (confirmed ? 1 : 0)} Day Streak
              </div>
              <div style={{ fontSize: '12px', color: '#475569' }}>
                Consistency builds automatic screen balance
              </div>
            </div>
          </div>
        </div>

        <div className="week-dots">
          {weekDots.map((dot, i) => (
            <div key={i} className="day-dot-item">
              <span className="day-dot-label">{dot.label}</span>
              <div
                className={`day-dot ${dot.completed || (dot.isToday && confirmed) ? 'active' : 'inactive'} ${dot.isToday ? 'today' : ''}`}
              >
                {dot.completed || (dot.isToday && confirmed) ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Single Question */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#0F172A', marginBottom: '6px' }}>
          How did your screen habits feel today?
        </h1>
        <p style={{ fontSize: '13px', color: '#475569' }}>
          One tap saves to your device.
        </p>
      </div>

      {/* Tidy 2-column Grid of Options */}
      <div className="grid-2x2" style={{ marginBottom: '20px' }}>
        {options.map(opt => {
          const isChosen = selected === opt.id
          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className="companion-card"
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                border: isChosen ? '2px solid #7C3AED' : '1px solid #EDE9FE',
                backgroundColor: isChosen ? '#F5F3FF' : '#FFFFFF',
                transform: isChosen ? 'scale(0.98)' : 'scale(1)',
                transition: 'all 0.16s ease'
              }}
              id={`checkin-opt-${opt.id}`}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{opt.emoji}</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '4px' }}>
                {opt.label}
              </div>
              <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.3 }}>
                {opt.desc}
              </div>
            </div>
          )
        })}
      </div>

      {/* Confirmation feedback */}
      {confirmed && (
        <div
          style={{
            textAlign: 'center',
            padding: '12px',
            background: '#F5F3FF',
            borderRadius: '16px',
            color: '#7C3AED',
            fontSize: '13px',
            fontWeight: 500,
            animation: 'fadeIn 0.2s ease'
          }}
        >
          ✓ Saved to device! Returning to Home...
        </div>
      )}
    </div>
  )
}
