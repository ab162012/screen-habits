import React from 'react';
import type { Article } from '../types';
import { PillButton } from './PillButton';

interface ArticleCardProps {
  article: Article;
  onNavigate: (route: string) => void;
  /** 'preview' = Home teaser (link "Read Guide →"); 'full' = Articles grid (pill button). */
  variant?: 'preview' | 'full';
}

/** Shared article card: emoji mark, topic tag, title, summary, read
    time, CTA. The summary renders again — cards were title-only stubs
    after revamp2, and the owner wants the guides to read as real
    content, not stubs. */
export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate, variant = 'full' }) => {
  /* Heading level follows the page: on the Articles list the card sits
     directly under the page h1, so its title is an h2; on the Home
     preview it sits under the "Articles & Habit Guides" h2, so its
     title is an h3. Same class, same look either way. */
  const TitleTag = variant === 'full' ? 'h2' : 'h3';
  return (
    <article className="article-card">
      <span className="article-card-emoji" aria-hidden="true">{article.emoji}</span>
      <span className="article-card-topic">{article.topicTag}</span>
      <TitleTag className="article-card-title">{article.title}</TitleTag>
      <p className="article-card-summary">{article.summary}</p>
      <span className="article-card-readtime">{article.readTime}</span>
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
