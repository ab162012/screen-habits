import React from 'react'
import type { ActiveTab } from '../types'

interface NavigationProps {
  activeTab: ActiveTab
  onSelectTab: (tab: ActiveTab) => void
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="bottom-nav" aria-label="Main Navigation">
      <button
        type="button"
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onSelectTab('home')}
        id="nav-home"
      >
        <span className="nav-emoji">🏠</span>
        <span className="nav-label">Home</span>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'reminders' ? 'active' : ''}`}
        onClick={() => onSelectTab('reminders')}
        id="nav-reminders"
      >
        <span className="nav-emoji">⏰</span>
        <span className="nav-label">Reminders</span>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'summary' ? 'active' : ''}`}
        onClick={() => onSelectTab('summary')}
        id="nav-summary"
      >
        <span className="nav-emoji">📊</span>
        <span className="nav-label">Summary</span>
      </button>
    </nav>
  )
}
