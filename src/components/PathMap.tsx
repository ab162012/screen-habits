import React from 'react';
import { QUESTIONS, isQuestionAnswered } from '../questions';
import type { AnswersState } from '../types';

/**
 * Path Template — the one path component for the whole site.
 * Duolingo-level feel, our own build, no copied assets:
 * - Full (vertical snake): Home preview + the winding path you walk.
 * - Strip (horizontal): Quest lesson top + Result finish, progress at a glance.
 * Done = navy filled check. Current = big blue node, pulsing ring.
 * Upcoming = grey, locked, not clickable. Done nodes are clickable to go back.
 * XP / streak are never invented here — a node is done only when its
 * question is actually answered (skip = not answered).
 */
interface PathMapProps {
  currentStep: number;
  answers: AnswersState;
  variant?: 'full' | 'strip';
  onSelect?: (step: number) => void;
  /** Preview (Home): no answers yet, so every node taps through to start the quest. */
  preview?: boolean;
}

export const PathMap: React.FC<PathMapProps> = ({
  currentStep,
  answers,
  variant = 'full',
  onSelect,
  preview = false
}) => {
  const parts = [0, 1, 2, 3];
  const partFirstStep = (partIndex: number) =>
    QUESTIONS.findIndex((q) => q.partIndex === partIndex);

  if (variant === 'strip') {
    return (
      <div className="path-strip" role="list" aria-label="Quest path">
        {QUESTIONS.map((q, i) => {
          const done = isQuestionAnswered(q, answers[q.id]);
          const isCurrent = i === currentStep && currentStep < QUESTIONS.length;
          const state = done ? 'done' : isCurrent ? 'current' : 'locked';
          const clickable = done && onSelect;
          return (
            <button
              key={q.id}
              type="button"
              role="listitem"
              className={`path-node path-node-strip path-node-${state}`}
              disabled={!clickable}
              onClick={clickable ? () => onSelect(i) : undefined}
              aria-label={`Question ${i + 1}, ${q.partTitle}: ${state}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {done ? '✓' : q.partEmoji}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="path-map" aria-label="Quest path">
      {parts.map((partIndex) => {
        const first = partFirstStep(partIndex);
        if (first < 0) return null;
        const partQuestions = QUESTIONS.filter((q) => q.partIndex === partIndex);
        const part = QUESTIONS[first];
        return (
          <div key={partIndex} className="path-part">
            <div className="path-part-label">
              <span className="emoji-medallion path-part-emoji" aria-hidden="true">{part.partEmoji}</span>
              <span>{part.partTitle}</span>
            </div>
            {partQuestions.map((q) => {
              const i = QUESTIONS.indexOf(q);
              const done = isQuestionAnswered(q, answers[q.id]);
              const isCurrent = i === currentStep && currentStep < QUESTIONS.length;
              const state = done ? 'done' : isCurrent ? 'current' : 'locked';
              const clickable = preview ? Boolean(onSelect) : Boolean(done && onSelect);
              return (
                <button
                  key={q.id}
                  type="button"
                  className={`path-node path-node-${state}`}
                  disabled={!clickable}
                  onClick={clickable && onSelect ? () => onSelect(i) : undefined}
                  aria-label={`Question ${i + 1}, ${q.partTitle}: ${state}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span className="path-node-face" aria-hidden="true">
                    {done ? '✓' : q.partEmoji}
                  </span>
                  <span className="path-node-num">{i + 1}</span>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
