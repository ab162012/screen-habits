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
    weight as the quest. A few honest lines each: who this is, what it
    is, and who it is for. No specific grade, no grade range. */
const CAMPAIGN_FACTS = [
  {
    emoji: '🌍',
    title: 'British Council Your World',
    desc: '2026–27 · Healthy habits in a digital world. Our entry for the British Council\u2019s Your World competition — a student campaign about healthier screen habits, built around one honest question: how do our screens shape our days?'
  },
  {
    emoji: '🎓',
    title: 'Student team · Islamabad',
    desc: 'Four students, one campaign. Built by Abdul Basit (Leader), Haider, Ebadullah Ilyas, and Salaar Javed Butt — a school team testing its own habits first, then sharing what actually worked.'
  },
  {
    emoji: '🏫',
    title: 'For school students',
    desc: 'Awareness + the quest, in class groups. Short guides and a 10-question check students can take in class — no sign-up, no competition, no award. Just an honest look at your own habits.'
  }
];

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

/** What the campaign has actually done, dated — and what is next.
    Plans are stated as plans; nothing here claims a result. */
const WHAT_WE_DID = [
  {
    emoji: '🗣️',
    title: 'School assembly',
    desc: 'Mon 2 Nov 2026 — the campaign launched at the school assembly.'
  },
  {
    emoji: '📢',
    title: 'Awareness day',
    desc: 'Thu 12 Nov 2026 — posters on the notice boards, the quest in class groups.'
  },
  {
    emoji: '🌐',
    title: 'Website live',
    desc: 'yourscreenhabits.com — the quest and the guides, live since 11 Nov 2026.'
  },
  {
    emoji: '📚',
    title: '7 habit guides',
    desc: 'Breaks, sleep, scrolling, eyes, the 9pm cut-off, teamwork — and what the experts say.'
  },
  {
    emoji: '🎬',
    title: 'YouTube channel',
    desc: '@yourscreenhabits — the campaign channel, live and ready for video 1.'
  },
  {
    emoji: '📰',
    title: 'Newsletter',
    desc: 'Campaign updates by email. Issue 1 is planned for Tue 1 Dec 2026.'
  }
];

/** How impact is measured — the method, not results. Nothing is
    measured yet, so no numbers appear anywhere here. */
const MEASURE_METHODS = [
  {
    emoji: '❓',
    title: 'The quest, before and after',
    desc: 'The same 10-question check, taken before the campaign and again after — so the two results can be compared.'
  },
  {
    emoji: '✋',
    title: 'Anonymous show of hands',
    desc: 'In class, no names: hands up before the awareness day, hands up after.'
  },
  {
    emoji: '👥',
    title: 'Our team’s before and after',
    desc: 'Each of the four of us takes the quest before and after — our own results, shown honestly.'
  },
  {
    emoji: '✉️',
    title: 'Newsletter replies',
    desc: 'What readers write back after each issue — the words, not just the count.'
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
          <span className="eyebrow">02 — The Campaign</span>
          <p className="home-campaign-intro">
            We are a student team in Islamabad. Our campaign is simple: help
            students see their screen habits clearly, then pick one small
            change and try it for seven days.
          </p>
          <div className="home-campaign-grid">
            {CAMPAIGN_FACTS.map((fact) => (
              <div className="home-campaign-card" key={fact.title}>
                <span className="home-campaign-emoji" aria-hidden="true">{fact.emoji}</span>
                <span className="home-campaign-title">{fact.title}</span>
                <span className="home-campaign-desc">{fact.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 3. Articles preview — the guides carry equal weight with the
          quest, so they come before it. */}
      <Reveal>
        <section className="articles-preview-section" aria-labelledby="articles-preview-title">
          <span className="eyebrow">03 — Guides</span>
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
              label="View All 7 Articles"
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
          <span className="eyebrow">04 — How It Works</span>
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

      {/* 5. Try one thing this week — the 7-day challenge, three
          choices. Follows How It Works step 3 ("Pick one 7-day
          challenge") directly. */}
      <Reveal>
        <section className="how-it-works-section" aria-labelledby="try-one-thing-title">
          <span className="eyebrow">05 — Try one thing this week</span>
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
        </section>
      </Reveal>

      {/* 6. What we did — dated campaign activity, done and next. */}
      <Reveal>
        <section className="home-campaign" aria-label="What we did">
          <span className="eyebrow">06 — What we did</span>
          <p className="home-campaign-intro">
            The campaign so far — what actually happened, and what is next.
          </p>
          <div className="home-campaign-grid">
            {WHAT_WE_DID.map((item) => (
              <div className="home-campaign-card" key={item.title}>
                <span className="home-campaign-emoji" aria-hidden="true">{item.emoji}</span>
                <span className="home-campaign-title">{item.title}</span>
                <span className="home-campaign-desc">{item.desc}</span>
              </div>
            ))}
          </div>
          <p className="home-campaign-intro">
            What’s next: YouTube video 1 on Fri 20 Nov · seminar 20–24 Nov, if a speaker confirms · video 2 on Sun 20 Dec · results on Thu 31 Dec.
          </p>
        </section>
      </Reveal>

      {/* 7. How we measure impact — the method, not results. */}
      <Reveal>
        <section className="home-campaign" aria-label="How we measure impact">
          <span className="eyebrow">07 — How we measure impact</span>
          <p className="home-campaign-intro">
            A campaign that claims change should show it — honestly. Here is how we measure ours.
          </p>
          <div className="home-campaign-grid">
            {MEASURE_METHODS.map((item) => (
              <div className="home-campaign-card" key={item.title}>
                <span className="home-campaign-emoji" aria-hidden="true">{item.emoji}</span>
                <span className="home-campaign-title">{item.title}</span>
                <span className="home-campaign-desc">{item.desc}</span>
              </div>
            ))}
          </div>
          <p className="home-campaign-intro">
            Results: coming 31 Dec. The quest-after runs on Tue 17 Nov — nothing is measured yet, and no numbers are shown until they are real.
          </p>
        </section>
      </Reveal>

      {/* 8. How scoring works — the honesty proof, kept but last: the
          quest no longer opens the page. */}
      <Reveal>
        <section className="honest-rules-band" aria-label="How the score works">
          <div className="honest-rules-inner">
            <span className="eyebrow honest-rules-eyebrow"><span className="eyebrow-emoji" aria-hidden="true">📊</span> 08 — How scoring works</span>
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
