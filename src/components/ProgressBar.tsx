import React from 'react';

interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  partTitle: string;
  partEmoji: string;
  partIndex: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestionIndex,
  totalQuestions,
  partTitle,
  partEmoji,
  partIndex
}) => {
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <header className="progress-header">
      <div className="progress-top-row">
        <div className="part-badge">
          <span className="part-emoji" aria-hidden="true">{partEmoji}</span>
          <span className="part-text">Part {partIndex + 1} · {partTitle}</span>
        </div>

        <div className="header-actions">
          <span className="step-counter">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
