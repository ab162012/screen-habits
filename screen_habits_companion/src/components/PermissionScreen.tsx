import React from 'react'

interface PermissionScreenProps {
  onAllow: () => void
  onSkip: () => void
}

export const PermissionScreen: React.FC<PermissionScreenProps> = ({ onAllow, onSkip }) => {
  return (
    <div className="app-container" style={{ justifyContent: 'center', padding: '24px 20px', minHeight: '100vh' }}>
      <div className="companion-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
        
        <h1 style={{ fontSize: '22px', fontWeight: 500, marginBottom: '12px', color: '#0F172A' }}>
          Quiet, Helpful Reminders
        </h1>
        
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
          Screen Habits Companion sends gentle nudges for eye breaks and bedtime wind-down. Never spam, max 3 a day, and strictly silent during quiet hours.
        </p>

        <div style={{ background: '#F5F3FF', border: '1px solid #EDE9FE', borderRadius: '16px', padding: '16px', textAlign: 'left', marginBottom: '28px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px' }}>🧘</span>
            <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: 500 }}>Short breaks during screen stretches</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px' }}>🌙</span>
            <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: 500 }}>Evening wind-down reminder before bed</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '20px' }}>🔒</span>
            <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: 500 }}>100% on your device — no account needed</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', fontSize: '16px' }}
            onClick={onAllow}
            id="btn-allow-notifications"
          >
            Allow Reminders
          </button>
          
          <button
            type="button"
            className="btn-ghost"
            style={{ width: '100%', minHeight: '48px' }}
            onClick={onSkip}
            id="btn-skip-notifications"
          >
            Not Now / Continue
          </button>
        </div>

        <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '16px' }}>
          You can toggle or adjust your reminder times anytime in the Reminders tab.
        </p>
      </div>
    </div>
  )
}
