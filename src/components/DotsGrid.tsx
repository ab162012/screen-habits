import React from 'react';

/** The campaign's dots grid: one square per day of the year.
    365 squares in reading order (19 per row, last row 4); the first
    `filled` squares are filled. The maths is hours x 365 / 24 — the
    same maths as the posters, so the grid on the site always agrees
    with the grid on the notice boards. */
const TOTAL_SQUARES = 365;

interface DotsGridProps {
  /** How many of the 365 squares are filled (0–365). */
  filled: number;
  /** Accessible label for the whole grid. */
  label: string;
  /** Visual size of the grid. */
  size?: 'sm' | 'lg';
}

export const DotsGrid: React.FC<DotsGridProps> = ({ filled, label, size = 'sm' }) => {
  const clamped = Math.max(0, Math.min(TOTAL_SQUARES, Math.round(filled)));
  const squares = Array.from({ length: TOTAL_SQUARES }, (_, i) => i < clamped);

  return (
    <div
      className={`dots-grid dots-grid-${size}`}
      role="img"
      aria-label={label}
    >
      {squares.map((isFilled, i) => (
        <span
          key={i}
          className={isFilled ? 'dots-square dots-square-filled' : 'dots-square'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
