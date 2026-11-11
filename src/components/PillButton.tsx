import React from 'react';

type PillButtonVariant = 'primary' | 'secondary' | 'ghost' | 'blue';
type PillButtonSize = 'md' | 'lg';

interface PillButtonProps {
  label: string;
  variant?: PillButtonVariant;
  size?: PillButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  arrow?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Shared pill button (two26 pill + circular arrow disc, ocean colours).
 * Primary: ocean pill, white label, ocean-mid arrow disc.
 * Secondary: white pill, ocean-mid label, 2px ocean-mid border.
 * Ghost: plain ocean text, no background.
 * Blue: ocean-mid pill, white label, white arrow disc (for use on ocean ground).
 *
 * ONE arrow per button: when `arrow` is true the disc IS the arrow, so a
 * trailing "→" in the label is stripped here — never two arrows.
 */
export const PillButton: React.FC<PillButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  arrow = false,
  className = '',
  ariaLabel
}) => {
  const cleanLabel = arrow ? label.replace(/\s*→\s*$/, '') : label;
  return (
    <button
      type={type}
      className={`pill-btn pill-btn-${variant} pill-btn-${size} ${arrow ? 'pill-btn-arrow' : ''} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || cleanLabel}
    >
      <span className="pill-btn-label">{cleanLabel}</span>
      {arrow && (
        <span className="pill-btn-disc" aria-hidden="true">→</span>
      )}
    </button>
  );
};
