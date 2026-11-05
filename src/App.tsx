import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { QuestPage } from './components/QuestPage';
import { ResultPage } from './components/ResultPage';
import { ArticlesPage } from './components/ArticlesPage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { ARTICLES } from './data/articles';
import { QUESTIONS, isQuestionAnswered } from './questions';
import type { AnswersState, UserProfile } from './types';

const STORAGE_KEY_PROFILE = 'screen_habits_profile_gamified';
const STORAGE_KEY_ANSWERS = 'screen_habits_answers_gamified';
const STORAGE_KEY_STEP = 'screen_habits_step_gamified';
const STORAGE_KEY_DIALOG = 'screen_habits_dialog_gamified';
const STORAGE_KEY_COMPLETIONS = 'screen_habits_completion_count';

function parseHash(hash: string): { route: string; param?: string } {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === 'home') return { route: 'home' };
  if (clean === 'quest') return { route: 'quest' };
  if (clean === 'result') return { route: 'result' };
  if (clean === 'articles') return { route: 'articles' };
  if (clean.startsWith('article/')) {
    const articleId = clean.replace('article/', '');
    return { route: 'article', param: articleId };
  }
  return { route: 'home' };
}

export const App: React.FC = () => {
  // 1. Routing State
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [articleParam, setArticleParam] = useState<string | undefined>(undefined);

  // Synchronize with URL Hash
  const handleHashChange = useCallback(() => {
    const { route, param } = parseHash(window.location.hash);
    setCurrentRoute(route);
    setArticleParam(param);
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

  // 2. Profile State (Name & Class)
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return { name: '', classSection: '' };
  });

  // 3. Name & Class Dialog visibility
  const [showDialog, setShowDialog] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DIALOG);
      return saved !== 'dismissed';
    } catch {
      return true;
    }
  });

  // 4. Quest Answers State — STRICTLY EMPTY BY DEFAULT. NO AUTOFILL EVER!
  const [answers, setAnswers] = useState<AnswersState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANSWERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  // 5. Current Step in Quest (0 to 9)
  const [currentStep, setCurrentStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STEP);
      if (saved) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num >= 0 && num < QUESTIONS.length) {
          return num;
        }
      }
    } catch {
      // fallback
    }
    return 0;
  });

  // 6. Completion Count (for Comeback badge)
  const [completionCount, setCompletionCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETIONS);
      if (saved) return parseInt(saved, 10) || 0;
    } catch {
      // fallback
    }
    return 0;
  });

  // Autosave Profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch {
      // fallback
    }
  }, [profile]);

  // Autosave Answers
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    } catch {
      // fallback
    }
  }, [answers]);

  // Autosave Step
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STEP, currentStep.toString());
    } catch {
      // fallback
    }
  }, [currentStep]);

  // Autosave Completion Count
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETIONS, completionCount.toString());
    } catch {
      // fallback
    }
  }, [completionCount]);

  // Handle Answer Update
  const handleUpdateAnswer = (
    questionId: string,
    value: string | number | string[] | undefined
  ) => {
    setAnswers((prev) => {
      const next = { ...prev };
      if (value === undefined) {
        delete next[questionId];
      } else {
        next[questionId] = value;
      }
      return next;
    });
  };

  // Handle Dialog Dismissal
  const handleCloseDialog = () => {
    setShowDialog(false);
    try {
      localStorage.setItem(STORAGE_KEY_DIALOG, 'dismissed');
    } catch {
      // fallback
    }
  };

  // Finish Quest
  const handleFinishQuest = () => {
    const newCount = completionCount + 1;
    setCompletionCount(newCount);
    navigateTo('result');
  };

  // Retake Quest (clears answers, resets to Step 0, starts fresh)
  const handleRetake = () => {
    setAnswers({});
    setCurrentStep(0);
    try {
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
      localStorage.setItem(STORAGE_KEY_STEP, '0');
    } catch {
      // fallback
    }
    navigateTo('quest');
  };

  // Check if user has answered any questions
  const hasExistingAnswers = Object.keys(answers).some((key) => {
    const q = QUESTIONS.find((item) => item.id === key);
    return q ? isQuestionAnswered(q, answers[key]) : false;
  });

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
          <HomePage
            onNavigate={navigateTo}
            hasExistingAnswers={hasExistingAnswers}
          />
        )}

        {currentRoute === 'quest' && (
          <QuestPage
            answers={answers}
            onUpdateAnswer={handleUpdateAnswer}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            profile={profile}
            onUpdateProfile={setProfile}
            showDialog={showDialog}
            onCloseDialog={handleCloseDialog}
            onFinishQuest={handleFinishQuest}
          />
        )}

        {currentRoute === 'result' && (
          <ResultPage
            answers={answers}
            profile={profile}
            completionCount={completionCount}
            onRetake={handleRetake}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'articles' && (
          <ArticlesPage onNavigate={navigateTo} />
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

