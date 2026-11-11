import React from 'react';
import type { Article } from '../types';
import { PillButton } from './PillButton';

interface ArticleCardProps {
  article: Article;
  onNavigate: (route: string) => void;
  /** 'preview' = Home teaser (link "Read Guide →"); 'full' = Articles grid (pill button). */
  variant?: 'preview' | 'full';
  /** Featured lead card: navy, spans 2 columns (first card on Home + Articles). */
  featured?: boolean;
}

/** Shared article card (two26 work-grid card pattern): emoji mark, topic tag, title, summary, read time, CTA. */
export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate, variant = 'full', featured = false }) => {
  return (
    <article className={`article-card${featured ? ' article-card-featured' : ''}`}>
      <span className="article-card-emoji" aria-hidden="true">{article.emoji}</span>
      <span className="article-card-topic">{article.topicTag}</span>
      <h3 className="article-card-title">{article.title}</h3>
      <p className="article-card-summary">{article.summary}</p>
      {variant === 'full' && (
        <span className="article-card-readtime">{article.readTime}</span>
      )}
      {variant === 'preview' ? (
        <a
          href={`#article/${article.id}`}
          className="article-read-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`article/${article.id}`);
          }}
        >
          Read Guide →
        </a>
      ) : (
        <span className="article-card-cta">
          <PillButton
            label="Read Full Article →"
            variant="secondary"
            onClick={() => onNavigate(`article/${article.id}`)}
          />
        </span>
      )}
    </article>
  );
};
