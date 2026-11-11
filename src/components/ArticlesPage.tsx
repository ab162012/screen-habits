import React from 'react';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { Reveal } from './Reveal';

interface ArticlesPageProps {
  onNavigate: (route: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper">
      {/* Header: headline and one line explaining the articles */}
      <section className="articles-header" aria-labelledby="articles-title">
        <span className="eyebrow">Guides</span>
        <h1 id="articles-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">📚</span> Screen Habits Guides
        </h1>
        <p className="articles-intro">
          Six practical, honest articles for students. Everyday habit routines that protect evening sleep, reduce eye strain, and build real balance.
        </p>
        <span className="articles-ghost-num" aria-hidden="true">06</span>
      </section>

      {/* Six article cards in a grid: lead card spans 2 columns, then the rest */}
      <div className="articles-list-grid">
        {ARTICLES.map((article, i) => (
          <Reveal key={article.id} delayMs={(i % 3) * 80} className={i === 0 ? 'articles-grid-featured' : ''}>
            <ArticleCard article={article} onNavigate={onNavigate} variant="full" featured={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};
