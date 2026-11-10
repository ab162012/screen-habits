import React from 'react';
import { Button } from '@astryxdesign/core/Button';
import { ARTICLES } from '../data/articles';
import { QUESTIONS, PART_NAMES } from '../questions';

interface HomePageProps {
  onNavigate: (route: string) => void;
  hasExistingAnswers: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, hasExistingAnswers }) => {
  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <div className="home-page">
      {/* 1. Hero: clean white centred stack (onboarding-screenshot language) */}
      <section className="home-hero" aria-labelledby="hero-title">
        <span className="t26-kicker">01 — Student Quest · Screen Habits</span>
        <div className="home-hero-slogan-chip" style={{ marginBottom: '12px' }}>
          <span className="chip-badge chip-slogan home-hero-slogan hero-slogan" style={{ fontSize: '13px' }}>
            10 questions · No sign-up · 7-day challenge
          </span>
        </div>
        <h1 id="hero-title" className="home-hero-headline">
          Know your screen.<br /><span className="hero-accent">Own your time.</span>
        </h1>
        <p className="home-hero-subline" style={{ fontSize: '17px', color: 'var(--text-slate-600)', maxWidth: '560px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          A 10-question check for students. Know your habit, pick one 7-day challenge.
        </p>
        <div className="home-hero-buttons">
          <Button
            label={hasExistingAnswers ? 'Continue the Quest' : 'Start the Quest'}
            variant="primary"
            size="lg"
            className="home-hero-cta"
            onClick={() => onNavigate('quest')}
          />
          <Button
            label="Read Articles"
            variant="secondary"
            size="lg"
            className="home-hero-cta"
            onClick={() => onNavigate('articles')}
          />
        </div>
        <span className="t26-sticker">Honest check · No fake scores</span>
      </section>

      {/* Statistics: big bold numerals, no boxes */}
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

      {/* Honest rules: the scoring rules, as a static row of pills. */}
      <section className="honest-rules-strip" aria-label="How the score works">
        <span className="honest-rule">10 XP per answered question</span>
        <span className="honest-rule">Skip = 0 XP</span>
        <span className="honest-rule">Score over answered only</span>
        <span className="honest-rule">Under 5 = Partial result</span>
      </section>

      {/* Your path: the 10-node winding path, 4 parts. Tap any node to start the quest. */}
      <section className="how-it-works-section path-home-section" aria-labelledby="path-title">
        <span className="t26-kicker">02 — Your Path</span>
        <h2 id="path-title" className="section-headline">
          Your Path
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-slate-600)', margin: '0 0 20px', textAlign: 'center' }}>
          10 questions in 4 parts — answer them in order, earn 10 XP per answered question.
        </p>
        <div className="parts-stepper" role="list" aria-label="The four parts of the quest">
          {PART_NAMES.map((part) => {
            const count = QUESTIONS.filter((q) => q.partIndex === part.index).length;
            return (
              <button
                key={part.index}
                type="button"
                className="parts-step"
                role="listitem"
                onClick={() => onNavigate('quest')}
              >
                <span className="parts-step-icon-wrap">
                  <span className="icon-tile" aria-hidden="true">{part.emoji}</span>
                  <span className="parts-step-num" aria-hidden="true">{part.index + 1}</span>
                </span>
                <span className="parts-step-title">{part.title}</span>
                <span className="parts-step-count">{count} questions</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. How it works, in 3 steps only: 1. Answer 10 questions. 2. Get your result. 3. Pick one 7-day challenge. */}
      <section id="how-it-works" className="how-it-works-section" aria-labelledby="how-it-works-title">
        <span className="t26-kicker">03 — How It Works</span>
        <h2 id="how-it-works-title" className="section-headline">
          How It Works
        </h2>
        <div className="how-steps-grid">
          <div className="step-card">
            <div className="step-card-top">
              <div className="step-num-badge">1</div>
              <span className="icon-tile" aria-hidden="true">📱</span>
            </div>
            <h3 className="step-card-title">1. Answer 10 questions</h3>
            <p className="step-card-desc">
              Move through Devices & Time, Apps & Scrolling, Night & Sleep, and Body & Focus in 10 quick screens.
            </p>
          </div>
          <div className="step-card">
            <div className="step-card-top">
              <div className="step-num-badge">2</div>
              <span className="icon-tile" aria-hidden="true">🏆</span>
            </div>
            <h3 className="step-card-title">2. Get your result</h3>
            <p className="step-card-desc">
              Receive your personal balance score, honest habit band in words, and top 3 practical actions.
            </p>
          </div>
          <div className="step-card">
            <div className="step-card-top">
              <div className="step-num-badge">3</div>
              <span className="icon-tile" aria-hidden="true">✅</span>
            </div>
            <h3 className="step-card-title">3. Pick one 7-day challenge</h3>
            <p className="step-card-desc">
              Choose between phone-free breaks or a 9pm cut-off to test and film with your student team.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Articles teaser: 3 article cards, each linking to a real article page */}
      <section className="how-it-works-section" aria-labelledby="articles-preview-title">
        <span className="t26-kicker">04 — Guides</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="icon-tile icon-tile-lg" aria-hidden="true">📚</span>
          <h2 id="articles-preview-title" className="section-headline">
            Articles & Habit Guides
          </h2>
        </div>
        <div className="articles-preview-grid">
          {previewArticles.map((art) => (
            <a
              key={art.id}
              href={`#article/${art.id}`}
              className="article-preview-card"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`article/${art.id}`);
              }}
            >
              <div>
                <span className="article-card-topic">{art.topicTag}</span>
                <h3 className="article-card-title">{art.title}</h3>
                <p className="article-card-summary">{art.summary}</p>
              </div>
              <span className="article-read-link">Read Guide →</span>
            </a>
          ))}
        </div>
        <div className="articles-preview-footer">
          <Button
            label="View All 6 Articles →"
            variant="secondary"
            onClick={() => onNavigate('articles')}
          />
        </div>
      </section>

      {/* Video Project Context Band */}
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
          <li>Team & school eligibility: Verified and registered directly by your school mentor.</li>
        </ul>
      </section>
    </div>
  );
};
