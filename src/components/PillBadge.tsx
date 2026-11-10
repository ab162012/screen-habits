import React from 'react';

type PillBadgeTone = 'blue' | 'navy' | 'light';

interface PillBadgeProps {
  label: string;
  tone?: PillBadgeTone;
  className?: string;
}

/** Shared pill badge — replaces Astryx Badge. Blue pill / navy pill / light-blue pill. */
export const PillBadge: React.FC<PillBadgeProps> = ({ label, tone = 'blue', className = '' }) => {
  return (
    <span className={`pill-badge pill-badge-${tone} ${className}`.trim()}>{label}</span>
  );
};
