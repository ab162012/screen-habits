import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  QUESTIONS,
  isQuestionAnswered,
  getGamificationLevel
} from '../questions';
import type { AnswersState, UserProfile } from '../types';
import { PathMap } from './PathMap';
import { QuestionCard } from './QuestionCard';
import { NameClassDialog } from './NameClassDialog';

interface QuestPageProps {
  answers: AnswersState;
  onUpdateAnswer: (questionId: string, value: string | number | string[] | undefined) => void;
  currentStep: number;
  onStepChange: (step: number) => void;
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  showDialog: boolean;
  onCloseDialog: () => void;
  onFinishQuest: () => void;
}

export const QuestPage: React.FC<QuestPageProps> = ({
  answers,
  onUpdateAnswer,
  currentStep,
  onStepChange,
  profile,
  onUpdateProfile,
  showDialog,
  onCloseDialog,
  onFinishQuest
}) => {
  const [showSkipAlert, setShowSkipAlert] = useState(false);
  const [xpPopping, setXpPopping] = useState(false);

  // 1. Calculate XP (10 XP per answered question, 0 for skipped)
  const answeredCount = useMemo(() => {
    let count = 0;
    QUESTIONS.forEach((q) => {
      if (isQuestionAnswered(q, answers[q.id])) {
        count++;
      }
    });
    return count;
  }, [answers]);

  const currentXP = answeredCount * 10;
  const { level } = getGamificationLevel(currentXP);

  const prevXpRef = useRef(currentXP);
  useEffect(() => {
    if (currentXP > prevXpRef.current) {
      setXpPopping(true);
      const timer = setTimeout(() => setXpPopping(false), 400);
      prevXpRef.current = currentXP;
      return () => clearTimeout(timer);
    }
    prevXpRef.current = currentXP;
  }, [currentXP]);

  // 2. Calculate consecutive answered streak up to current step
  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = 0; i < currentStep; i++) {
      const q = QUESTIONS[i];
      if (isQuestionAnswered(q, answers[q.id])) {
        streak++;
      } else {
        streak = 0;
      }
    }
    return streak;
  }, [answers, currentStep]);

  // Current question
  const safeStep = Math.min(Math.max(0, currentStep), QUESTIONS.length - 1);
  const currentQuestion = QUESTIONS[safeStep];
  const currentValue = answers[currentQuestion.id];
  const isCurrentAnswered = isQuestionAnswered(currentQuestion, currentValue);

  // Handle Skip
  const handleSkip = () => {
    onUpdateAnswer(currentQuestion.id, undefined);
    setShowSkipAlert(true);
    setTimeout(() => {
      setShowSkipAlert(false);
    }, 3500);

    if (safeStep === QUESTIONS.length - 1) {
      onFinishQuest();
    } else {
      onStepChange(safeStep + 1);
    }
  };

  // Handle Next
  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (safeStep === QUESTIONS.length - 1) {
      onFinishQuest();
    } else {
      onStepChange(safeStep + 1);
    }
  };

  // Handle Back
  const handleBack = () => {
    if (safeStep > 0) {
      onStepChange(safeStep - 1);
    }
  };

  return (
    <div className="main-content-questions">
      {/* Name and Class Dialog */}
      <NameClassDialog
        isOpen={showDialog}
        initialProfile={profile}
        onConfirm={(p) => {
          onUpdateProfile(p);
          onCloseDialog();
        }}
        onSkip={onCloseDialog}
      />

      {/* Gamification Bar */}
      <section className="quest-gamification-bar" aria-label="Quest Progress & Gamification">
        <div className="quest-gamification-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className={`quest-xp-badge ${xpPopping ? 'xp-pop' : ''}`}>{currentXP} XP</span>
            <span className="quest-level-tag">Level: {level}</span>
          </div>
          <div className={`quest-streak-pill ${currentStreak > 0 ? 'active' : ''} ${showSkipAlert ? 'reset-shake' : ''}`}>
            <span>🔥 Streak:</span>
            <strong>{currentStreak}</strong>
          </div>
        </div>
        <div className="quest-xp-track" role="progressbar" aria-valuenow={currentXP} aria-valuemin={0} aria-valuemax={100}>
          <div className="quest-xp-fill" style={{ width: `${currentXP}%` }} />
        </div>
        {showSkipAlert && (
          <div className="quest-skip-alert" role="status">
            Streak reset to 0 — skip recorded
          </div>
        )}
      </section>

      {/* Path strip: the whole 10-node path at a glance, tap a done node to go back */}
      <PathMap
        variant="strip"
        currentStep={safeStep}
        answers={answers}
        onSelect={onStepChange}
      />

      {/* Question Card (User's original component) */}
      {/* key = remount per question, so the card slides in instead of pop-swapping */}
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        value={currentValue}
        onChange={(val) => onUpdateAnswer(currentQuestion.id, val)}
        onSkip={handleSkip}
        isSkipped={!isCurrentAnswered && currentValue === undefined}
      />

      {/* Sticky Bottom Navigation Bar (User's original UI/UX) */}
      <nav className="sticky-nav-bar" aria-label="Question Navigation">
        <div className="sticky-nav-inner">
          <button
            type="button"
            className="btn-back"
            onClick={handleBack}
            disabled={safeStep === 0}
            style={{ opacity: safeStep === 0 ? 0.45 : 1, cursor: safeStep === 0 ? 'not-allowed' : 'pointer' }}
            aria-label="Previous question"
          >
            ← Back
          </button>

          <button
            type="button"
            className="skip-button"
            onClick={handleSkip}
            aria-label="Skip this question"
          >
            Skip
          </button>

          <button
            type="button"
            className="btn-next"
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            style={{ opacity: !isCurrentAnswered ? 0.45 : 1, cursor: !isCurrentAnswered ? 'not-allowed' : 'pointer' }}
            aria-label={safeStep === QUESTIONS.length - 1 ? 'See Result' : 'Next question'}
          >
            {safeStep === QUESTIONS.length - 1 ? 'See Result →' : 'Next →'}
          </button>
        </div>
      </nav>
    </div>
  );
};
