import React from 'react';

interface MarqueeProps {
  items: string[];
}

/**
 * Ocean marquee band (two26 marquee pattern, ocean colours): slightly tilted,
 * repeated white Manrope 800 caps separated by blue dots, infinite loop.
 * The one looping animation on the site; paused under prefers-reduced-motion.
 */
export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  const sequence = items.join('  •  ');
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-track">
        <span className="marquee-chunk">{sequence} •&nbsp;</span>
        <span className="marquee-chunk">{sequence} •&nbsp;</span>
      </div>
    </div>
  );
};
