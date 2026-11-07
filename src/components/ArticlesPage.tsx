import React from 'react';
import { ARTICLES } from '../data/articles';

interface ArticlesPageProps {
  onNavigate: (route: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header: headline and one line explaining the articles */}
      <section className="articles-header" style={{ textAlign: 'center', padding: '16px 0 8px' }}>
        <div className="icon-tile icon-tile-xl" style={{ margin: '0 auto 14px' }} aria-hidden="true">
          📚
        </div>
        <h1 className="section-headline" style={{ marginBottom: '8px' }}>
          Screen Habits Guides
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-slate-600)', maxWidth: '620px', margin: '0 auto', lineHeight: '1.6' }}>
          Six practical, honest articles for students. Everyday habit routines that protect evening sleep, reduce eye strain, and build real balance.
        </p>
      </section>

      {/* Six article cards in a grid: 3 across desktop, 2 tablets, 1 phones */}
      <div className="articles-list-grid">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            className="article-list-card article-card-main article-card-full"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="article-card-topic">{article.topicTag}</span>
              <h2 className="article-card-title">{article.title}</h2>
              <p className="article-card-summary">{article.summary}</p>
            </div>
            <div>
              <a
                href={`#article/${article.id}`}
                className="btn-secondary"
                style={{ display: 'inline-flex', padding: '8px 16px', minHeight: '40px', fontSize: '14px' }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`article/${article.id}`);
                }}
              >
                Read Full Article →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
