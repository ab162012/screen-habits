import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Astryx design system (0.7.11): pre-built CSS, no build plugin needed.
// Order matters — reset, then component styles, then the app's own CSS.
import '@astryxdesign/core/reset.css'
import '@astryxdesign/core/astryx.css'
import './index.css'
import { Theme } from '@astryxdesign/core/theme'
import { screenHabitsTheme } from './theme/screenHabitsTheme'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme theme={screenHabitsTheme}>
      <App />
    </Theme>
  </StrictMode>,
)
