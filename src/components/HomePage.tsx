import React from 'react';
import { ARTICLES } from '../data/articles';
import { PillButton } from './PillButton';
import { Sticker } from './Sticker';
import { ArticleCard } from './ArticleCard';
import { Reveal } from './Reveal';
import { NewsletterSignup } from './NewsletterSignup';
import { DotsGrid } from './DotsGrid';
import { ScreenTimeCalculator } from './ScreenTimeCalculator';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

/** The 7-day challenge — pick one. Reuses the How It Works row pattern. */
const TRY_ONE_THING = [
  {
    num: '1',
    title: 'The 9pm screen cut-off',
    desc: 'Screens off at 9pm. Notice your mornings for seven days.'
  },
  {
    num: '2',
    title: 'Phone-free breaks',
    desc: 'Leave the phone behind at every break. Move, drink water, look far away.'
  },
  {
    num: '3',
    title: 'The 20-20-20 rule',
    desc: 'Every 20 minutes, look 20 feet away for 20 seconds.'
  }
];

/** Digital wellbeing in three questions — how, when, why and how much. */
const WELLBEING_MEANS = [
  {
    emoji: '🧭',
    title: 'How you use them',
    desc: 'Active or passive, chosen or automatic. What you do on a screen matters more than how long you were on it.'
  },
  {
    emoji: '🕘',
    title: 'When you reach for them',
    desc: 'A screen at breakfast is not a screen at midnight. The same hour of use counts differently depending on what it replaces.'
  },
  {
    emoji: '⚖️',
    title: 'Why, and how much',
    desc: 'Study, rest, friends, or habit? Digital wellbeing is knowing the answer — and keeping the balance honest.'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const previewArticles = ARTICLES.filter((a) => a.id !== 'healthy-habits-student-team').slice(0, 3);

  return (
    <div className="home-page">
      {/* 1. Hero — the platform leads: understand your habits, own your
          time. The campaign is no longer the pitch. */}
      <section className="home-hero" aria-labelledby="hero-title">
        <span className="eyebrow">01 — Digital Wellbeing</span>
        <span className="home-hero-chip">Healthy habits in a digital world</span>
        <h1 id="hero-title" className="home-hero-headline">
          <span className="hero-line">Know your screen.</span>
          <span className="hero-line hero-accent">Own your time.</span>
        </h1>
        <Sticker text="Awareness, not fear" tone="navy" rotate={-3} className="hero-sticker" />
        <p className="home-hero-subline">
          An educational platform for healthier screen habits — understand
          your habits, learn what screens do, and build routines that
          actually stick.
        </p>
        <div className="home-hero-buttons">
          <PillButton
            label="Explore the Guides"
            variant="primary"
            size="lg"
            arrow
            onClick={() => onNavigate('guides')}
          />
          <PillButton
            label="Understand Screen Habits"
            variant="secondary"
            size="lg"
            onClick={() => onNavigate('understand')}
          />
        </div>

        {/* Hero proof — the campaign's own number, as a picture, not a
            slogan. 4 hours a day is 61 days a year; every square is
            one day. */}
        <div className="hero-proof">
          <p className="hero-proof-line">
            <strong>4 hours a day = 61 days a year.</strong>
          </p>
          <DotsGrid
            filled={61}
            size="sm"
            label="61 of 365 squares filled — 61 days of the year on a screen"
          />
          <p className="hero-proof-caption">Each square = 1 day of your year.</p>
        </div>
      </section>

      {/* 2. What digital wellbeing means — three questions, not a rule.
          Plain treatment: white ground, wash cards — the calm,
          explanatory section, unlike the wash panels around it. */}
      <Reveal>
        <section className="home-campaign home-campaign-plain" aria-label="What digital wellbeing means">
          <span className="eyebrow">02 — What digital wellbeing means</span>
          <p className="home-campaign-intro">
            Digital wellbeing is not using screens less. It is knowing how,
            when, why, and how much you use them — and keeping the balance
            honest. Screens are part of education, communication,
            entertainment, and everyday life. What matters is what they
            replace.
          </p>
          <div className="home-campaign-grid">
            {WELLBEING_MEANS.map((fact) => (
              <div className="home-campaign-card" key={fact.title}>
                <span className="home-campaign-emoji" aria-hidden="true">{fact.emoji}</span>
                <span className="home-campaign-title">{fact.title}</span>
                <span className="home-campaign-desc">{fact.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 3. Why screen habits matter — the six effects, each a door
          into Health & Effects. List treatment: two columns of
          horizontal rows on white ground, not another card grid. */}
      <Reveal>
        <section className="home-effects" aria-label="Why screen habits matter">
          <span className="eyebrow">03 — Why screen habits matter</span>
          <p className="home-campaign-intro">
            Screens touch sleep, eyes, focus, movement, mood, and everyday
            routines — not all at once, and not the same for everyone.
            Choose an effect to see the issue, the evidence, and what
            helps.
          </p>
          <div className="home-effects-list">
            {ARTICLES.filter((a) => a.kind === 'topic').map((topic) => (
              <a
                key={topic.id}
                href={`#health/${topic.slug}`}
                className="home-effect-row"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`health/${topic.slug}`);
                }}
                aria-label={`${topic.title} — read the topic`}
              >
                <span className="home-campaign-emoji" aria-hidden="true">{topic.emoji}</span>
                <span className="home-effect-body">
                  <span className="home-campaign-title">{topic.title}</span>
                  <span className="home-campaign-desc">{topic.summary}</span>
                </span>
                <span className="home-effect-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </section>
      </Reveal>

      {/* The maths — one interactive piece: how many days is your
          screen time? The dots grid answers as the slider moves. */}
      <Reveal>
        <section className="calculator-section" aria-labelledby="calculator-title">
          <span className="eyebrow">The maths — check your own screen time</span>
          <h2 id="calculator-title" className="section-headline">
            How many days is your screen time?
          </h2>
          <p className="home-campaign-intro calculator-intro">
            Move the slider to your usual day. The grid fills in — one
            square for every full day of the year your screens take.
          </p>
          <ScreenTimeCalculator />
        </section>
      </Reveal>

      {/* 4. Guides preview — the hub, thirteen pieces. The first three
          non-team pieces show here; the rest live on the hub. */}
      <Reveal>
        <section className="articles-preview-section" aria-labelledby="articles-preview-title">
          <span className="eyebrow">04 — Guides</span>
          <h2 id="articles-preview-title" className="section-headline">
            <span className="section-emoji" aria-hidden="true">📚</span> Guides &amp; Resources
          </h2>
          <div className="articles-preview-grid">
            {previewArticles.map((art) => (
              <ArticleCard key={art.id} article={art} onNavigate={onNavigate} variant="preview" />
            ))}
          </div>
          <div className="articles-preview-footer">
            <PillButton
              label="View All 13 Articles"
              variant="secondary"
              arrow
              onClick={() => onNavigate('guides')}
            />
          </div>
        </section>
      </Reveal>

      {/* Newsletter — utility band, no eyebrow number. */}
      <Reveal>
        <NewsletterSignup />
      </Reveal>

      {/* 5. Healthier habits — the 7-day challenge, three choices. */}
      <Reveal>
        <section className="how-it-works-section" aria-labelledby="try-one-thing-title">
          <span className="eyebrow">05 — Healthier habits</span>
          <h2 id="try-one-thing-title" className="section-headline">
            <span className="section-emoji" aria-hidden="true">🎯</span> Try one thing this week
          </h2>
          <div className="how-steps-list">
            {TRY_ONE_THING.map((step) => (
              <div className="how-step-row" key={step.num}>
                <span className="how-step-num" aria-hidden="true">{step.num.padStart(2, '0')}</span>
                <div className="how-step-body">
                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="articles-preview-footer">
            <PillButton
              label="See all healthy habits"
              variant="secondary"
              arrow
              onClick={() => onNavigate('habits')}
            />
          </div>
        </section>
      </Reveal>

      {/* 7. Research teaser — what the experts actually say. The one
          dark band on the home page (besides nav + footer), so this
          section reads as the evidence anchor, not another wash panel. */}
      <Reveal>
        <section className="home-research-band" aria-label="Research and expert insights">
          <span className="eyebrow">06 — Research &amp; expert insights</span>
          <p className="home-campaign-intro">
            The World Health Organization sets no single screen-time limit
            for school-age children. The American Academy of Pediatrics
            recommends a family media plan instead of counting hours. And
            screens before bed delay sleep — blue light limits melatonin.
            Every claim on this site names its source.
          </p>
          <div className="articles-preview-footer">
            <PillButton
              label="Research & Expert Insights"
              variant="secondary"
              arrow
              onClick={() => onNavigate('research')}
            />
          </div>
        </section>
      </Reveal>

      {/* 8. Our awareness initiative — the campaign, kept small: the
          origin and real-world application, not the identity. Split
          treatment: words on the left, the campaign poster on the
          right. */}
      <Reveal>
        <section className="home-initiative" aria-label="Our awareness initiative">
          <div className="home-initiative-text">
            <span className="eyebrow">07 — Our awareness initiative</span>
            <p className="home-campaign-intro">
              YourScreenHabits began as a student campaign at Pak Turk Maarif
              Chak Shahzad Campus in Islamabad, for British Council Your
              World 2026–27. A team of four students, testing their own
              habits first and sharing what actually worked — in class
              groups, on notice boards, and on this website.
            </p>
            <div className="articles-preview-footer home-initiative-cta">
              <PillButton
                label="About Us"
                variant="secondary"
                arrow
                onClick={() => onNavigate('about')}
              />
            </div>
          </div>
          <div className="home-initiative-media">
            <img
              src="/unzip-poster.jpg"
              alt="Unzip your screen — the campaign poster: a phone unzipped to reveal friends, football and the moon"
              width={800}
              height={1147}
              loading="lazy"
            />
          </div>
        </section>
      </Reveal>
    </div>
  );
};
