import React from 'react';
import { PillButton } from './PillButton';
import { Reveal } from './Reveal';

interface UnderstandPageProps {
  onNavigate: (route: string) => void;
}

/** Understand Screen Habits — the ideas behind the numbers. No
    statistics, no medical claims: the content is drawn from the
    site's own guides and the expert guidance they cite. */
const UNDERSTAND_SECTIONS = [
  {
    num: '01',
    heading: 'What screen habits are',
    detail:
      'A screen habit is not a number of hours. It is a pattern: how you use screens, when you reach for them, why you open them, and how much of your day they take. Two people with the same screen time can have completely different habits — one planned, one automatic — and the difference matters more than the clock. Understanding your habits starts with noticing the pattern, not counting the minutes.'
  },
  {
    num: '02',
    heading: 'Different purposes of screen use',
    detail:
      'Screens serve different purposes, and each one counts differently. Educational use — studying, reading, making things — is active and chosen. Recreational use — videos, games, music — is rest, and rest has a place. Social use — messages, group chats, calls — is how friendships work now. None of these is "bad screen time" on its own. The question is never which purpose is allowed; it is whether each purpose is getting the time it deserves, and whether one of them is quietly taking the others\u2019 share.'
  },
  {
    num: '03',
    heading: 'Active and passive screen use',
    detail:
      'Active use is doing something: writing, creating, solving, talking to a real person. Passive use is receiving something: scrolling a feed, watching autoplay, letting the next video choose itself. Active use usually leaves you feeling like time was spent; passive use usually leaves you wondering where the time went. The difference is not the app — the same app can be either — it is whether you chose what happened next, or whether the feed chose it for you.'
  },
  {
    num: '04',
    heading: 'Intentional use versus automatic scrolling',
    detail:
      'Automatic scrolling is the habit of opening a feed without deciding to. The thumb moves before the brain does, and twenty minutes disappear before a single decision was made. Intentional use is the opposite: you know why you opened the app before you open it. The simplest test is the ten-second pause — before tapping a feed app, stop for ten seconds and state your purpose aloud. If you cannot name one, put the phone down. Half of all openings have no reason at all, and naming the reason is what separates the two.'
  },
  {
    num: '05',
    heading: 'Why screen time alone does not tell the whole story',
    detail:
      'Two hours of creative work is not the same as two hours of scrolling at midnight, and a fixed number cannot tell the difference. That is why the World Health Organization sets no single screen-time limit for school-age children, and why the American Academy of Pediatrics moved in 2026 from strict hour limits to a family media plan. The rule that replaces the number is a question: what did screens push out of the day? If the answer is nothing — sleep, movement, homework, and family time all happened — the day was balanced.'
  },
  {
    num: '06',
    heading: 'Recognising potentially unhealthy patterns',
    detail:
      'A pattern is worth noticing when screens regularly push something else out: sleep gets shorter, homework starts late, meals happen with a phone in hand, or you check the phone without remembering why. Feeling worse after certain feeds, or finding it hard to stop once you start, are also signs worth noticing. None of these on their own means something is wrong — a pattern is a habit repeated over days, not one bad evening. The point of recognising it is not guilt; it is information. A pattern you can see is a pattern you can change.'
  },
  {
    num: '07',
    heading: 'Understanding your own digital behaviour',
    detail:
      'Nobody else can tell you how your habits work — the only honest way to find out is to look at your own week. Keep a simple note for seven days: when you picked up the phone, why, and what it replaced. Read it back at the end of the week and your weakest area will show itself. Your own evidence — what actually happened when you tried a change — is worth more than any advice, including this page.'
  }
];

export const UnderstandPage: React.FC<UnderstandPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper">
      <section className="articles-header" aria-labelledby="understand-title">
        <span className="eyebrow">Understand</span>
        <h1 id="understand-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">🧭</span> Understand Screen Habits
        </h1>
        <p className="articles-intro">
          Before changing anything, it helps to understand what is actually
          happening. Screen habits are patterns — how, when, why, and how
          much — and the pattern matters more than the number of hours.
        </p>
      </section>

      <div className="article-steps-list">
        {UNDERSTAND_SECTIONS.map((section) => (
          <Reveal key={section.num}>
            <section className="article-body-step article-step-block article-step-item">
              <span className="article-step-num" aria-hidden="true">{section.num}</span>
              <div className="article-step-body">
                <h2 className="article-step-heading">{section.heading}</h2>
                <p className="article-step-detail">{section.detail}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <div className="articles-preview-footer">
        <PillButton
          label="How screens affect health"
          variant="primary"
          arrow
          onClick={() => onNavigate('health')}
        />
        <PillButton
          label="Browse all 13 articles"
          variant="secondary"
          arrow
          onClick={() => onNavigate('guides')}
        />
      </div>
    </div>
  );
};
