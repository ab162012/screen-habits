import React, { useEffect } from 'react';
import type { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { PillButton } from './PillButton';
import { PillBadge } from './PillBadge';

interface ArticleDetailPageProps {
  article: Article;
  onNavigate: (route: string) => void;
  /** Where the back button goes. Guides list by default; the health
      topic wrapper passes 'health' with its own label. */
  backRoute?: string;
  backLabel?: string;
}

/** Meta description, truncated to 160 chars at a word boundary. */
function metaDescription(summary: string): string {
  if (summary.length <= 160) return summary;
  return summary.slice(0, 157).replace(/\s+\S*$/, '') + '…';
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onNavigate,
  backRoute = 'guides',
  backLabel = '← Back to Guides'
}) => {
  /* Per-article SEO: title, meta description, canonical, Open Graph,
     and JSON-LD Article schema. The static index.html values are
     restored when the reader leaves the article. */
  useEffect(() => {
    const url = `https://yourscreenhabits.com/#/article/${article.slug}`;
    const desc = metaDescription(article.summary);
    const prevTitle = document.title;
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? '';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') ?? '';
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const prevOgTitle = ogTitle?.getAttribute('content') ?? '';
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const prevOgDesc = ogDesc?.getAttribute('content') ?? '';

    document.title = `${article.title} — YourScreenHabits`;
    metaDesc?.setAttribute('content', desc);
    canonical?.setAttribute('href', url);
    ogTitle?.setAttribute('content', article.title);
    ogDesc?.setAttribute('content', desc);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: desc,
      author: { '@type': 'Organization', name: 'YourScreenHabits team' },
      publisher: { '@type': 'Organization', name: 'YourScreenHabits', url: 'https://yourscreenhabits.com/' },
      mainEntityOfPage: url,
      inLanguage: 'en'
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      metaDesc?.setAttribute('content', prevDesc);
      canonical?.setAttribute('href', prevCanonical);
      ogTitle?.setAttribute('content', prevOgTitle);
      ogDesc?.setAttribute('content', prevOgDesc);
      script.remove();
    };
  }, [article]);

  /* Prev / next follow the store order: guides first, then topics. */
  const index = ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = index > 0 ? ARTICLES[index - 1] : undefined;
  const nextArticle = index >= 0 && index < ARTICLES.length - 1 ? ARTICLES[index + 1] : undefined;
  const relatedArticles = article.related
    .map((r) => ARTICLES.find((a) => a.slug === r.slug))
    .filter((a): a is Article => a !== undefined);

  /* Topics carry their intro as their summary, so the intro paragraph
     is the takeaway box — showing it again below would duplicate it.
     Guides have a separate summary and intro, so both show. */
  const showIntro = article.intro !== article.summary;

  return (
    <article className="article-detail-container article-reading-view article-detail" aria-labelledby="article-heading">
      {/* Back link to the list this article was reached from. */}
      <div className="article-back-nav article-top-nav-bar article-nav-back">
        <PillButton
          label={backLabel}
          variant="secondary"
          onClick={() => onNavigate(backRoute)}
        />
      </div>

      {/* Title, then category pill + reading time */}
      <div className="article-title-block">
        <div className="article-title-inner">
          <span className="article-emoji-mark" aria-hidden="true">{article.emoji}</span>
          <h1 id="article-heading" className="article-main-heading">
            {article.title}
          </h1>
          <span className="article-tag-row">
            <PillBadge label={article.category} />
            <span className="article-readtime">{article.minutes} min read</span>
          </span>
        </div>
      </div>

      {/* Key takeaway: the piece's own summary, in an ocean wash box. */}
      <div className="article-takeaway">
        <span className="article-takeaway-label">Key takeaway</span>
        <p className="article-takeaway-text">{article.summary}</p>
      </div>

      {/* Intro paragraph — guides only (topics show it as the takeaway). */}
      {showIntro && (
        <p className="article-card-summary article-lead-paragraph article-intro">
          {article.intro}
        </p>
      )}

      {/* Body sections in order. */}
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

      {/* Try one thing: the habit from the piece itself. Guides carry
          their closing line; topics carry their "Practical steps"
          section. */}
      <div className="article-closing-banner article-closing-callout article-closing-box">
        <span className="article-closing-emoji" aria-hidden="true">✅</span>{' '}
        <strong className="article-closing-label">{article.tryOneThing.label}:</strong> {article.tryOneThing.text}
      </div>

      {/* Health topics are habits guides, not medical advice — the same
          note the old health topic pages carried. */}
      {article.kind === 'topic' && (
        <p className="article-disclaimer">
          Remember: this is a habits guide, not medical advice. For ongoing
          eye pain, headaches, or sleep problems, see a professional.
        </p>
      )}

      {/* Sources — only where the piece names them in its own text. */}
      {article.sources.length > 0 && (
        <section className="article-sources" aria-label="Sources">
          <h2 className="article-sources-heading">Sources</h2>
          <ul className="article-sources-list">
            {article.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Paired reading: the pieces this one links to in its own text. */}
      {relatedArticles.length > 0 && (
        <section className="article-related" aria-label="Keep reading">
          <h2 className="article-related-heading">Keep reading</h2>
          <ul className="article-related-list">
            {relatedArticles.map((related) => (
              <li key={related.id}>
                <a
                  href={`#article/${related.slug}`}
                  className="article-read-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`article/${related.slug}`);
                  }}
                >
                  {article.related.find((r) => r.slug === related.slug)?.label ?? related.title} →
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Prev / next in store order. */}
      <nav className="article-prev-next" aria-label="More articles">
        {prevArticle ? (
          <a
            href={`#article/${prevArticle.slug}`}
            className="article-read-link article-prev-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`article/${prevArticle.slug}`);
            }}
          >
            ← {prevArticle.title}
          </a>
        ) : (
          <span />
        )}
        {nextArticle && (
          <a
            href={`#article/${nextArticle.slug}`}
            className="article-read-link article-next-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`article/${nextArticle.slug}`);
            }}
          >
            {nextArticle.title} →
          </a>
        )}
      </nav>
    </article>
  );
};
