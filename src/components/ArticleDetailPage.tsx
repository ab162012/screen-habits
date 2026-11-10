import React from 'react';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import type { Article } from '../types';

interface ArticleDetailPageProps {
  article: Article;
  onNavigate: (route: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onNavigate
}) => {
  return (
    <article className="article-detail-container article-reading-view article-detail" aria-labelledby="article-heading">
      {/* Back links: one to the articles list, one to the Quest */}
      <div className="article-back-nav article-top-nav-bar article-nav-back">
        <Button
          label="← Back to Articles"
          variant="secondary"
          onClick={() => onNavigate('articles')}
        />
        <Button
          label="Take the Quest →"
          variant="primary"
          onClick={() => onNavigate('quest')}
        />
      </div>

      {/* Title, then topic tag */}
      <div>
        <div style={{ fontSize: '48px', lineHeight: 1, marginBottom: '12px' }} aria-hidden="true">
          📚
        </div>
        <h1 id="article-heading" className="article-card-title article-main-heading article-title-main" style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', marginBottom: '8px' }}>
          {article.title}
        </h1>
        <Badge variant="blue" label={article.topicTag} />
      </div>

      {/* Body sections in order: short honest introduction, practical steps, closing line */}
      <p className="article-card-summary article-lead-paragraph article-intro" style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--navy)' }}>
        {article.intro}
      </p>

      {/* Practical steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {article.steps.map((step, idx) => (
          <section key={idx} className="article-body-step article-step-block article-step-item">
            <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--navy)' }}>
              {step.heading}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-slate-600)', lineHeight: '1.6' }}>
              {step.detail}
            </p>
          </section>
        ))}
      </div>

      {/* Closing line pointing back to the Quest or 7-day challenge */}
      <div className="article-closing-banner article-closing-callout article-closing-box">
        <strong>Habit Action:</strong> {article.closingLine}
      </div>
    </article>
  );
};
