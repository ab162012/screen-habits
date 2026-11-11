import React from 'react';
import { QUESTIONS, isQuestionAnswered } from '../questions';
import type { AnswersState } from '../types';

/**
 * Quest progress strip — the quest's ONLY progress indicator.
 * Horizontal strip of 10 nodes: done = ocean filled check, current =
 * big ocean-mid node, upcoming = grey, locked, not clickable. Done
 * nodes are clickable to go back. A node is done only when its question
 * is actually answered (skip = not answered).
 *
 * The Home "Your Path" winding timeline was removed entirely in the
 * redesign round — this file is the strip only. There is no 'full'
 * variant any more.
 */
interface PathMapProps {
  currentStep: number;
  answers: AnswersState;
  onSelect?: (step: number) => void;
}

export const PathMap: React.FC<PathMapProps> = ({
  currentStep,
  answers,
  onSelect
}) => {
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
            {done ? '✓' : isCurrent ? i + 1 : (
              <span className="path-strip-emoji" aria-hidden="true">{q.partEmoji}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
