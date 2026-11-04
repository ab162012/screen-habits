import React from 'react'

interface AboutModalProps {
  onClose: () => void
  onOpenQuestionnaire: () => void
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose, onOpenQuestionnaire }) => {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>✨</span>
            <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#0F172A' }}>
              About Companion
            </h2>
          </div>

          <button
            type="button"
            className="btn-ghost"
            onClick={onClose}
            style={{ minHeight: '36px', padding: '6px 12px', fontSize: '13px' }}
          >
            Done
          </button>
        </div>

        {/* PROPER CREDITS CARD — EXACT WORDING FROM SECTION 2 */}
        <div
          className="companion-card"
          style={{ marginBottom: '16px', background: '#F5F3FF', border: '1px solid #EDE9FE' }}
          id="credits-card"
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
            Credits
          </div>
          <p style={{ fontSize: '15px', color: '#0F172A', fontWeight: 500, lineHeight: 1.5 }}>
            Made by — Leader: Abdul Basit. Team: SJB, Ebad Ilyas, Haider.
          </p>
        </div>

        {/* Purpose & Privacy */}
        <div className="companion-card" style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '6px' }}>
            Privacy & Habits
          </div>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '10px' }}>
            Screen Habits Companion does one job: reminds you at the right times so healthy habits actually happen.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li style={{ fontSize: '12px', color: '#475569', display: 'flex', gap: '6px' }}>
              <span>✓</span> 100% on-device — no tracking, no spying, no accounts.
            </li>
            <li style={{ fontSize: '12px', color: '#475569', display: 'flex', gap: '6px' }}>
              <span>✓</span> Strict quiet hours and maximum 3 nudges daily.
            </li>
            <li style={{ fontSize: '12px', color: '#475569', display: 'flex', gap: '6px' }}>
              <span>✓</span> Offline-first functionality.
            </li>
          </ul>
        </div>

        {/* APK Direct Install Guide — Section 7 */}
        <div className="companion-card" style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '6px' }}>
            Download & Install APK
          </div>
          <p style={{ fontSize: '12px', color: '#475569', marginBottom: '10px' }}>
            Two plain installation steps on Android:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', background: '#F5F3FF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                1
              </span>
              <span style={{ fontSize: '12px', color: '#475569', flex: 1 }}>
                Allow install from browser when Android prompts.
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', background: '#F5F3FF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                2
              </span>
              <span style={{ fontSize: '12px', color: '#475569', flex: 1 }}>
                Open the downloaded file to complete install.
              </span>
            </div>
          </div>
        </div>

        {/* Web Questionnaire Link */}
        <button
          type="button"
          onClick={onOpenQuestionnaire}
          className="btn-primary"
          style={{ width: '100%', fontSize: '14px' }}
        >
          Open Web Questionnaire ↗
        </button>
      </div>
    </div>
  )
}
