import React from 'react';

interface FloatingBarProps {
  children: React.ReactNode;
  label?: string;
}

/**
 * Shared floating pill bar — Quest sticky nav + Result action bar, one
 * component, one style. White pill, full radius, light-blue border, soft
 * shadow, max-width 860px, centred, 12px above the viewport bottom edge.
 * Never full-width, never flush to the bottom.
 */
export const FloatingBar: React.FC<FloatingBarProps> = ({ children, label }) => {
  return (
    <nav className="floating-bar" aria-label={label}>
      <div className="floating-bar-inner">{children}</div>
    </nav>
  );
};
