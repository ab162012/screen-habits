import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ARTICLES } from './data/articles';

/* Code-split by route: each page ships in its own chunk, so the first
   load is the home chunk, not all 9 routes. The shared shell (nav,
   footer, data store) stays in the main chunk. */
const HomePage = lazy(() => import('./components/HomePage').then((m) => ({ default: m.HomePage })));
const ArticlesPage = lazy(() => import('./components/ArticlesPage').then((m) => ({ default: m.ArticlesPage })));
const ArticleDetailPage = lazy(() => import('./components/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage })));
const UnderstandPage = lazy(() => import('./components/UnderstandPage').then((m) => ({ default: m.UnderstandPage })));
const HealthPage = lazy(() => import('./components/HealthPage').then((m) => ({ default: m.HealthPage })));
const HealthTopicPage = lazy(() => import('./components/HealthTopicPage').then((m) => ({ default: m.HealthTopicPage })));
const HabitsPage = lazy(() => import('./components/HabitsPage').then((m) => ({ default: m.HabitsPage })));
const ResearchPage = lazy(() => import('./components/ResearchPage').then((m) => ({ default: m.ResearchPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then((m) => ({ default: m.AboutPage })));
const NewsletterPage = lazy(() => import('./components/NewsletterPage').then((m) => ({ default: m.NewsletterPage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function parseHash(hash: string): { route: string; param?: string } {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === 'home') return { route: 'home' };
  if (clean === 'understand') return { route: 'understand' };
  if (clean === 'health') return { route: 'health' };
  if (clean.startsWith('health/')) {
    const topicSlug = clean.replace('health/', '');
    return { route: 'health-topic', param: topicSlug };
  }
  if (clean === 'habits') return { route: 'habits' };
  if (clean === 'guides' || clean === 'articles') return { route: 'guides' };
  if (clean.startsWith('article/')) {
    const articleId = clean.replace('article/', '');
    return { route: 'article', param: articleId };
  }
  if (clean === 'research') return { route: 'research' };
  if (clean === 'about') return { route: 'about' };
  if (clean === 'newsletter') return { route: 'newsletter' };
  /* Unknown routes used to render the homepage silently; now they
     land on the real 404 view. */
  return { route: 'not-found' };
}

export const App: React.FC = () => {
  // 1. Routing State
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [articleParam, setArticleParam] = useState<string | undefined>(undefined);
  const [healthTopic, setHealthTopic] = useState<string | undefined>(undefined);

  // Synchronize with URL Hash
  const handleHashChange = useCallback(() => {
    const { route, param } = parseHash(window.location.hash);
    /* A route that names a piece that does not exist is a 404 too —
       unknown article slugs and health topics used to fall back to
       the first article. */
    let resolvedRoute = route;
    if (route === 'article' && param && !ARTICLES.some((a) => a.id === param || a.slug === param)) {
      resolvedRoute = 'not-found';
    }
    if (route === 'health-topic' && param && !ARTICLES.some((a) => a.slug === param)) {
      resolvedRoute = 'not-found';
    }
    setCurrentRoute(resolvedRoute);
    setArticleParam(resolvedRoute === 'article' ? param : undefined);
    setHealthTopic(resolvedRoute === 'health-topic' ? param : undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  const navigateTo = (path: string) => {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  };

  // Find active article if on article detail route
  const activeArticle = articleParam
    ? ARTICLES.find((a) => a.id === articleParam || a.slug === articleParam) || ARTICLES[0]
    : ARTICLES[0];

  return (
    <div className="site-wrapper">
      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* Top Navigation Bar */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Content Area — keyed by route for the 200ms page fade */}
      <main key={currentRoute} className="site-main" id="main-content">
        <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
          {currentRoute === 'home' && (
            <HomePage onNavigate={navigateTo} />
          )}

          {currentRoute === 'understand' && (
            <UnderstandPage onNavigate={navigateTo} />
          )}

          {currentRoute === 'health' && (
            <HealthPage onNavigate={navigateTo} />
          )}

          {currentRoute === 'health-topic' && (
            <HealthTopicPage
              topicSlug={healthTopic}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute === 'habits' && (
            <HabitsPage onNavigate={navigateTo} />
          )}

          {(currentRoute === 'guides' || currentRoute === 'articles') && (
            <ArticlesPage onNavigate={navigateTo} />
          )}

          {currentRoute === 'research' && (
            <ResearchPage onNavigate={navigateTo} />
          )}

          {currentRoute === 'about' && (
            <AboutPage onNavigate={navigateTo} />
          )}

          {currentRoute === 'newsletter' && (
            <NewsletterPage onNavigate={navigateTo} />
          )}

          {currentRoute === 'article' && (
            <ArticleDetailPage
              article={activeArticle}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute === 'not-found' && (
            <NotFoundPage onNavigate={navigateTo} />
          )}
        </Suspense>
      </main>

      {/* Footer on Every Page */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
