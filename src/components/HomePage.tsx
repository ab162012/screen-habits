import React from 'react';
import { ARTICLES } from '../data/articles';
import { PillButton } from './PillButton';
import { Sticker } from './Sticker';
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

/** Three steps, one line each — no paragraphs. */
const HOW_STEPS = [
  {
    num: '1',
    title: 'Answer 10 questions',
    desc: '10 questions in 4 parts.'
  },
  {
    num: '2',
    title: 'Get your result',
    desc: 'Your score, your band, and 3 actions.'
  },
  {
    num: '3',
    title: 'Pick one 7-day challenge',
    desc: 'Phone-free breaks or a 9pm cut-off.'
  }
];

/** Campaign facts, not quest numbers — the campaign carries the same
    weight as the quest. One line each. */
const CAMPAIGN_FACTS = [
  {
    emoji: '🌍',
    title: 'British Council Your World',
    desc: '2026–27 · Healthy habits in a digital world.'
  },
  {
    emoji: '🎓',
    title: 'Student team · Islamabad',
    desc: 'Four students, one campaign.'
  },
  {
    emoji: '🏫',
    title: 'For classes Grade 4 – IG1',
    desc: 'Awareness + quest, in class groups.'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, hasExistingAnswers }) => {
  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <div className="home-page">
      {/* 1. Hero — the campaign message leads, not the quest. The quest
          is one secondary button, not the pitch. */}
      <section className="home-hero" aria-labelledby="hero-title">
        <span className="eyebrow">01 — Student Campaign · Screen Habits</span>
        <span className="home-hero-chip">Healthy habits in a digital world</span>
        <h1 id="hero-title" className="home-hero-headline">
          <span className="hero-line">Know your screen.</span>
          <span className="hero-line hero-accent">Own your time.</span>
        </h1>
        <Sticker text="Honest check · No fake scores" tone="navy" rotate={-3} className="hero-sticker" />
        <p className="home-hero-subline">
          A student campaign about healthier screen habits.
        </p>
        <div className="home-hero-buttons">
          <PillButton
            label="Read the Guides"
            variant="primary"
            size="lg"
            arrow
            onClick={() => onNavigate('articles')}
          />
          <PillButton
            label={hasExistingAnswers ? 'Continue the Quest' : 'Take the Quest'}
            variant="secondary"
            size="lg"
            onClick={() => onNavigate('quest')}
          />
        </div>
      </section>

      {/* 2. Campaign — who this is and who it is for, in three capsules. */}
      <Reveal>
        <section className="home-campaign" aria-label="About the campaign">
          {CAMPAIGN_FACTS.map((fact) => (
            <div className="home-campaign-card" key={fact.title}>
              <span className="home-campaign-emoji" aria-hidden="true">{fact.emoji}</span>
              <span className="home-campaign-title">{fact.title}</span>
              <span className="home-campaign-desc">{fact.desc}</span>
            </div>
          ))}
        </section>
      </Reveal>

      {/* 3. Articles preview — the guides carry equal weight with the
          quest, so they come before it. */}
      <Reveal>
        <section className="articles-preview-section" aria-labelledby="articles-preview-title">
          <span className="eyebrow">02 — Guides</span>
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

      {/* 4. How It Works — 3 equal capsule cards in a grid. */}
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
                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 5. How scoring works — the honesty proof, kept but last: the
          quest no longer opens the page. */}
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
    </div>
  );
};
