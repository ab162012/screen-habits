import React from 'react';
import { PillButton } from './PillButton';
import { Reveal } from './Reveal';

interface QuestInfoPageProps {
  onNavigate: (route: string) => void;
  hasExistingAnswers: boolean;
}

/** The Screen Habits Quest, explained. Every fact here comes from
    the quest itself (src/questions.ts): 10 questions, 4 parts, 10 XP
    per answered question, bands at 80 / 60 / 40. Nothing invented. */
const CATEGORIES = [
  { emoji: '📱', title: 'Devices & Time', desc: '2 questions — how much of your day screens take, and when.' },
  { emoji: '📲', title: 'Apps & Scrolling', desc: '3 questions — what you open, and whether you chose to.' },
  { emoji: '🌙', title: 'Night & Sleep', desc: '2 questions — screens in the evening, and the last hour before bed.' },
  { emoji: '🎯', title: 'Body & Focus', desc: '3 questions — eyes, posture, and how well you can concentrate.' }
];

const BANDS = [
  { name: 'Thriving', threshold: '80–100', emoji: '🏆', desc: 'Excellent balance. Your screen habits support your energy and clarity.' },
  { name: 'Balanced', threshold: '60–79', emoji: '⚖️', desc: 'Good foundation. A few minor tweaks will elevate your daily focus.' },
  { name: 'Strained', threshold: '40–59', emoji: '📉', desc: 'Noticeable digital fatigue. Screen time is cutting into rest and focus.' },
  { name: 'Overloaded', threshold: '0–39', emoji: '🆘', desc: 'High screen overload. Your eyes, sleep, and mental clarity need recovery.' },
  { name: 'Incomplete', threshold: 'Under 5 answered', emoji: '🏆', desc: 'Not enough answers for a full score. Answer at least 5 of 10 questions to receive your Screen Balance score.' }
];

export const QuestInfoPage: React.FC<QuestInfoPageProps> = ({ onNavigate, hasExistingAnswers }) => {
  return (
    <div className="articles-page-wrapper">
      <section className="articles-header" aria-labelledby="quest-info-title">
        <span className="eyebrow">The Quest</span>
        <h1 id="quest-info-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">🧭</span> Screen Habits Quest
        </h1>
        <p className="articles-intro">
          A free 10-question check that helps you see your screen habits
          clearly — across devices, apps, sleep, and focus. Two minutes,
          no sign-up, and an honest result: your score, your band, and
          three practical actions.
        </p>
        <div className="articles-preview-footer">
          <PillButton
            label={hasExistingAnswers ? 'Continue the Quest' : 'Start the Quest'}
            variant="primary"
            size="lg"
            arrow
            onClick={() => onNavigate('quest')}
          />
        </div>
      </section>

      <div className="article-steps-list">
        <Reveal>
          <section className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">01</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">What the quest measures</h2>
              <p className="article-step-detail">
                The quest measures your habits, not your hours. It asks how you use screens across four parts of your day — devices and time, apps and scrolling, night and sleep, body and focus — and turns your answers into a Screen Balance score out of 100. It does not measure intelligence, worth, or how good a student you are. It measures patterns: what you do, when you do it, and what gets pushed out.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">02</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">How to participate</h2>
              <p className="article-step-detail">
                There is nothing to install and nothing to sign up for. Open the quest, answer the ten questions honestly, and skip any question you would rather not answer — a skipped question is simply left out, never filled in for you. It takes about two minutes. Your answers stay on your own device; nothing is sent anywhere.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">03</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">The four question categories</h2>
              <p className="article-step-detail">
                Ten questions in four parts. Each part covers one area of your digital day, and each part is scored separately so your result can show exactly where your weakest area is.
              </p>
              <div className="home-campaign-grid">
                {CATEGORIES.map((cat) => (
                  <div className="home-campaign-card" key={cat.title}>
                    <span className="home-campaign-emoji" aria-hidden="true">{cat.emoji}</span>
                    <span className="home-campaign-title">{cat.title}</span>
                    <span className="home-campaign-desc">{cat.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">04</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">Scoring and XP</h2>
              <p className="article-step-detail">
                Every answered question earns 10 XP. A skipped question earns 0 XP — it is never autofilled, and it never counts against you beyond the XP you did not earn. Your score is scaled over the questions you answered only, so skipping does not drag your score down unfairly. Answer fewer than 5 of the 10 questions and your result is a Partial Result instead of a full score. Answer honestly: the score is only useful if the answers are real.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">05</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">The four result bands</h2>
              <p className="article-step-detail">
                Your score out of 100 places you in one of four bands. The band is a description of your habits right now, not a grade and not a judgement.
              </p>
              <div className="home-campaign-grid">
                {BANDS.map((band) => (
                  <div className="home-campaign-card" key={band.name}>
                    <span className="home-campaign-emoji" aria-hidden="true">{band.emoji}</span>
                    <span className="home-campaign-title">{band.name} · {band.threshold}</span>
                    <span className="home-campaign-desc">{band.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">06</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">What your results mean</h2>
              <p className="article-step-detail">
                Your result shows your score, your band, and your weakest area — the part of your day where screens are costing you the most. Weakest in Night &amp; Sleep means your evenings need a boundary; weakest in Apps &amp; Scrolling means your feeds need friction; weakest in Body &amp; Focus means your eyes and attention need breaks; weakest in Devices &amp; Time means your day needs device-free zones. The result is specific on purpose: one weak area is something you can actually fix.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">07</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">Practical suggestions based on results</h2>
              <p className="article-step-detail">
                Every result comes with three practical actions matched to your weakest area — small steps, not lectures. The usual advice is to pick one of them as a 7-day challenge: phone-free breaks, the 9pm screen cut-off, or the 20-20-20 rule. Try it for seven days, notice what actually changes, and keep the habits that work. The guides on this site explain each one in full.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">08</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">Retaking the quest</h2>
              <p className="article-step-detail">
                You can retake the quest any time — after a week of trying a habit, after the holidays, whenever you want a fresh look. Retaking clears your answers and starts fresh. Complete it a second time and you earn the Comeback badge. Your habits change, so your score should be allowed to change too.
              </p>
            </div>
          </section>
        </Reveal>
      </div>

      <div className="article-closing-banner article-closing-callout article-closing-box">
        <span className="article-closing-emoji" aria-hidden="true">✅</span>{' '}
        <strong className="article-closing-label">Important:</strong> the quest is an educational self-awareness tool. It is not a medical or psychological assessment, and it does not diagnose anything. This is a habits guide, not medical advice. For ongoing eye pain, headaches, or sleep problems, see a professional.
      </div>

      <div className="articles-preview-footer">
        <PillButton
          label={hasExistingAnswers ? 'Continue the Quest' : 'Start the Quest'}
          variant="primary"
          size="lg"
          arrow
          onClick={() => onNavigate('quest')}
        />
        <PillButton
          label="Healthy habits to try"
          variant="secondary"
          arrow
          onClick={() => onNavigate('habits')}
        />
      </div>
    </div>
  );
};
