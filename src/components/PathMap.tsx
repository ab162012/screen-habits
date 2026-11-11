import React, { useEffect, useRef, useState } from 'react';
import { QUESTIONS, isQuestionAnswered, PART_NAMES } from '../questions';
import type { AnswersState } from '../types';

/**
 * Path Template — the one path component for the whole site.
 * - Full (winding path): Home preview — 10 nodes along an ocean SVG path drawn
 *   over a light-blue track as the user scrolls; part labels as two-word
 *   display titles + count bubbles. On phones it becomes a vertical snake.
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

/* Sine-wave winding path geometry (viewBox 1000 x 680 — 60px top inset so
   part labels, which sit BELOW their node, never collide with the section
   intro above the path). */
const PATH_W = 1000;
const PATH_H = 680;
const pathPoint = (t: number) => ({
  x: 500 + 340 * Math.sin(t * Math.PI * 2.5),
  y: 90 + t * 560
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
  const drawnPathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pathLength, setPathLength] = useState(2400);
  const [drawProgress, setDrawProgress] = useState(0);

  /* Scroll-linked draw of the ocean path over the light-blue track.
     requestAnimationFrame-throttled: the old version called setState on
     every scroll event. */
  useEffect(() => {
    if (variant !== 'full') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawProgress(1);
      return;
    }
    const pathEl = drawnPathRef.current;
    if (pathEl) {
      try {
        setPathLength(pathEl.getTotalLength());
      } catch {
        // keep the fallback length
      }
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;
      const total = rect.height + viewportH;
      const seen = viewportH - rect.top;
      const p = Math.min(1, Math.max(0, seen / total));
      setDrawProgress(p);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [variant]);

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
      <div className="path-winding" ref={wrapRef}>
        <svg
          className="path-winding-svg"
          viewBox={`0 0 ${PATH_W} ${PATH_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={buildPathD()} className="path-track" fill="none" />
          <path
            ref={drawnPathRef}
            d={buildPathD()}
            className="path-drawn"
            fill="none"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength * (1 - drawProgress)
            }}
          />
          {/* Travelling blue dot at the drawn head. */}
          <circle
            className="path-traveller"
            r="7"
            cx={pathPoint(drawProgress).x}
            cy={pathPoint(drawProgress).y}
          />
        </svg>
        {QUESTIONS.map((q, i) => {
          const p = pathPoint((i + 0.5) / QUESTIONS.length);
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
          const p = pathPoint((first + 0.5) / QUESTIONS.length);
          return (
            <span
              key={part.index}
              className="path-part-label"
              style={{ left: `${(p.x / PATH_W) * 100}%`, top: `${(p.y / PATH_H) * 100}%` }}
            >
              <span className="path-part-chip">Part {part.index + 1}</span>
              <span className="path-part-emoji" aria-hidden="true">{part.emoji}</span>
              <span className="path-part-title">{part.title}</span>
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
