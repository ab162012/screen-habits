import React from 'react';

type StickerTone = 'navy' | 'blue' | 'light';

interface StickerProps {
  text: string;
  tone?: StickerTone;
  rotate?: -3 | 2;
  className?: string;
}

/** Rotated pill sticker (two26 sticker pattern, Astryx colours). Only existing copy may be used as text. */
export const Sticker: React.FC<StickerProps> = ({ text, tone = 'navy', rotate = -3, className = '' }) => {
  return (
    <span
      className={`sticker sticker-${tone} sticker-rot-${rotate} ${className}`.trim()}
      aria-hidden="true"
    >
      {text}
    </span>
  );
};
