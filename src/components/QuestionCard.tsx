import React from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  value: string | number | string[] | undefined;
  onChange: (val: string | number | string[]) => void;
  onSkip: () => void;
  isSkipped: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  onSkip,
  isSkipped
}) => {
  return (
    <article className="question-card" key={question.id}>
      <div className="section-hero-icon" aria-hidden="true">
        {question.partEmoji}
      </div>

      <div className="question-header">
        <h1 className="question-title">{question.title}</h1>
      </div>

      {/* Answer Type 1: Hours Slider */}
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
              <span className="slider-unset-prompt">Drag slider to set your hours</span>
            )}
          </div>

          <input
            type="range"
            min={question.min || 1}
            max={question.max || 16}
            step={question.step || 0.5}
            value={typeof value === 'number' ? value : 6}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            onInput={(e) => onChange(parseFloat((e.target as HTMLInputElement).value))}
            className={`hours-slider ${typeof value !== 'number' ? 'slider-unselected' : ''}`}
            aria-label={question.title}
          />

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
                {opt.emoji && <span className="chip-emoji">{opt.emoji}</span>}
                <span className="chip-label">{opt.label}</span>
                <span className={`chip-check-icon ${isSelected ? 'active' : ''}`}>
                  {isSelected ? '✓' : '+'}
                </span>
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
                <div className="card-leading">
                  {opt.emoji && <span className="card-emoji">{opt.emoji}</span>}
                  <div className="card-text-block">
                    <span className="card-label">{opt.label}</span>
                    {opt.subtext && <span className="card-subtext">{opt.subtext}</span>}
                  </div>
                </div>

                <div className={`radio-circle ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <span className="radio-dot" />}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Answer Type 4: 1 to 5 Scale */}
      {question.type === 'scale-1-to-5' && question.options && (
        <div className="scale-container" role="radiogroup" aria-label={question.title}>
          <div className="scale-buttons-row">
            {question.options.map((opt) => {
              const numVal = parseInt(opt.id, 10);
              const isSelected = value === numVal || value === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`scale-num-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => onChange(numVal)}
                >
                  <span className="scale-number">{opt.id}</span>
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
        <button
          type="button"
          className={`skip-button ${isSkipped ? 'active-skip' : ''}`}
          onClick={onSkip}
        >
          {isSkipped ? '✓ Marked as Skipped' : 'Skip this question →'}
        </button>
      </div>
    </article>
  );
};
