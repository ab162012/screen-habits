import React from 'react';
import type { Article } from '../types';
import { PillButton } from './PillButton';
import { PillBadge } from './PillBadge';

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
        <PillButton
          label="← Back to Articles"
          variant="secondary"
          onClick={() => onNavigate('articles')}
        />
        <PillButton
          label="Take the Quest →"
          variant="primary"
          arrow
          onClick={() => onNavigate('quest')}
        />
      </div>

      {/* Title, then topic tag */}
      <div className="article-title-block">
        <div className="article-title-inner">
          <span className="article-emoji-mark" aria-hidden="true">{article.emoji}</span>
          <h1 id="article-heading" className="article-main-heading">
            {article.title}
          </h1>
          <span className="article-tag-row">
            <PillBadge label={article.topicTag} />
            <span className="article-readtime">{article.readTime}</span>
          </span>
        </div>
      </div>

      {/* Body sections in order: short honest introduction, practical steps, closing line */}
      <p className="article-card-summary article-lead-paragraph article-intro">
        {article.intro}
      </p>

      {/* Practical steps */}
      <div className="article-steps-list">
        {article.steps.map((step, idx) => (
          <section key={idx} className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">
                {step.heading}
              </h2>
              <p className="article-step-detail">
                {step.detail}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Closing line pointing back to the Quest or 7-day challenge */}
      <div className="article-closing-banner article-closing-callout article-closing-box">
        <span className="article-closing-emoji" aria-hidden="true">✅</span>{' '}
        <strong className="article-closing-label">Habit Action:</strong> {article.closingLine}
      </div>
    </article>
  );
};
