import React from 'react';
import { ARTICLES } from '../data/articles';
import { ArticleDetailPage } from './ArticleDetailPage';

interface HealthTopicPageProps {
  topicSlug?: string;
  onNavigate: (route: string) => void;
}

/** One Health & Effects topic — a thin wrapper over the one detail
    page. Old #/health/<slug> URLs render the same piece; the back
    button returns to Health & Effects. */
export const HealthTopicPage: React.FC<HealthTopicPageProps> = ({ topicSlug, onNavigate }) => {
  const article = ARTICLES.find((a) => a.slug === topicSlug) || ARTICLES[0];

  return (
    <ArticleDetailPage
      article={article}
      onNavigate={onNavigate}
      backRoute="health"
      backLabel="← Back to Health & Effects"
    />
  );
};
