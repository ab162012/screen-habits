import React, { useState } from 'react';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Button } from '@astryxdesign/core/Button';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      name: name.trim() || 'Guest',
      classSection: classSection.trim()
    });
  };

  // Closing the dialog (Escape, backdrop, or the header X) is the same as
  // the old "Skip to question 1" — it dismisses without saving a profile.
  const handleOpenChange = (open: boolean) => {
    if (!open) onSkip();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      width={480}
    >
      <DialogHeader
        title="Screen Habits Check"
        subtitle={APP_SLOGAN}
        onOpenChange={handleOpenChange}
      />

      <p className="dialog-friendly-sub">Optional details for your personal report</p>

      <form onSubmit={handleSubmit} className="dialog-form">
        <TextInput
          label="Your Name (optional)"
          isOptional
          value={name}
          onChange={(v) => setName(v.slice(0, 40))}
          placeholder="e.g. Alex Morgan (or leave for Guest)"
          hasAutoFocus
          width="100%"
        />

        <TextInput
          label="Class / Grade (optional)"
          isOptional
          value={classSection}
          onChange={(v) => setClassSection(v.slice(0, 25))}
          placeholder="e.g. 10-B, Grade 11, or College"
          width="100%"
        />

        <div className="dialog-actions-row">
          <Button
            type="submit"
            label="Start Habits Check →"
            variant="primary"
          />
        </div>
      </form>
    </Dialog>
  );
};
