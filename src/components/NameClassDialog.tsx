import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { APP_SLOGAN } from '../questions';

interface NameClassDialogProps {
  isOpen: boolean;
  initialProfile: UserProfile;
  onConfirm: (profile: UserProfile) => void;
  onSkip: () => void;
}

export const NameClassDialog: React.FC<NameClassDialogProps> = ({
  isOpen,
  initialProfile,
  onConfirm,
  onSkip
}) => {
  const [name, setName] = useState(initialProfile.name || '');
  const [classSection, setClassSection] = useState(initialProfile.classSection || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      name: name.trim() || 'Guest',
      classSection: classSection.trim()
    });
  };

  return (
    <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="dialog-container">
        <div className="dialog-header">
          <div className="dialog-title-block">
            <h2 id="dialog-title" className="dialog-title">Screen Habits Check</h2>
            <p className="dialog-slogan">{APP_SLOGAN}</p>
            <p className="dialog-friendly-sub">Optional details for your personal report</p>
          </div>
          <button
            type="button"
            className="dialog-close-btn"
            onClick={onSkip}
            aria-label="Skip to question 1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="input-field-group">
            <label htmlFor="student-name-input" className="dialog-label">
              Your Name (optional)
            </label>
            <input
              id="student-name-input"
              type="text"
              className="dialog-input"
              placeholder="e.g. Alex Morgan (or leave for Guest)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              autoFocus
            />
          </div>

          <div className="input-field-group">
            <label htmlFor="student-class-input" className="dialog-label">
              Class / Grade (optional)
            </label>
            <input
              id="student-class-input"
              type="text"
              className="dialog-input"
              placeholder="e.g. 10-B, Grade 11, or College"
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              maxLength={25}
            />
          </div>

          <div className="dialog-actions-row">
            <button
              type="submit"
              className="dialog-btn-continue"
            >
              Start Habits Check →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
