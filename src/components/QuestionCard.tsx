import React, { useEffect, useMemo, useRef } from 'react';
import { Button } from '@astryxdesign/core/Button';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  value: string | number | string[] | undefined;
  onChange: (val: string | number | string[]) => void;
  onSkip: () => void;
  isSkipped: boolean;
  questionNumber: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  onSkip,
  isSkipped,
  questionNumber
}) => {
  // Hours drum (reel's final form, Q1 only): a horizontal cylindrical drum.
  // Ticks slide sideways under a fixed centre pointer; the huge value
  // above it rolls vertically. Only the centred value is the answer.
  const dialRef = useRef<HTMLDivElement>(null);
  const programmaticRef = useRef(false);
  const scrollTimerRef = useRef<number | undefined>(undefined);
  // Reel direction: while the dial rolls, numbers blur like a mechanical
  // dial; the blur clears the moment it snaps to a value.
  const [isRolling, setIsRolling] = React.useState(false);
  const rollingTimerRef = useRef<number | undefined>(undefined);
  const dialValues = useMemo(() => {
    const min = question.min || 1;
    const max = question.max || 16;
    const step = question.step || 0.5;
    const out: number[] = [];
    for (let v = min; v <= max + 0.0001; v += step) out.push(Math.round(v * 10) / 10);
    return out;
  }, [question.min, question.max, question.step]);
  const dialItemWidth = 64;

  // Scroll the drum to the saved answer (or 6h as a neutral centre) on
  // question change, without calling onChange — scrolling alone must
  // never create an answer.
  useEffect(() => {
    const el = dialRef.current;
    if (!el || question.type !== 'slider') return;
    const target = typeof value === 'number' ? value : 6;
    const idx = dialValues.findIndex((v) => Math.abs(v - target) < 0.001);
    if (idx < 0) return;
    programmaticRef.current = true;
    el.scrollLeft = idx * dialItemWidth;
    window.setTimeout(() => {
      programmaticRef.current = false;
    }, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const handleDialScroll = () => {
    const el = dialRef.current;
    if (!el || programmaticRef.current) return;
    setIsRolling(true);
    window.clearTimeout(rollingTimerRef.current);
    rollingTimerRef.current = window.setTimeout(() => setIsRolling(false), 150);
    window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(() => {
      const idx = Math.round(el.scrollLeft / dialItemWidth);
      const next = dialValues[Math.min(Math.max(idx, 0), dialValues.length - 1)];
      if (next !== undefined && next !== value) onChange(next);
    }, 120);
  };

  const selectDial = (v: number) => {
    const el = dialRef.current;
    const idx = dialValues.findIndex((x) => Math.abs(x - v) < 0.001);
    if (el && idx >= 0) {
      programmaticRef.current = true;
      el.scrollTo({ left: idx * dialItemWidth, behavior: 'smooth' });
      window.setTimeout(() => {
        programmaticRef.current = false;
      }, 300);
    }
    onChange(v);
  };

  const stepDial = (dir: 1 | -1) => {
    if (typeof value !== 'number') {
      selectDial(6);
      return;
    }
    const idx = dialValues.findIndex((v) => Math.abs(v - value) < 0.001);
    const next = dialValues[Math.min(Math.max(idx + dir, 0), dialValues.length - 1)];
    if (next !== undefined) selectDial(next);
  };
  return (
    <article className="question-card" key={question.id}>
      <div className="icon-tile icon-tile-lg" aria-hidden="true">
        {question.partEmoji}
      </div>

      <div className="question-header">
        <p className="question-eyebrow">Question {questionNumber}</p>
        <h1 className="question-title">{question.title}</h1>
      </div>

      {/* Answer Type 1: Hours Drum — the reel's cylindrical drum. Flick or
          drag it sideways; the ticks slide under the fixed blue pointer and
          snap to the centred value. The huge number above rolls vertically.
          +/- and arrow keys work too. */}
      {question.type === 'slider' && (
        <div className="slider-container">
          <div className="slider-display">
            {typeof value === 'number' ? (
              <>
                {/* key = only the changed number pops; layout stays fixed-width */}
                <span key={value.toFixed(1)} className="slider-value">{value.toFixed(1)}</span>
                <span className="slider-unit">{question.unit || 'hours / day'}</span>
              </>
            ) : (
              <span className="slider-unset-prompt">Scroll the dial to set your hours</span>
            )}
          </div>

          <div className="hours-dial-wrap">
            <button type="button" className="hours-dial-btn" onClick={() => stepDial(-1)} aria-label="Decrease hours">
              −
            </button>
            <div className="hours-drum-box">
              <div className="hours-drum-pointer" aria-hidden="true" />
              <div className={`hours-drum ${isRolling ? 'rolling' : ''}`} ref={dialRef} onScroll={handleDialScroll} role="listbox" aria-label={question.title}>
              {dialValues.map((v) => {
                const isActive = value === v;
                return (
                  <button
                    key={v}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`hours-drum-item ${isActive ? 'active' : ''}`}
                    onClick={() => selectDial(v)}
                  >
                    {v.toFixed(1)}
                  </button>
                );
              })}
              </div>
            </div>
            <button type="button" className="hours-dial-btn" onClick={() => stepDial(1)} aria-label="Increase hours">
              +
            </button>
          </div>

          <div className="slider-ticks">
            <span>{question.min || 1}h</span>
            <span>4h</span>
            <span>8h</span>
            <span>12h</span>
            <span>{question.max || 16}h+</span>
          </div>
        </div>
      )}

      {/* Answer Type 2: Multi-Choice Chips */}
      {question.type === 'multi-chips' && question.options && (
        <div className="chips-grid" role="group" aria-label={question.title}>
          {question.options.map((opt) => {
            const currentArray = Array.isArray(value) ? value : [];
            const isSelected = currentArray.includes(opt.id);

            const toggleChip = () => {
              if (isSelected) {
                onChange(currentArray.filter((item) => item !== opt.id));
              } else {
                onChange([...currentArray, opt.id]);
              }
            };

            return (
              <button
                key={opt.id}
                type="button"
                className={`chip-button ${isSelected ? 'selected' : ''}`}
                onClick={toggleChip}
                aria-pressed={isSelected}
              >
                {isSelected && <span className="chip-check-badge" aria-hidden="true">✓</span>}
                {opt.emoji && <span className="chip-emoji">{opt.emoji}</span>}
                <span className="chip-label">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Answer Type 3: Single-Choice Cards (Phone-first full width, tablet/desktop 2 col) */}
      {question.type === 'single-cards' && question.options && (
        <div className="single-cards-grid" role="radiogroup" aria-label={question.title}>
          {question.options.map((opt) => {
            const isSelected = value === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onChange(opt.id)}
              >
                {isSelected && <span className="option-check-badge" aria-hidden="true">✓</span>}
                {opt.emoji && <span className="card-emoji">{opt.emoji}</span>}
                <span className="card-label">{opt.label}</span>
                {opt.subtext && <span className="card-subtext">{opt.subtext}</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Answer Type 4: 1 to 5 Scale — face cards, screenshot 1 style */}
      {question.type === 'scale-1-to-5' && question.options && (
        <div className="scale-container" role="radiogroup" aria-label={question.title}>
          <div className="scale-buttons-row">
            {question.options.map((opt) => {
              const numVal = parseInt(opt.id, 10);
              const isSelected = value === numVal || value === opt.id;
              const face = ['😩', '😕', '😐', '🙂', '😄'][numVal - 1] || '😐';
              const shortLabel = opt.label.includes('— ') ? opt.label.split('— ')[1] : opt.label;

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`scale-face-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => onChange(numVal)}
                >
                  {isSelected && <span className="option-check-badge" aria-hidden="true">✓</span>}
                  <span className="scale-face" aria-hidden="true">{face}</span>
                  <span className="scale-face-label">{shortLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="scale-labels-legend">
            <span>1 — Restless or exhausted</span>
            <span>5 — Deep & refreshed</span>
          </div>

          {value && (
            <div className="scale-selected-hint">
              {question.options.find((o) => o.id === String(value))?.label}
            </div>
          )}
        </div>
      )}

      {/* Skip button on every question */}
      <div className="skip-row">
        <Button
          label={isSkipped ? '✓ Marked as Skipped' : 'Skip this question →'}
          variant="ghost"
          onClick={onSkip}
        />
      </div>
    </article>
  );
};
