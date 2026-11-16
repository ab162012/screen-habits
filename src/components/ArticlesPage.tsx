import React from 'react';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { Reveal } from './Reveal';

interface ArticlesPageProps {
  onNavigate: (route: string) => void;
}

/** Guides & Resources — the library. Six general health guides;
    the student team guide lives with our story on About Us instead. */
const LIBRARY_ARTICLES = ARTICLES.filter((a) => a.id !== 'healthy-habits-student-team');

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper">
      {/* Header: headline and one line explaining the articles */}
      <section className="articles-header" aria-labelledby="articles-title">
        <span className="eyebrow">Guides &amp; Resources</span>
        <h1 id="articles-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">📚</span> Guides &amp; Resources
        </h1>
        <p className="articles-intro">
          Six practical, honest guides — breaks, sleep, scrolling, eyes,
          and what the experts say. Each one is a complete guide of about
          a thousand words, and each ends with a single habit to try for
          seven days. More guides and downloadable resources are coming.
        </p>
      </section>

      {/* Six equal article cards in a grid — no featured card, no 2-column span. */}
      <div className="articles-list-grid">
        {LIBRARY_ARTICLES.map((article, i) => (
          <Reveal key={article.id} delayMs={(i % 3) * 80}>
            <ArticleCard article={article} onNavigate={onNavigate} variant="full" />
          </Reveal>
        ))}
      </div>

      <div className="articles-preview-footer">
        <p className="articles-intro">
          Looking for the student team guide? It lives with our story —{' '}
          <a
            href="#about"
            className="article-read-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
          >
            see About Us →
          </a>
        </p>
      </div>
    </div>
  );
};
