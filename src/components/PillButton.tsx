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
 * Shared pill button (two26 pill + circular arrow disc, Astryx colours).
 * Primary: navy pill, white label, blue arrow disc.
 * Secondary: white pill, blue label, 1.5px blue border.
 * Ghost: plain navy/blue text, no background.
 * Blue: blue pill, white label, white arrow disc (for use on navy ground).
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
  return (
    <button
      type={type}
      className={`pill-btn pill-btn-${variant} pill-btn-${size} ${arrow ? 'pill-btn-arrow' : ''} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      <span className="pill-btn-label">{label}</span>
      {arrow && (
        <span className="pill-btn-disc" aria-hidden="true">→</span>
      )}
    </button>
  );
};
