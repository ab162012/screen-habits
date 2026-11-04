import { useState, useEffect } from 'react'
import type { ActiveTab, ReminderSettings, CheckInRecord, WebScoreRecord } from './types'
import {
  loadSettings,
  saveSettings,
  loadCheckIns,
  saveCheckIn,
  loadLastScore
} from './services/storage'
import {
  requestNotificationPermission,
  syncReminders
} from './services/notifications'
import { Navigation } from './components/Navigation'
import { PermissionScreen } from './components/PermissionScreen'
import { HomeScreen } from './components/HomeScreen'
import { RemindersScreen } from './components/RemindersScreen'
import { CheckInScreen } from './components/CheckInScreen'
import { WeeklySummaryScreen } from './components/WeeklySummaryScreen'
import { AboutModal } from './components/AboutModal'

export function App() {
  const [settings, setSettings] = useState<ReminderSettings>(() => loadSettings())
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>(() => loadCheckIns())
  const [lastScore] = useState<WebScoreRecord | null>(() => loadLastScore())
  const [activeTab, setActiveTab] = useState<ActiveTab>('home')
  const [showAbout, setShowAbout] = useState(false)

  // Sync scheduled reminders whenever settings change
  useEffect(() => {
    syncReminders(settings)
  }, [settings])

  const handleAllowNotifications = async () => {
    const granted = await requestNotificationPermission()
    const updated: ReminderSettings = {
      ...settings,
      permissionAsked: true,
      permissionGranted: granted
    }
    setSettings(updated)
    saveSettings(updated)
  }

  const handleSkipNotifications = () => {
    const updated: ReminderSettings = {
      ...settings,
      permissionAsked: true,
      permissionGranted: false
    }
    setSettings(updated)
    saveSettings(updated)
  }

  const handleUpdateSettings = (updated: ReminderSettings) => {
    setSettings(updated)
    saveSettings(updated)
  }

  const handleSaveCheckIn = (record: CheckInRecord) => {
    const updated = saveCheckIn(record)
    setCheckIns(updated)
    setActiveTab('home')
  }

  const handleOpenQuestionnaire = () => {
    // Open the local dev server or hosted questionnaire in browser
    const webUrl = 'http://localhost:5190/'
    window.open(webUrl, '_blank')
  }

  // First launch permission screen if not yet asked
  if (!settings.permissionAsked) {
    return (
      <PermissionScreen
        onAllow={handleAllowNotifications}
        onSkip={handleSkipNotifications}
      />
    )
  }

  return (
    <>
      {activeTab === 'home' && (
        <HomeScreen
          settings={settings}
          checkIns={checkIns}
          lastScore={lastScore}
          onNavigate={setActiveTab}
          onOpenQuestionnaire={handleOpenQuestionnaire}
          onOpenAbout={() => setShowAbout(true)}
        />
      )}

      {activeTab === 'reminders' && (
        <RemindersScreen
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
        />
      )}

      {activeTab === 'summary' && (
        <WeeklySummaryScreen
          checkIns={checkIns}
          onOpenQuestionnaire={handleOpenQuestionnaire}
        />
      )}

      {activeTab === 'checkin' && (
        <CheckInScreen
          checkIns={checkIns}
          onSaveCheckIn={handleSaveCheckIn}
          onCancel={() => setActiveTab('home')}
        />
      )}

      {/* About Modal with exact credits */}
      {showAbout && (
        <AboutModal
          onClose={() => setShowAbout(false)}
          onOpenQuestionnaire={handleOpenQuestionnaire}
        />
      )}

      {/* Bottom Navigation (visible on main tabs) */}
      {(activeTab === 'home' || activeTab === 'reminders' || activeTab === 'summary') && (
        <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />
      )}
    </>
  )
}

export default App
