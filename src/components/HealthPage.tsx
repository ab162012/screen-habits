import React from 'react';
import { ArticlesPage } from './ArticlesPage';

interface HealthPageProps {
  onNavigate: (route: string) => void;
}

/** Health & Effects — a category view of the one articles hub, not a
    second system. Same store, same cards, same detail page; the view
    shows only the six health categories (Sleep, Eyes, Focus, Body,
    Mind, Routines). Old #/health and #/health/<slug> URLs keep
    working. */
export const HealthPage: React.FC<HealthPageProps> = ({ onNavigate }) => {
  return <ArticlesPage onNavigate={onNavigate} view="health" />;
};
