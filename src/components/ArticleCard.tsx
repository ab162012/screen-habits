import React from 'react';
import type { Article } from '../types';
import { PillButton } from './PillButton';
import { PillBadge } from './PillBadge';

interface ArticleCardProps {
  article: Article;
  onNavigate: (route: string) => void;
  /** 'preview' = Home teaser (link "Read Guide →"); 'full' = hub grid (pill button). */
  variant?: 'preview' | 'full';
  /** Featured card: full-width, ocean wash, "Featured" pill. Only the
      experts guide is ever featured. */
  featured?: boolean;
}

/** Shared article card — ONE card for every piece in the merged hub:
    emoji mark, category pill, title, summary, reading time, CTA.
    Reading time is computed from the piece's own words (words ÷ 200,
    rounded up) and stored on the article. */
export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate, variant = 'full', featured = false }) => {
  /* Heading level follows the page: on the hub the card sits directly
     under the page h1, so its title is an h2; on the Home preview it
     sits under the "Guides & Resources" h2, so its title is an h3.
     Same class, same look either way. */
  const TitleTag = variant === 'full' ? 'h2' : 'h3';
  return (
    <article className={`article-card${featured ? ' article-card-featured' : ''}`}>
      <span className="article-card-emoji" aria-hidden="true">{article.emoji}</span>
      <span className="article-card-tags">
        {featured && <PillBadge label="Featured" tone="navy" />}
        <PillBadge label={article.category} />
      </span>
      <TitleTag className="article-card-title">{article.title}</TitleTag>
      <p className="article-card-summary">{article.summary}</p>
      <span className="article-card-readtime">{article.minutes} min read</span>
      {variant === 'preview' ? (
        <a
          href={`#article/${article.slug}`}
          className="article-read-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`article/${article.slug}`);
          }}
        >
          Read Guide →
        </a>
      ) : (
        <span className="article-card-cta">
          <PillButton
            label="Read Full Article →"
            variant="secondary"
            onClick={() => onNavigate(`article/${article.slug}`)}
          />
        </span>
      )}
    </article>
  );
};
