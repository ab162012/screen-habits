import React, { useEffect } from 'react';
import { PillButton } from './PillButton';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

/** A real 404 view for unknown routes. Unknown hashes used to render
    the homepage silently; now they land here, with links back to the
    two places a visitor actually wants. Sets the title and a noindex
    tag while it is mounted, and restores both when the reader leaves. */
export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Page not found — YourScreenHabits';

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);

    return () => {
      document.title = prevTitle;
      meta.remove();
    };
  }, []);

  return (
    <div className="not-found-page">
      <span className="eyebrow">404 — Page not found</span>
      <h1 className="not-found-heading">This page doesn&rsquo;t exist.</h1>
      <p className="not-found-text">
        The address may have changed, or the link was typed wrong. The
        guides and the home page are still here.
      </p>
      <div className="not-found-actions">
        <PillButton
          label="Back to Home"
          variant="primary"
          size="lg"
          arrow
          onClick={() => onNavigate('home')}
        />
        <PillButton
          label="Browse the Guides"
          variant="secondary"
          size="lg"
          onClick={() => onNavigate('guides')}
        />
      </div>
    </div>
  );
};
