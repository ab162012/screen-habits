import React, { useMemo, useState } from 'react';
import { ARTICLES } from '../data/articles';
import type { ArticleCategory } from '../types';
import { ArticleCard } from './ArticleCard';
import { Reveal } from './Reveal';

interface ArticlesPageProps {
  onNavigate: (route: string) => void;
  /** 'guides' = the full hub (#/guides). 'health' = the category view
      (#/health): the six health categories only, health hero copy. */
  view?: 'guides' | 'health';
}

const ALL_CATEGORIES: ArticleCategory[] = ['Sleep', 'Eyes', 'Focus', 'Body', 'Mind', 'Routines', 'Expert', 'Team'];
const HEALTH_CATEGORIES: ArticleCategory[] = ['Sleep', 'Eyes', 'Focus', 'Body', 'Mind', 'Routines'];
const FEATURED_ID = 'what-the-experts-say';

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigate, view = 'guides' }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | ArticleCategory>('All');
  const [query, setQuery] = useState('');

  const categories = view === 'health' ? HEALTH_CATEGORIES : ALL_CATEGORIES;
  /* The health view is the hub filtered to the six health categories;
     the guides view is the whole store. */
  const baseList = useMemo(
    () => (view === 'health' ? ARTICLES.filter((a) => HEALTH_CATEGORIES.includes(a.category)) : ARTICLES),
    [view]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return baseList.filter((a) => {
      if (activeCategory !== 'All' && a.category !== activeCategory) return false;
      if (q && !`${a.title} ${a.summary}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [baseList, activeCategory, query]);

  /* The experts guide is the featured card whenever it is in the
     filtered list; it renders full-width above the grid, not in it. */
  const featured = filtered.find((a) => a.id === FEATURED_ID);
  const gridArticles = featured ? filtered.filter((a) => a.id !== FEATURED_ID) : filtered;

  const hero = view === 'health'
    ? {
        eyebrow: 'Health & Effects',
        title: 'How Screens Affect Health',
        emoji: '💙',
        intro: 'Screens touch sleep, eyes, focus, movement, mood, and everyday routines — not all at once, and not the same for everyone. The pieces below explain the issue, what the evidence actually says, the possible effects, and practical steps. Sources are named on every page; nothing here is a medical diagnosis.'
      }
    : {
        eyebrow: 'Guides & Resources',
        title: 'Guides & Resources',
        emoji: '📚',
        intro: `${ARTICLES.length} pieces. Sleep, eyes, focus, body, mind, routines — and what the experts say. Each one is complete, and each ends with one habit to try for seven days.`
      };

  return (
    <div className="articles-page-wrapper">
      {/* Header: headline and one line explaining the hub */}
      <section className="articles-header" aria-labelledby="articles-title">
        <span className="eyebrow">{hero.eyebrow}</span>
        <h1 id="articles-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">{hero.emoji}</span> {hero.title}
        </h1>
        <p className="articles-intro">{hero.intro}</p>
      </section>

      {/* Filter pills: All + one per category in this view. */}
      <div className="hub-filters" role="group" aria-label="Filter articles by category">
        {(['All', ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            className={`hub-filter-pill${activeCategory === cat ? ' hub-filter-pill-active' : ''}`}
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search: filters cards by title and summary as you type. */}
      <div className="hub-search-row">
        <label className="hub-search-label" htmlFor="hub-search">
          Search articles
        </label>
        <input
          id="hub-search"
          className="hub-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides and topics…"
          aria-label="Search guides and topics"
        />
      </div>

      <p className="hub-count" aria-live="polite">
        Showing {filtered.length} of {baseList.length} pieces
      </p>

      {/* Featured card: the experts guide, full-width above the grid. */}
      {featured && (
        <Reveal>
          <ArticleCard article={featured} onNavigate={onNavigate} variant="full" featured />
        </Reveal>
      )}

      {/* The grid: 3 columns desktop, 2 tablet, 1 phone. */}
      {gridArticles.length > 0 ? (
        <div className="articles-list-grid">
          {gridArticles.map((article, i) => (
            <Reveal key={article.id} delayMs={(i % 3) * 80}>
              <ArticleCard article={article} onNavigate={onNavigate} variant="full" />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="hub-empty">Nothing here yet — try another filter.</p>
      )}
    </div>
  );
};
