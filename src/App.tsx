import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ArticlesPage } from './components/ArticlesPage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { UnderstandPage } from './components/UnderstandPage';
import { HealthPage } from './components/HealthPage';
import { HealthTopicPage } from './components/HealthTopicPage';
import { HabitsPage } from './components/HabitsPage';
import { ResearchPage } from './components/ResearchPage';
import { AboutPage } from './components/AboutPage';
import { NewsletterPage } from './components/NewsletterPage';
import { ARTICLES } from './data/articles';

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
  return { route: 'home' };
}

export const App: React.FC = () => {
  // 1. Routing State
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [articleParam, setArticleParam] = useState<string | undefined>(undefined);
  const [healthTopic, setHealthTopic] = useState<string | undefined>(undefined);

  // Synchronize with URL Hash
  const handleHashChange = useCallback(() => {
    const { route, param } = parseHash(window.location.hash);
    setCurrentRoute(route);
    setArticleParam(route === 'article' ? param : undefined);
    setHealthTopic(route === 'health-topic' ? param : undefined);
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
      </main>

      {/* Footer on Every Page */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
