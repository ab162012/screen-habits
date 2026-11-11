import React from 'react';
import { QUESTIONS, isQuestionAnswered, PART_NAMES } from '../questions';
import type { AnswersState } from '../types';

/**
 * Path Template — the one path component for the whole site.
 * - Full (winding path): Home preview — 10 nodes along a single full-ocean
 *   SVG path; part labels as two-word display titles + count bubbles. On
 *   phones it becomes a vertical snake.
 * - Strip (horizontal): Quest + Result, progress at a glance.
 * Done = ocean filled check. Current = big ocean-mid node, pulsing ring.
 * Upcoming = grey, locked, not clickable. Done nodes are clickable to go back.
 * A node is done only when its question is actually answered (skip = not answered).
 */
interface PathMapProps {
  currentStep: number;
  answers: AnswersState;
  variant?: 'full' | 'strip';
  onSelect?: (step: number) => void;
  /** Preview (Home): no answers yet, so every node taps through to start the quest. */
  preview?: boolean;
}

/* Gentle single-S winding path (viewBox 1000 x 930 — 140px top inset so
   the Part 1 label, which sits ABOVE its node, never leaves the box).
   One full sine period over the height: wide graceful lobes, no hairpins.
   Nodes sit at part-aware t values (not uniform t): 56px steps inside a
   part, ~130px gaps between parts, so each part's label fits ABOVE its
   first node without touching the previous node. Consecutive nodes are
   >=68px apart at full width (52px nodes) — none touch, none stack.
   The path starts exactly at Q1 and ends exactly at Q10: no dangling ends.
   One stroke, one colour: the path is a single full-ocean track. The old
   pale track + scroll-drawn overlay split it dark-then-pale with a hard
   visible seam at the draw point (seen between nodes 5 and 6), so the
   draw is gone — no second stroke, no seam. The travelling dot is gone
   (it read as a stray dot). */
const PATH_W = 1000;
const PATH_H = 930;
/* t for each node (y = 140, 196, 326, 382, 438, 568, 624, 754, 810, 866). */
const NODE_T = [0, 0.0771, 0.2562, 0.3333, 0.4105, 0.5895, 0.6667, 0.8457, 0.9229, 1];
const pathPoint = (t: number) => ({
  x: 500 + 280 * Math.sin(t * Math.PI * 2),
  y: 140 + t * 726
});

const buildPathD = () => {
  const steps = 60;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = pathPoint(t);
    d += `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
  }
  return d.trim();
};

export const PathMap: React.FC<PathMapProps> = ({
  currentStep,
  answers,
  variant = 'full',
  onSelect,
  preview = false
}) => {
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
              {done ? '✓' : isCurrent ? i + 1 : (
                <span className="path-strip-emoji" aria-hidden="true">{q.partEmoji}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  const nodeState = (i: number) => {
    const q = QUESTIONS[i];
    const done = isQuestionAnswered(q, answers[q.id]);
    const isCurrent = i === currentStep && currentStep < QUESTIONS.length;
    return done ? 'done' : isCurrent ? 'current' : 'locked';
  };
  const nodeClickable = (i: number) =>
    preview ? Boolean(onSelect) : Boolean(isQuestionAnswered(QUESTIONS[i], answers[QUESTIONS[i].id]) && onSelect);

  const renderNode = (i: number) => {
    const q = QUESTIONS[i];
    const state = nodeState(i);
    const clickable = nodeClickable(i);
    return (
      <button
        key={q.id}
        type="button"
        className={`path-node path-node-full path-node-${state}`}
        disabled={!clickable}
        onClick={clickable && onSelect ? () => onSelect(i) : undefined}
        aria-label={`Question ${i + 1}, ${q.partTitle}: ${state}`}
        aria-current={state === 'current' ? 'step' : undefined}
      >
        <span className="path-node-face" aria-hidden="true">
          {state === 'done' ? '✓' : i + 1}
        </span>
      </button>
    );
  };

  return (
    <div className="path-map" aria-label="Quest path">
      {/* Desktop / tablet: winding SVG path with nodes placed along it. */}
      <div className="path-winding">
        <svg
          className="path-winding-svg"
          viewBox={`0 0 ${PATH_W} ${PATH_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path d={buildPathD()} className="path-track" fill="none" />
        </svg>
        {QUESTIONS.map((q, i) => {
          const p = pathPoint(NODE_T[i]);
          return (
            <span
              key={q.id}
              className="path-node-slot"
              style={{ left: `${(p.x / PATH_W) * 100}%`, top: `${(p.y / PATH_H) * 100}%` }}
            >
              {renderNode(i)}
            </span>
          );
        })}
        {PART_NAMES.map((part) => {
          const first = QUESTIONS.findIndex((q) => q.partIndex === part.index);
          if (first < 0) return null;
          const count = QUESTIONS.filter((q) => q.partIndex === part.index).length;
          const p = pathPoint(NODE_T[first]);
          return (
            <span
              key={part.index}
              className="path-part-label"
              style={{ left: `${(p.x / PATH_W) * 100}%`, top: `${(p.y / PATH_H) * 100}%` }}
            >
              <span className="path-part-row">
                <span className="path-part-chip">Part {part.index + 1}</span>
                <span className="path-part-emoji" aria-hidden="true">{part.emoji}</span>
                <span className="path-part-title">{part.title}</span>
              </span>
              <span className="path-part-count">{count} questions</span>
            </span>
          );
        })}
      </div>

      {/* Phones: vertical snake — same nodes and labels, stacked. */}
      <div className="path-snake">
        {PART_NAMES.map((part) => {
          const partQuestions = QUESTIONS.filter((q) => q.partIndex === part.index);
          const count = partQuestions.length;
          return (
            <div key={part.index} className="path-snake-part">
              <div className="path-snake-label">
                <span className="path-part-chip">Part {part.index + 1}</span>
                <span className="path-part-emoji" aria-hidden="true">{part.emoji}</span>
                <span className="path-part-title">{part.title}</span>
                <span className="path-part-count">{count} questions</span>
              </div>
              <div className="path-snake-nodes">
                {partQuestions.map((q) => renderNode(QUESTIONS.indexOf(q)))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
