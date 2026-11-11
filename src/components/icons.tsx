import React from 'react';

/**
 * Functional SVG icons ONLY (Pass 3 — "emoji up the system").
 *
 * Pass 2 built a full stroke-icon set here to replace emoji. Pass 3 reverses
 * the emoji direction: every former emoji site renders the emoji itself again
 * (from the frozen data fields, or as a fixed system mark), so the PART /
 * OPTION / ARTICLE / REC icon maps and the Flame / Target / CheckCircle /
 * Trophy / Speech / Copy / Printer icons are deleted — dead code must not ship.
 *
 * What stays, and why: emoji cannot do these two jobs.
 * - MenuIcon — the navbar hamburger (three bars, 22px).
 * - CloseIcon — the hamburger's close state + the NameClassDialog ✕ (16–22px).
 * The challenge-toggle radio indicator is plain CSS + the typographic ✓,
 * not an icon (Pass 2 bug fix, kept).
 *
 * All icons: viewBox 0 0 24 24, fill none, stroke currentColor, strokeWidth
 * 1.8, round caps/joins. Colour comes from the parent, size from the prop.
 * No emoji, no image files, no network fetch.
 */

type IconProps = {
  size?: number;
  className?: string;
};

type SvgIcon = React.FC<IconProps>;

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
});

export const CloseIcon: SvgIcon = ({ size = 24 }) => (
  <svg {...svgProps(size)}>
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

export const MenuIcon: SvgIcon = ({ size = 24 }) => (
  <svg {...svgProps(size)}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);
