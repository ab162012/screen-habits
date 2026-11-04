import React from 'react';
import { ARTICLES } from '../data/articles';

interface HomePageProps {
  onNavigate: (route: string) => void;
  hasExistingAnswers: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, hasExistingAnswers }) => {
  const previewArticles = ARTICLES.slice(0, 3);

  // SVG Sample Ring calculations
  const sampleRadius = 48;
  const sampleCircumference = 2 * Math.PI * sampleRadius;
  const sampleScore = 84;
  const sampleOffset = sampleCircumference - (sampleScore / 100) * sampleCircumference;

  return (
    <div className="home-page">
      {/* 1. Hero: slogan in large navy Manrope, 📱 hero visual (64-80px), one clear button: Start the Quest */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="hero-emoji-icon" aria-hidden="true" style={{ fontSize: '72px', lineHeight: 1, marginBottom: '16px' }}>
          📱
        </div>
        <div className="home-hero-slogan-chip" style={{ marginBottom: '12px' }}>
          <span className="chip-badge chip-slogan home-hero-slogan hero-slogan" style={{ fontSize: '13px' }}>
            10 questions · No sign-up · 7-day challenge
          </span>
        </div>
        <h1 id="hero-title" className="home-hero-headline" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.15, marginBottom: '16px' }}>
          Know your screen. Own your time.
        </h1>
        <p className="home-hero-subline" style={{ fontSize: '17px', color: 'var(--text-slate-600)', maxWidth: '560px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          A 10-question check for students. Know your habit, pick one 7-day challenge.
        </p>
        <div className="home-hero-buttons">
          <button
            type="button"
            className="btn-primary"
            style={{ minHeight: '52px', padding: '14px 32px', fontSize: '16px' }}
            onClick={() => onNavigate('quest')}
          >
            {hasExistingAnswers ? 'Continue the Quest' : 'Start the Quest'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ minHeight: '52px', padding: '14px 32px', fontSize: '16px' }}
            onClick={() => onNavigate('articles')}
          >
            Read Articles
          </button>
        </div>
        <div className="home-hero-banner-row" aria-hidden="true">
          <span className="emoji-medallion">📱</span>
          <span className="emoji-medallion">📲</span>
          <span className="emoji-medallion">🌙</span>
          <span className="emoji-medallion">🎯</span>
        </div>
      </section>

      {/* 2. How it works, in 3 steps only: 1. Answer 10 questions. 2. Get your result. 3. Pick one 7-day challenge. */}
      <section id="how-it-works" className="how-it-works-section" aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title" className="section-headline">
          How It Works
        </h2>
        <div className="how-steps-grid">
          <div className="step-card">
            <div className="step-card-top">
              <div className="step-num-badge">1</div>
              <span className="emoji-medallion" style={{ width: '44px', height: '44px', fontSize: '1.25rem' }} aria-hidden="true">📱</span>
            </div>
            <h3 className="step-card-title">1. Answer 10 questions</h3>
            <p className="step-card-desc">
              Move through Devices & Time, Apps & Scrolling, Night & Sleep, and Body & Focus in 10 quick screens.
            </p>
          </div>
          <div className="step-card">
            <div className="step-card-top">
              <div className="step-num-badge">2</div>
              <span className="emoji-medallion" style={{ width: '44px', height: '44px', fontSize: '1.25rem' }} aria-hidden="true">🏆</span>
            </div>
            <h3 className="step-card-title">2. Get your result</h3>
            <p className="step-card-desc">
              Receive your personal balance score, honest habit band in words, and top 3 practical actions.
            </p>
          </div>
          <div className="step-card">
            <div className="step-card-top">
              <div className="step-num-badge">3</div>
              <span className="emoji-medallion" style={{ width: '44px', height: '44px', fontSize: '1.25rem' }} aria-hidden="true">✅</span>
            </div>
            <h3 className="step-card-title">3. Pick one 7-day challenge</h3>
            <p className="step-card-desc">
              Choose between phone-free breaks or a 9pm cut-off to test and film with your student team.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Result preview: sample score ring & sample band in words, clearly labelled as a preview, not a real result */}
      <section className="how-it-works-section" aria-labelledby="preview-title">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <h2 id="preview-title" className="section-headline">
            Result Preview
          </h2>
          <span className="chip-badge" style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-blue-100)', color: 'var(--blue)', fontSize: '12px' }}>
            Preview Only • Not a Real Result
          </span>
        </div>
        <div className="result-card" style={{ padding: '28px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Sample Ring */}
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} aria-label="Sample Score Ring: 84 of 100">
                <circle
                  cx="60"
                  cy="60"
                  r={sampleRadius}
                  style={{ fill: 'none', stroke: 'var(--bg-subtle)', strokeWidth: '8px' }}
                />
                <circle
                  cx="60"
                  cy="60"
                  r={sampleRadius}
                  style={{
                    fill: 'none',
                    stroke: 'var(--blue)',
                    strokeWidth: '8px',
                    strokeLinecap: 'round',
                    strokeDasharray: sampleCircumference,
                    strokeDashoffset: sampleOffset
                  }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--navy)', lineHeight: 1 }}>{sampleScore}</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-slate-400)', marginTop: '2px' }}>out of 100</span>
              </div>
            </div>

            {/* Sample Band Details */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '380px' }}>
              <span className="band-pill" style={{ alignSelf: 'flex-start' }}>
                <span className="band-pill-emoji" aria-hidden="true">🏆</span>
                Thriving Band (Sample)
              </span>
              <p style={{ fontSize: '15px', color: 'var(--navy)', fontWeight: 500, lineHeight: 1.45, marginTop: '4px' }}>
                Sample diagnostic preview showing clear placement into Thriving, Balanced, Strained, or Overloaded.
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-slate-600)' }}>
                Your actual score is calculated only from your answered questions when you take the Quest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Articles teaser: 3 article cards, each linking to a real article page */}
      <section className="how-it-works-section" aria-labelledby="articles-preview-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '40px', lineHeight: 1 }} aria-hidden="true">📚</span>
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
          <a
            href="#articles"
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('articles');
            }}
          >
            View All 6 Articles →
          </a>
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
