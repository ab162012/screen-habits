# Screen Habits 📱

> **Know your screen. Own your time.**

A gamified questionnaire webpage and habit diagnostic designed for students to measure daily screen balance, protect evening sleep, and build real-world routines that stick.

Built for the **British Council Your World Video Competition** under the theme **Healthy habits in a digital world**.

---

## 🌟 Highlights & Features

- **📱 Home**: Front door featuring the slogan, 3-step explanation, diagnostic preview score ring, articles teaser, and competition briefing.
- **🎮 10-Question Gamified Quest**:
  - Divided across 4 focus parts: *Devices & Time* (📱), *Apps & Scrolling* (📲), *Night & Sleep* (🌙), and *Body & Focus* (🎯).
  - Gamification mechanics: 10 XP per answered question, level progression (*Starter* $\to$ *Explorer* $\to$ *Focused* $\to$ *Finisher*), and consecutive streak tracking.
  - **Skip Law**: Skipped questions remain skipped, reset current streak to 0 with gentle shake feedback, and contribute 0 points with no penalty. Answering $<5$ questions locks the result to *Partial Result* instead of a full band.
- **🏆 Composed Result Page (ONE Output)**:
  - SVG score ring with animated clockwise count-up (700ms) and band (Thriving, Balanced, Strained, or Overloaded).
  - **Weakest Area & Single Fix**: Dedicated card isolating the primary habit bottleneck with one targeted fix.
  - **Top 3 Practical Actions**: Targeted habit recommendations with immediate micro first steps.
  - **7-Day Challenge Picker (✅)**: Choose between *Phone-free breaks during the day* or *A 9pm screen cut-off*, with start day selector and pledge card.
  - **Video-Ready Summary**: Spoken read-aloud script for student video filming plus full formatted evidence report.
  - **Browser-Only Sharing**: Native clipboard copy summary and Print / Save PDF.
- **📚 6 Full Habit Articles**:
  - Practical student-focused guides with 4 steps each, clear action items, and zero placeholder text or medical diagnosis claims.
- **⚓ Navigation & Footer**:
  - Top navigation (Home, Quest, Result, Articles) and sticky thumb-reach bottom bar on mobile.
  - Footer with slogan and official credits.

---

## 🎨 Branding & Design System

- **Typography**: Manrope exclusively across all headings, body text, buttons, and numbers.
- **Colour Palette**:
  - **Navy** (`#0A1F44`): Headings, primary buttons, footer, and dark text.
  - **Blue** (`#2563EB`, hover `#1D4ED8`): Links, active states, and accents.
  - **Light Backgrounds** (`#F8FAFC` and `#EFF6FF`).
  - **Borders** (`#DBEAFE`).
  - **Cards**: Pure white (`#FFFFFF`) on light backgrounds.
- **Animation System (21st.dev Standard)**:
  - Fast: 200ms (taps, hovers, card lift 4px on desktop).
  - Normal: 400ms (card entrance slide up 16px, modal pop, XP pop, streak reset shake).
  - Slow: 700ms (score ring fill, progress bar fill).
  - Non-looping animations with reduced-motion fallback.

---

## 🛠️ Development & Build

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```

---

## 👥 Credits

**Made by Abdul Basit (Leader), SJB, Ebad Ilyas**
