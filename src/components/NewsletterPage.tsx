import React from 'react';
import { NewsletterSignup } from './NewsletterSignup';
import { PillButton } from './PillButton';
import { Reveal } from './Reveal';

interface NewsletterPageProps {
  onNavigate: (route: string) => void;
}

/** Newsletter — what subscribers get, and an honest archive.
    Issue 1 lands 1 December, so there is no archive yet: the page
    says so plainly instead of inventing past issues. The signup form
    stays unwired (sheetsUrl is '') until the owner fixes the
    deployment — it shows its honest fallback. */
const EXPECT = [
  {
    num: '01',
    heading: 'Digital wellbeing updates',
    detail:
      'Short updates on the topics this site covers — sleep, focus, eyes, movement, and routines — as the team learns more and writes more. No noise, no daily mail: one issue when there is something worth sending.'
  },
  {
    num: '02',
    heading: 'New educational guides',
    detail:
      'Every new guide goes to subscribers first. The library grows over time — new topics, new routines, and new research summaries — and the newsletter is how you hear about them without checking the site every week.'
  },
  {
    num: '03',
    heading: 'Campaign and initiative updates',
    detail:
      'What the student team is actually doing: the awareness work in school, the videos, the seminar, and the results when they are published. The campaign is one initiative on this platform, and the newsletter reports it honestly — including what did not work.'
  }
];

export const NewsletterPage: React.FC<NewsletterPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper">
      <section className="articles-header" aria-labelledby="newsletter-page-title">
        <span className="eyebrow">Newsletter</span>
        <h1 id="newsletter-page-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">📰</span> Newsletter
        </h1>
        <p className="articles-intro">
          One short email when there is something worth sending. Your
          email is only used for campaign updates — nothing else, no
          sharing, no selling.
        </p>
      </section>

      <div className="article-steps-list">
        {EXPECT.map((item) => (
          <Reveal key={item.num}>
            <section className="article-body-step article-step-block article-step-item">
              <span className="article-step-num" aria-hidden="true">{item.num}</span>
              <div className="article-step-body">
                <h2 className="article-step-heading">{item.heading}</h2>
                <p className="article-step-detail">{item.detail}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <NewsletterSignup />
      </Reveal>

      <Reveal>
        <section className="article-body-step article-step-block article-step-item">
          <span className="article-step-num" aria-hidden="true">04</span>
          <div className="article-step-body">
            <h2 className="article-step-heading">Newsletter archive</h2>
            <p className="article-step-detail">
              No issues have been sent yet. Issue 1 lands on 1 December 2026 — a short update on the first video, how awareness week went, and what is next. The archive will appear here after each issue is sent, with the newest first. Nothing is listed before it exists.
            </p>
          </div>
        </section>
      </Reveal>

      <div className="articles-preview-footer">
        <PillButton
          label="Read the guides"
          variant="secondary"
          arrow
          onClick={() => onNavigate('guides')}
        />
        <PillButton
          label="About the initiative"
          variant="secondary"
          arrow
          onClick={() => onNavigate('about')}
        />
      </div>
    </div>
  );
};
