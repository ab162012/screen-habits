import React, { useEffect, useState } from 'react';

/**
 * Loader (two26 loader pattern, Astryx colours): full white screen, single
 * ocean arc drawing/rotating in the centre, shown once on first load only,
 * max ~1.5s, then the hero fades in. Skipped entirely under
 * prefers-reduced-motion. Purely cosmetic — it unmounts on a timer and
 * never blocks content.
 */
export const Loader: React.FC = () => {
  const [phase, setPhase] = useState<'show' | 'fade' | 'gone'>('show');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone');
      return;
    }
    const fadeTimer = window.setTimeout(() => setPhase('fade'), 1100);
    const goneTimer = window.setTimeout(() => setPhase('gone'), 1500);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(goneTimer);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className={`site-loader ${phase === 'fade' ? 'site-loader-fade' : ''}`} aria-hidden="true">
      <div className="site-loader-arc" />
      <span className="site-loader-word">Screen Habits</span>
    </div>
  );
};
