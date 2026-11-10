// Screen Habits theme for Astryx (@astryxdesign/core 0.7.11).
//
// Extends the Neutral theme and overrides only the brand tokens, so every
// Astryx component renders in the settled Screen Habits look:
//   white ground, navy #0A1F44, blue #2563EB, Manrope, 800-weight headlines.
// The app is light-only, so token values are plain strings (used as-is in
// both modes) rather than [light, dark] pairs.
//
// Unbuilt theme: <Theme> injects the resolved CSS at runtime (see main.tsx).
// If Astryx is upgraded, re-check `defineTheme`'s input shape — beta API.
import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';

const MANROPE_FALLBACKS =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const screenHabitsTheme = defineTheme({
  name: 'screen-habits',
  extends: neutralTheme,

  // Manrope everywhere; 800-weight bold headlines (settled revamp).
  // Scale base 16 matches the app's 16px body text.
  typography: {
    scale: { base: 16, ratio: 1.2 },
    body: {
      family: 'Manrope',
      fallbacks: MANROPE_FALLBACKS,
    },
    heading: {
      family: 'Manrope',
      fallbacks: MANROPE_FALLBACKS,
      weight: '800',
      weights: { 1: '800', 2: '800', 3: '800', 4: '800' },
    },
  },

  // Section 10 motion: fast 200ms, normal 400ms, slow 700ms.
  motion: { fast: 200, medium: 400, slow: 700, ratio: 0.75 },

  tokens: {
    // Grounds — white page, white cards, pale blue tint for muted fills.
    '--color-background-body': '#FFFFFF',
    '--color-background-surface': '#FFFFFF',
    '--color-background-card': '#FFFFFF',
    '--color-background-popover': '#FFFFFF',
    '--color-background-muted': '#EFF6FF',

    // Accent — the one blue. Primary buttons, active borders, links.
    '--color-accent': '#2563EB',
    '--color-accent-muted': '#DBEAFE',
    '--color-on-accent': '#FFFFFF',

    // Info == brand blue in this app (ProgressBar 'accent'/'info' fills).
    '--color-info': '#2563EB',
    '--color-info-muted': '#DBEAFE',
    '--color-on-info': '#FFFFFF',
    '--color-text-info': '#1D4ED8',
    '--color-on-info-muted': '#0A1F44',

    // Text — navy headlines, slate-600 body.
    '--color-text-primary': '#0A1F44',
    '--color-text-secondary': '#475569',
    '--color-text-accent': '#2563EB',
    '--color-on-dark': '#FFFFFF',
    '--color-on-light': '#0A1F44',

    // Icons.
    '--color-icon-accent': '#2563EB',
    '--color-icon-primary': '#0A1F44',
    '--color-icon-secondary': '#475569',

    // Borders — blue-100 default, slate for unselected option cards.
    '--color-border': '#DBEAFE',
    '--color-border-emphasized': '#CBD5E1',

    // Blue hue family (Badge variant="blue", selected fills).
    '--color-background-blue': '#EFF6FF',
    '--color-border-blue': '#DBEAFE',
    '--color-icon-blue': '#2563EB',
    '--color-text-blue': '#1D4ED8',

    // Radii — Section 3: cards 16px (2xl), buttons/options 12px (xl).
    '--radius-inner': '8px',
    '--radius-element': '12px',
    '--radius-container': '16px',
    '--radius-page': '16px',

    // Shadows — soft, navy-tinted (Section 3).
    '--shadow-low':
      '0 1px 3px rgba(10, 31, 68, 0.05), 0 2px 8px rgba(10, 31, 68, 0.05)',
    '--shadow-med': '0 4px 14px rgba(10, 31, 68, 0.06)',
    '--shadow-high': '0 8px 24px rgba(37, 99, 235, 0.12)',
  },
});
