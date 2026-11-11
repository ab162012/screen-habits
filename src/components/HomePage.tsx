import React from 'react';
import { ARTICLES } from '../data/articles';
import { PillButton } from './PillButton';
import { Sticker } from './Sticker';
import { PathMap } from './PathMap';
import { ArticleCard } from './ArticleCard';
import { Reveal } from './Reveal';

interface HomePageProps {
  onNavigate: (route: string) => void;
  hasExistingAnswers: boolean;
}

const HONEST_RULES = [
  '10 XP per answered question',
  'Skip = 0 XP',
  'Score over answered only',
  'Under 5 = Partial result'
];

/** Emoji system: one fixed emoji per honest rule, used in the
    "How scoring works" band — same rule, same emoji, everywhere. */
const HONEST_RULE_EMOJIS = ['⭐', '⏭️', '📊', '🧩'];

const HOW_STEPS = [
  {
    num: '1',
    title: '1. Answer 10 questions',
    desc: 'Move through Devices & Time, Apps & Scrolling, Night & Sleep, and Body & Focus in 10 quick screens.'
  },
  {
    num: '2',
    title: '2. Get your result',
    desc: 'Receive your personal balance score, honest habit band in words, and top 3 practical actions.'
  },
  {
    num: '3',
    title: '3. Pick one 7-day challenge',
    desc: 'Choose between phone-free breaks or a 9pm cut-off to test and film with your student team.'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, hasExistingAnswers }) => {
  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <div className="home-page">
      {/* 1. Hero */}
      <section className="home-hero" aria-labelledby="hero-title">
        <span className="eyebrow">01 — Student Quest · Screen Habits</span>
        <span className="home-hero-chip">10 questions · No sign-up · 7-day challenge</span>
        <h1 id="hero-title" className="home-hero-headline">
          <span className="hero-line">Know your screen.</span>
          <span className="hero-line hero-accent">Own your time.</span>
        </h1>
        <Sticker text="Honest check · No fake scores" tone="navy" rotate={-3} className="hero-sticker" />
        <p className="home-hero-subline">
          A 10-question check for students. Know your habit, pick one 7-day challenge.
        </p>
        <div className="home-hero-buttons">
          <PillButton
            label={hasExistingAnswers ? 'Continue the Quest' : 'Start the Quest'}
            variant="primary"
            size="lg"
            arrow
            onClick={() => onNavigate('quest')}
          />
          <PillButton
            label="Read Articles"
            variant="secondary"
            size="lg"
            onClick={() => onNavigate('articles')}
          />
        </div>
      </section>

      {/* 2. Stats — the quest in numbers, once (contained wash panel). */}
      <Reveal>
        <section className="home-stats" aria-label="The quest in numbers">
          <div className="home-stat">
            <span className="home-stat-num">10</span>
            <span className="home-stat-label"><span className="home-stat-emoji" aria-hidden="true">❓</span> Questions</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">7</span>
            <span className="home-stat-label"><span className="home-stat-emoji" aria-hidden="true">📅</span> Day challenge</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">4</span>
            <span className="home-stat-label"><span className="home-stat-emoji" aria-hidden="true">🧩</span> Parts</span>
          </div>
        </section>
      </Reveal>

      {/* 3. How scoring works — navy band, KEPT per the owner's word
          (the map cut it; the owner praised this section and the footer).
          Form is a contained panel, not a full-bleed escape. */}
      <Reveal>
        <section className="honest-rules-band" aria-label="How the score works">
          <div className="honest-rules-inner">
            <span className="eyebrow honest-rules-eyebrow"><span className="eyebrow-emoji" aria-hidden="true">📊</span> How scoring works</span>
            <ol className="honest-rules-list">
              {HONEST_RULES.map((rule, i) => (
                <li key={rule} className="honest-rule-item">
                  <span className="honest-rule-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="honest-rule-text"><span className="honest-rule-emoji" aria-hidden="true">{HONEST_RULE_EMOJIS[i]}</span> {rule}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* 4. Your Path — winding path */}
      <Reveal>
        <section className="path-home-section" aria-labelledby="path-title">
          <span className="eyebrow">02 — Your Path</span>
          <h2 id="path-title" className="section-headline">
            <span className="section-emoji" aria-hidden="true">🗺️</span> Your Path
          </h2>
          <p className="section-intro">
            10 questions in 4 parts — answer them in order, earn 10 XP per answered question.
          </p>
          <PathMap
            variant="full"
            preview
            currentStep={0}
            answers={{}}
            onSelect={() => onNavigate('quest')}
          />
        </section>
      </Reveal>

      {/* 5. How It Works — 3 equal rows, no stagger, no ghost numerals,
          no arrow discs, no buried CTA. */}
      <Reveal>
        <section id="how-it-works" className="how-it-works-section" aria-labelledby="how-it-works-title">
          <span className="eyebrow">03 — How It Works</span>
          <h2 id="how-it-works-title" className="section-headline">
            <span className="section-emoji" aria-hidden="true">⚙️</span> How It Works
          </h2>
          <div className="how-steps-list">
            {HOW_STEPS.map((step) => (
              <div className="how-step-row" key={step.num}>
                <span className="how-step-num" aria-hidden="true">{step.num.padStart(2, '0')}</span>
                <div className="how-step-body">
                  <h3 className="step-card-title">{step.title.replace(/^\d+\.\s*/, '')}</h3>
                  <p className="step-card-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 6. Articles preview — 3 equal guides, no featured card. */}
      <Reveal>
        <section className="articles-preview-section" aria-labelledby="articles-preview-title">
          <span className="eyebrow">04 — Guides</span>
          <h2 id="articles-preview-title" className="section-headline">
            <span className="section-emoji" aria-hidden="true">📚</span> Articles &amp; Habit Guides
          </h2>
          <div className="articles-preview-grid">
            {previewArticles.map((art) => (
              <ArticleCard key={art.id} article={art} onNavigate={onNavigate} variant="preview" />
            ))}
          </div>
          <div className="articles-preview-footer">
            <PillButton
              label="View All 6 Articles"
              variant="secondary"
              arrow
              onClick={() => onNavigate('articles')}
            />
          </div>
        </section>
      </Reveal>

      {/* 7. Video project band — contained navy panel, no CTA. */}
      <Reveal>
        <section className="video-note-band" aria-labelledby="video-note-title">
          <h2 id="video-note-title" className="video-note-title">
            <span className="section-emoji" aria-hidden="true">🎬</span> British Council Your World Video Project
          </h2>
          <p className="video-note-text">
            This site provides the diagnostic foundation and 7-day habit trial for student teams creating a video for the theme <strong>Healthy habits in a digital world</strong>.
          </p>
          <ul className="video-note-bullets">
            <li>Video format: Live-action only (real students, a real place, the real seven days).</li>
            <li>Duration: Maximum 3 minutes in length.</li>
            <li>Team size: Created by a team of 3 to 5 students.</li>
            <li>Team &amp; school eligibility: Verified and registered directly by your school mentor.</li>
          </ul>
        </section>
      </Reveal>
    </div>
  );
};
