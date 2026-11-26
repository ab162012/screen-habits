import React from 'react';
import { ARTICLES } from '../data/articles';
import type { ArticleCategory } from '../types';
import { PillButton } from './PillButton';
import { ArticleCard } from './ArticleCard';
import { Reveal } from './Reveal';
import { NewsletterSignup } from './NewsletterSignup';
import { DotsGrid } from './DotsGrid';
import { ScreenTimeCalculator } from './ScreenTimeCalculator';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

/** The 7-day challenge — pick one. */
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

/** Browse chips for the guides showcase — the hub's own category
    order, counts computed from the 13 articles (7 guides + 6 topics). */
const CATEGORY_ORDER: ArticleCategory[] = [
  'Sleep',
  'Routines',
  'Eyes',
  'Focus',
  'Body',
  'Mind',
  'Expert',
  'Team'
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featured = ARTICLES.find((a) => a.id === 'what-the-experts-say');
  const rest = ARTICLES.filter((a) => a.id !== 'what-the-experts-say');
  const topics = ARTICLES.filter((a) => a.kind === 'topic');

  return (
    <div className="home-page">
      {/* 1. Hero — a real banner: a wash band, split in two. Left, the
          pitch (headline, slogan, subline, actions, belief). Right,
          the proof — the dots grid as a card, not a footnote. */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero-copy">
          <span className="home-hero-chip">Healthy habits in a digital world</span>
          <h1 id="hero-title" className="home-hero-headline">
            <span className="hero-line">Know your screen.</span>
            <span className="hero-line hero-accent">Own your time.</span>
          </h1>
          <p className="home-hero-slogan3">Be aware of its effects.</p>
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
          <p className="home-hero-belief">
            We don&apos;t ban the phone. We make the phone the scoreboard.
          </p>
        </div>

        {/* Hero proof — the campaign's own number, as a picture, not a
            slogan. 4 hours a day is 61 days a year; every square is
            one day. */}
        <div className="home-hero-proof">
          <p className="home-hero-proof-line">
            <strong>4 hours a day = 61 days a year.</strong>
          </p>
          <DotsGrid
            filled={61}
            size="sm"
            label="61 of 365 squares filled — 61 days of the year on a screen"
          />
          <p className="home-hero-proof-caption">Each square = 1 day of your year.</p>
        </div>
      </section>

      {/* 2. What digital wellbeing means — three questions, not a rule.
          Numbered editorial rows on white ground: no cards, no wash. */}
      <Reveal>
        <section className="home2-section" aria-labelledby="wellbeing-title">
          <header className="home2-head">
            <span className="eyebrow eyebrow-left">01 — Digital wellbeing</span>
            <h2 id="wellbeing-title" className="section-headline section-headline-left">
              What digital wellbeing means
            </h2>
            <p className="home2-intro">
              Digital wellbeing is not using screens less. It is knowing how,
              when, why, and how much you use them — and keeping the balance
              honest. Screens are part of education, communication,
              entertainment, and everyday life. What matters is what they
              replace.
            </p>
          </header>
          <div className="home2-qa-list">
            {WELLBEING_MEANS.map((fact, i) => (
              <div className="home2-qa-row" key={fact.title}>
                <span className="home2-qa-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="home2-qa-emoji" aria-hidden="true">{fact.emoji}</span>
                <div className="home2-qa-body">
                  <h3 className="home2-qa-title">{fact.title}</h3>
                  <p className="home2-qa-desc">{fact.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 3. Why screen habits matter — the six effects, each a door
          into Health & Effects. A 3 × 2 tile grid: white tiles with a
          border, not another wash panel. */}
      <Reveal>
        <section className="home2-section" aria-labelledby="effects-title">
          <header className="home2-head">
            <span className="eyebrow eyebrow-left">02 — Health &amp; effects</span>
            <h2 id="effects-title" className="section-headline section-headline-left">
              Why screen habits matter
            </h2>
            <p className="home2-intro">
              Screens touch sleep, eyes, focus, movement, mood, and everyday
              routines — not all at once, and not the same for everyone.
              Choose an effect to see the issue, the evidence, and what
              helps.
            </p>
          </header>
          <div className="home2-topics">
            {topics.map((topic) => (
              <a
                key={topic.id}
                href={`#health/${topic.slug}`}
                className="home2-topic"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`health/${topic.slug}`);
                }}
                aria-label={`${topic.title} — read the topic`}
              >
                <span className="home2-topic-emoji" aria-hidden="true">{topic.emoji}</span>
                <span className="home2-topic-body">
                  <span className="home2-topic-title">{topic.title}</span>
                  <span className="home2-topic-desc">{topic.summary}</span>
                </span>
                <span className="home2-topic-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 4. The maths — one interactive piece: how many days is your
          screen time? The calculator card is a split now — controls
          and result on the left, the dots grid on the right. */}
      <Reveal>
        <section className="calculator-section" aria-labelledby="calculator-title">
          <header className="home2-head">
            <span className="eyebrow eyebrow-left">03 — The maths</span>
            <h2 id="calculator-title" className="section-headline section-headline-left">
              How many days is your screen time?
            </h2>
            <p className="home2-intro">
              Move the slider to your usual day. The grid fills in — one
              square for every full day of the year your screens take.
            </p>
          </header>
          <ScreenTimeCalculator />
        </section>
      </Reveal>

      {/* 5. Guides & Resources — the showcase, not a preview. The
          featured experts guide full-width on top, then all twelve
          remaining pieces in the grid. Every one of the 13 articles
          is on this page. */}
      <Reveal>
        <section className="home2-section home2-showcase" aria-labelledby="guides-title">
          <header className="home2-head">
            <span className="eyebrow eyebrow-left">04 — Guides &amp; resources</span>
            <h2 id="guides-title" className="section-headline section-headline-left">
              <span className="section-emoji" aria-hidden="true">📚</span> Guides &amp; Resources
            </h2>
            <p className="home2-intro">
              Thirteen pieces — seven guides and six health topics. Start
              with one habit.
            </p>
          </header>
          <div className="home2-cats" aria-label="Browse the guides by topic">
            {CATEGORY_ORDER.map((cat) => {
              const count = ARTICLES.filter((a) => a.category === cat).length;
              return (
                <a
                  key={cat}
                  href="#guides"
                  className="home2-cat"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guides');
                  }}
                  aria-label={`${cat} — ${count} ${count === 1 ? 'piece' : 'pieces'}, browse the guides`}
                >
                  {cat} <span className="home2-cat-count">{count}</span>
                </a>
              );
            })}
          </div>
          {featured && (
            <div className="home2-featured">
              <ArticleCard article={featured} onNavigate={onNavigate} variant="preview" featured />
            </div>
          )}
          <div className="home2-grid">
            {rest.map((art) => (
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

      {/* 6. Healthier habits — the 7-day challenge, three choices.
          Wash cards with a number and an ocean top rule. */}
      <Reveal>
        <section className="home2-section" aria-labelledby="try-one-thing-title">
          <header className="home2-head">
            <span className="eyebrow eyebrow-left">05 — Healthier habits</span>
            <h2 id="try-one-thing-title" className="section-headline section-headline-left">
              <span className="section-emoji" aria-hidden="true">🎯</span> Try one thing this week
            </h2>
          </header>
          <div className="home2-steps">
            {TRY_ONE_THING.map((step) => (
              <div className="home2-step" key={step.num}>
                <span className="home2-step-num" aria-hidden="true">{step.num.padStart(2, '0')}</span>
                <h3 className="home2-step-title">{step.title}</h3>
                <p className="home2-step-desc">{step.desc}</p>
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
          origin and real-world application, not the identity. Split:
          words on the left, the campaign poster as type on the right —
          the poster's own headline and subline, no image file. */}
      <Reveal>
        <section className="home2-initiative" aria-label="Our awareness initiative">
          <div className="home2-initiative-text">
            <span className="eyebrow eyebrow-left">07 — Our awareness initiative</span>
            <p className="home2-intro">
              YourScreenHabits began as a student campaign at Pak Turk Maarif
              Chak Shahzad Campus in Islamabad, for British Council Your
              World 2026–27. A team of four students, testing their own
              habits first and sharing what actually worked — in class
              groups, on notice boards, and on this website.
            </p>
            <div className="home2-cta-row">
              <PillButton
                label="About Us"
                variant="secondary"
                arrow
                onClick={() => onNavigate('about')}
              />
            </div>
          </div>
          <div className="home2-campaign-card" aria-label="Campaign poster, as text">
            <p className="home2-campaign-headline">Unzip your screen.</p>
            <p className="home2-campaign-sub">Your day is underneath.</p>
            <p className="home2-campaign-foot">
              YourScreenHabits • Pak Turk Maarif Chak Shahzad Campus • Nov 2026
            </p>
          </div>
        </section>
      </Reveal>

      {/* Newsletter — utility band at the end of the page. */}
      <Reveal>
        <NewsletterSignup />
      </Reveal>
    </div>
  );
};
