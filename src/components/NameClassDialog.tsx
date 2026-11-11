import React, { useEffect, useRef, useState } from 'react';
import type { UserProfile } from '../types';
import { APP_SLOGAN } from '../questions';
import { PillButton } from './PillButton';
import { CloseIcon } from './icons';

interface NameClassDialogProps {
  isOpen: boolean;
  initialProfile: UserProfile;
  onConfirm: (profile: UserProfile) => void;
  onSkip: () => void;
}

/**
 * Plain-HTML <dialog> replacement for the Astryx Dialog.
 * Closing the dialog (Escape, backdrop click, or the X) is the same as
 * "Skip" — it dismisses without saving a profile. Submitting saves and
 * confirms. The native dialog returns focus to the previously focused
 * element when it closes.
 */
export const NameClassDialog: React.FC<NameClassDialogProps> = ({
  isOpen,
  initialProfile,
  onConfirm,
  onSkip
}) => {
  const [name, setName] = useState(initialProfile.name || '');
  const [classSection, setClassSection] = useState(initialProfile.classSection || '');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submittedRef.current = true;
    onConfirm({
      name: name.trim() || 'Guest',
      classSection: classSection.trim()
    });
  };

  // Native dialog close (Escape, backdrop, X, or programmatic close):
  // dismiss without saving, unless this close follows a submit.
  const handleClose = () => {
    if (submittedRef.current) {
      submittedRef.current = false;
      return;
    }
    onSkip();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="name-dialog"
      onClose={handleClose}
      onClick={handleBackdropClick}
      aria-labelledby="name-dialog-title"
    >
      <div className="name-dialog-panel">
        <button
          type="button"
          className="name-dialog-x"
          aria-label="Close without saving"
          onClick={() => dialogRef.current?.close()}
        >
          <CloseIcon size={16} />
        </button>
        <h2 id="name-dialog-title" className="name-dialog-title">Screen Habits Check</h2>
        <p className="name-dialog-subtitle">{APP_SLOGAN}</p>
        <p className="dialog-friendly-sub">Optional details for your personal report</p>

        <form onSubmit={handleSubmit} className="dialog-form">
          <label className="dialog-field" htmlFor="dialog-name">
            <span className="dialog-field-label">Your Name (optional)</span>
            <input
              id="dialog-name"
              type="text"
              className="dialog-input"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 40))}
              placeholder="e.g. Alex Morgan (or leave for Guest)"
              autoFocus
            />
          </label>

          <label className="dialog-field" htmlFor="dialog-class">
            <span className="dialog-field-label">Class / Grade (optional)</span>
            <input
              id="dialog-class"
              type="text"
              className="dialog-input"
              value={classSection}
              onChange={(e) => setClassSection(e.target.value.slice(0, 25))}
              placeholder="e.g. 10-B, Grade 11, or College"
            />
          </label>

          <div className="dialog-actions-row">
            <PillButton
              type="submit"
              label="Start Habits Check →"
              variant="primary"
              arrow
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};
