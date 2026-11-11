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
import { PillButton } from './PillButton';
import { FloatingBar } from './FloatingBar';

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
  /* Skipped question ids, tracked as events — an unanswered question is
     NOT a skipped one. The skip button shows "✓ Marked as Skipped" only
     after an actual skip; answering the question clears the mark. */
  const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());

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
      const timer = setTimeout(() => setXpPopping(false), 150);
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

  // Handle Skip — records the skip (answer stays undefined, 0 XP).
  const handleSkip = () => {
    setSkippedIds((prev) => {
      const next = new Set(prev);
      next.add(currentQuestion.id);
      return next;
    });
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

  // Answering a question clears its skip mark (a skip is an event, not
  // a state of the answer — the answer itself is just undefined either way).
  const handleAnswerChange = (val: string | number | string[]) => {
    onUpdateAnswer(currentQuestion.id, val);
    setSkippedIds((prev) => {
      if (!prev.has(currentQuestion.id)) return prev;
      const next = new Set(prev);
      next.delete(currentQuestion.id);
      return next;
    });
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

      {/* Gamification row — ONE row: XP badge + level tag + streak pill.
          The skip message is plain text under the row, not a pill. */}
      <section className="quest-gamification-bar" aria-label="Quest Progress & Gamification">
        <div className="quest-gamification-header">
          <div className="quest-xp-group">
            {/* key = only the changed number pops, like the reel's dial */}
            <span key={currentXP} className={`quest-xp-badge ${xpPopping ? 'xp-pop' : ''}`}>{currentXP} XP</span>
            <span className="quest-level-tag">Level: {level}</span>
          </div>
          <div className={`quest-streak-pill ${currentStreak > 0 ? 'active' : ''}`}>
            <span className="quest-streak-emoji" aria-hidden="true">🔥</span>
            <span>Streak:</span>
            <strong key={currentStreak}>{currentStreak}</strong>
          </div>
        </div>
        {showSkipAlert && (
          <p className="quest-skip-alert" role="status">
            Streak reset to 0 — skip recorded
          </p>
        )}
      </section>

      {/* ONE progress control: the path strip IS the navigation
          (done nodes clickable back); the label IS the position display. */}
      <div className="quest-progress-row" aria-label={`Question ${safeStep + 1} of ${QUESTIONS.length}`}>
        <span className="quest-progress-label">{safeStep + 1} of {QUESTIONS.length}</span>
        <PathMap
          variant="strip"
          currentStep={safeStep}
          answers={answers}
          onSelect={onStepChange}
        />
      </div>

      {/* Question Card */}
      {/* key = remount per question, so the card slides in instead of pop-swapping */}
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        value={currentValue}
        onChange={handleAnswerChange}
        onSkip={handleSkip}
        isSkipped={skippedIds.has(currentQuestion.id)}
        questionNumber={safeStep + 1}
      />

      {/* Floating pill navigation — 12px above the viewport bottom edge. */}
      <FloatingBar label="Question Navigation">
        <PillButton
          label="← Back"
          variant="ghost"
          disabled={safeStep === 0}
          onClick={handleBack}
        />
        <PillButton
          label="Skip"
          variant="ghost"
          onClick={handleSkip}
        />
        <PillButton
          label={safeStep === QUESTIONS.length - 1 ? 'See Result' : 'Next'}
          variant="primary"
          arrow
          disabled={!isCurrentAnswered}
          onClick={handleNext}
        />
      </FloatingBar>
    </div>
  );
};
