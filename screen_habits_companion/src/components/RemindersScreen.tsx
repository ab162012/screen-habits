import React, { useState } from 'react'
import type { ReminderSettings } from '../types'
import { sendInstantReminder } from '../services/notifications'

interface RemindersScreenProps {
  settings: ReminderSettings
  onUpdateSettings: (settings: ReminderSettings) => void
}

export const RemindersScreen: React.FC<RemindersScreenProps> = ({
  settings,
  onUpdateSettings
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleToggle = (key: keyof ReminderSettings) => {
    const updated = { ...settings, [key]: !settings[key] }
    onUpdateSettings(updated)
    showToast(`Updated ${String(key).replace('Enabled', '')} reminder`)
  }

  const handleIntervalChange = (val: number) => {
    const updated = { ...settings, breakInterval: val }
    onUpdateSettings(updated)
    showToast(`Break interval set to ${val} minutes`)
  }

  const handleTimeChange = (key: 'bedtimeTime' | 'morningTime' | 'quietHoursStart' | 'quietHoursEnd', val: string) => {
    const updated = { ...settings, [key]: val }
    onUpdateSettings(updated)
    showToast(`Time updated to ${val}`)
  }

  const handleTestNotification = async (type: 'break' | 'bedtime' | 'morning' | 'weekly') => {
    const result = await sendInstantReminder(type, settings)
    showToast(result.message)
  }

  return (
    <div className="app-container" style={{ padding: '16px 16px 96px 16px' }}>
      {/* Toast feedback */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#7C3AED',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 500,
            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)',
            zIndex: 300,
            textAlign: 'center',
            maxWidth: '90%'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Screen Title */}
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 500, color: '#0F172A', marginBottom: '4px' }}>
          Habits Reminders
        </h1>
        <p style={{ fontSize: '13px', color: '#475569' }}>
          One screen controls all nudges. Silent during quiet hours, max 3 daily.
        </p>
      </div>

      {/* Four Reminder Cards in a neat list */}
      <div className="grid-1col" style={{ marginBottom: '16px' }}>
        {/* Card 1: Breaks */}
        <div className="companion-card" id="card-reminder-breaks">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>🧘</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A' }}>
                  Break Reminders
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                  Gentle nudge for a 2-minute eye & neck stretch
                </div>
              </div>
            </div>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.breaksEnabled}
                onChange={() => handleToggle('breaksEnabled')}
                id="toggle-breaks"
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {settings.breaksEnabled && (
            <div style={{ paddingTop: '8px', borderTop: '1px solid #EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                Interval:
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[30, 50, 60, 90].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => handleIntervalChange(mins)}
                    className={settings.breakInterval === mins ? 'btn-primary' : 'btn-secondary'}
                    style={{ minHeight: '34px', padding: '4px 10px', fontSize: '12px' }}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card 2: Bedtime */}
        <div className="companion-card" id="card-reminder-bedtime">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>🌙</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A' }}>
                  Bedtime Wind-Down
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                  Suggests putting the phone down for sleep
                </div>
              </div>
            </div>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.bedtimeEnabled}
                onChange={() => handleToggle('bedtimeEnabled')}
                id="toggle-bedtime"
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {settings.bedtimeEnabled && (
            <div style={{ paddingTop: '8px', borderTop: '1px solid #EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                Wind-down time:
              </span>
              <input
                type="time"
                value={settings.bedtimeTime}
                onChange={e => handleTimeChange('bedtimeTime', e.target.value)}
                style={{
                  border: '1px solid #EDE9FE',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#7C3AED',
                  background: '#F5F3FF'
                }}
              />
            </div>
          )}
        </div>

        {/* Card 3: Morning Check-in */}
        <div className="companion-card" id="card-reminder-morning">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>☀️</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A' }}>
                  Morning Check-in
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                  Quick morning prompt to log how you feel
                </div>
              </div>
            </div>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.morningEnabled}
                onChange={() => handleToggle('morningEnabled')}
                id="toggle-morning"
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {settings.morningEnabled && (
            <div style={{ paddingTop: '8px', borderTop: '1px solid #EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                Check-in time:
              </span>
              <input
                type="time"
                value={settings.morningTime}
                onChange={e => handleTimeChange('morningTime', e.target.value)}
                style={{
                  border: '1px solid #EDE9FE',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#7C3AED',
                  background: '#F5F3FF'
                }}
              />
            </div>
          )}
        </div>

        {/* Card 4: Weekly Summary */}
        <div className="companion-card" id="card-reminder-weekly">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>📊</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A' }}>
                  Weekly Summary
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                  Sunday 7:00 PM recap and quiz link
                </div>
              </div>
            </div>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.weeklyEnabled}
                onChange={() => handleToggle('weeklyEnabled')}
                id="toggle-weekly"
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </div>

      {/* Quiet Hours Card (Inline in Reminders Screen) */}
      <div className="companion-card" style={{ marginBottom: '16px' }} id="card-quiet-hours">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px' }}>🔇</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>
            Quiet Hours (Do Not Disturb)
          </span>
        </div>

        <p style={{ fontSize: '12px', color: '#475569', marginBottom: '12px' }}>
          The app never sends notifications during this window.
        </p>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Starts</div>
            <input
              type="time"
              value={settings.quietHoursStart}
              onChange={e => handleTimeChange('quietHoursStart', e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #EDE9FE',
                borderRadius: '8px',
                padding: '6px 10px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '13px',
                color: '#7C3AED',
                background: '#F5F3FF'
              }}
            />
          </div>

          <span style={{ color: '#94A3B8', marginTop: '16px' }}>→</span>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Ends</div>
            <input
              type="time"
              value={settings.quietHoursEnd}
              onChange={e => handleTimeChange('quietHoursEnd', e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #EDE9FE',
                borderRadius: '8px',
                padding: '6px 10px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '13px',
                color: '#7C3AED',
                background: '#F5F3FF'
              }}
            />
          </div>
        </div>
      </div>

      {/* Test Habit Reminder Action */}
      <div className="companion-card" style={{ background: '#F5F3FF', border: '1px solid #EDE9FE' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', marginBottom: '6px' }}>
          TEST HABIT NOTIFICATION
        </div>
        <p style={{ fontSize: '12px', color: '#475569', marginBottom: '10px' }}>
          Test the exact habit message on your device:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '11px', minHeight: '36px', padding: '6px 8px' }}
            onClick={() => handleTestNotification('break')}
          >
            🧘 Test Break
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '11px', minHeight: '36px', padding: '6px 8px' }}
            onClick={() => handleTestNotification('bedtime')}
          >
            🌙 Test Bedtime
          </button>
        </div>
      </div>
    </div>
  )
}
