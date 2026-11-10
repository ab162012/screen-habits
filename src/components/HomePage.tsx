import React from 'react';
import { ARTICLES } from '../data/articles';
import { PillButton } from './PillButton';
import { Sticker } from './Sticker';
import { Marquee } from './Marquee';
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

const MARQUEE_ITEMS = [
  'KNOW YOUR SCREEN',
  'OWN YOUR TIME',
  '10 QUESTIONS',
  'NO SIGN-UP',
  '7-DAY CHALLENGE',
  'HONEST CHECK — NO FAKE SCORES'
];

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
      {/* 3.1 Hero */}
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

      {/* 3.2 Marquee */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* 3.3 About / statement */}
      <Reveal>
        <section className="home-about" aria-label="About the quest">
          <span className="eyebrow eyebrow-centre">About the Quest</span>
          <p className="home-about-statement">
            A 10-question check for students. Know your habit, pick one 7-day challenge.
          </p>
          <div className="home-about-stickers" aria-hidden="true">
            <Sticker text={HONEST_RULES[0]} tone="navy" rotate={-3} />
            <Sticker text={HONEST_RULES[1]} tone="blue" rotate={2} />
            <Sticker text={HONEST_RULES[2]} tone="light" rotate={-3} />
          </div>
        </section>
      </Reveal>

      {/* 3.4 Stats */}
      <Reveal>
        <section className="home-stats" aria-label="The quest in numbers">
          <div className="home-stat">
            <span className="home-stat-num">10</span>
            <span className="home-stat-label">Questions</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">7</span>
            <span className="home-stat-label">Day challenge</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">4</span>
            <span className="home-stat-label">Parts</span>
          </div>
        </section>
      </Reveal>

      {/* 3.5 Honest rules strip */}
      <Reveal>
        <section className="honest-rules-strip" aria-label="How the score works">
          {HONEST_RULES.map((rule, i) => (
            <Sticker
              key={rule}
              text={rule}
              tone={i % 3 === 0 ? 'navy' : i % 3 === 1 ? 'blue' : 'light'}
              rotate={i % 2 === 0 ? -3 : 2}
            />
          ))}
        </section>
      </Reveal>

      {/* 3.6 Your Path — winding path */}
      <Reveal>
        <section className="path-home-section" aria-labelledby="path-title">
          <span className="eyebrow">02 — Your Path</span>
          <h2 id="path-title" className="section-headline">
            Your Path
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

      {/* 3.7 How It Works */}
      <Reveal>
        <section id="how-it-works" className="how-it-works-section" aria-labelledby="how-it-works-title">
          <span className="eyebrow">03 — How It Works</span>
          <h2 id="how-it-works-title" className="section-headline">
            How It Works
          </h2>
          <div className="how-steps-grid">
            {HOW_STEPS.map((step, i) => (
              <div className="step-card" key={step.num}>
                <span className="step-num-badge" aria-hidden="true">{step.num}</span>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.desc}</p>
                {i < HOW_STEPS.length - 1 ? (
                  <span className="step-arrow" aria-hidden="true">→</span>
                ) : (
                  <span className="step-arrow step-arrow-cta" aria-hidden="true">
                    <PillButton label="Start the Quest" variant="primary" arrow onClick={() => onNavigate('quest')} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 3.8 Articles preview */}
      <Reveal>
        <section className="articles-preview-section" aria-labelledby="articles-preview-title">
          <span className="eyebrow">04 — Guides</span>
          <h2 id="articles-preview-title" className="section-headline">
            Articles &amp; Habit Guides
          </h2>
          <div className="articles-preview-grid">
            {previewArticles.map((art) => (
              <ArticleCard key={art.id} article={art} onNavigate={onNavigate} variant="preview" />
            ))}
          </div>
          <div className="articles-preview-footer">
            <PillButton
              label="View All 6 Articles →"
              variant="secondary"
              arrow
              onClick={() => onNavigate('articles')}
            />
          </div>
        </section>
      </Reveal>

      {/* 3.9 Video project band */}
      <Reveal>
        <section className="video-note-band" aria-labelledby="video-note-title">
          <h3 id="video-note-title" className="video-note-title">
            British Council Your World Video Project
          </h3>
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
