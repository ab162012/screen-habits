import React from 'react';

type PillBadgeTone = 'blue' | 'navy' | 'light' | 'on-dark';

interface PillBadgeProps {
  label: string;
  tone?: PillBadgeTone;
  className?: string;
}

/** Shared pill badge — replaces Astryx Badge. Ocean-mid pill / ocean pill /
    light-blue pill / white pill with navy text (for use inside ocean bands). */
export const PillBadge: React.FC<PillBadgeProps> = ({ label, tone = 'blue', className = '' }) => {
  return (
    <span className={`pill-badge pill-badge-${tone} ${className}`.trim()}>{label}</span>
  );
};
