import React from 'react';
import { PillButton } from './PillButton';
import { Reveal } from './Reveal';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

/** About Us — the people and purpose behind the platform. Every
    fact is from the campaign record: the team, the school, the
    dated activities, the competition. No invented biographies,
    quotes, or results. */
const TEAM = [
  { emoji: '🧭', name: 'Abdul Basit', role: 'Leader — started the initiative and leads the team.' },
  { emoji: '🎯', name: 'Haider', role: 'Team member — awareness work and the school presentation.' },
  { emoji: '📋', name: 'Ebadullah Ilyas', role: 'Team member — guides, research, and the newsletter.' },
  { emoji: '🎬', name: 'Salaar Javed Butt', role: 'Team member — video, posters, and the presentation.' }
];

const ACTIVITIES = [
  {
    num: '01',
    heading: 'Our story',
    detail:
      'YourScreenHabits started with a simple question asked in a school corridor: how do our screens shape our days? Four students at Pak Turk Maarif Chak Shahzad Campus in Islamabad kept noticing the same thing — phones in bed, tired mornings, homework that took twice as long as it should. Nobody was banning anything, and nobody wanted to. So the team decided to look at the habits honestly instead: measure them, test small changes for seven days, and share what actually worked.'
  },
  {
    num: '02',
    heading: 'Our mission',
    detail:
      'Help people understand their screen habits, recognise how digital behaviour affects sleep, wellbeing, focus, and everyday routines, and discover practical, realistic ways to build healthier habits. Not by fear, and not by banning devices — by awareness, balance, and personal responsibility. Screens are part of education, communication, entertainment, and everyday life. What matters is how, when, why, and how much we use them.'
  },
  {
    num: '03',
    heading: 'Our perspective on digital wellbeing',
    detail:
      'We do not believe all screen use is harmful, and we do not believe people should stop using technology. We believe in balance: screens are tools, and a tool is judged by what it does for you. We focus on behaviour and habits, not simply screen-time numbers, because two hours of creative work is not the same as two hours of scrolling at midnight. We promote awareness, not fear — and practical advice, not unrealistic restrictions.'
  },
  {
    num: '04',
    heading: 'Why we started YourScreenHabits',
    detail:
      'The team started this because the advice available to students was either a scary number or a shrug. One post said two hours a day, another said screens are ruining a generation, and neither said who was studied or how old they were. The team wanted something better: honest guidance with named sources and small changes a student can actually keep. The website is that thing — built by students, for anyone who uses a screen.'
  },
  {
    num: '05',
    heading: 'Our school',
    detail:
      'Pak Turk Maarif Chak Shahzad Campus, Islamabad, Pakistan — a British Council Partner School. The campaign runs in the school community: posters go up on notice boards, and the team shares what it learns. The school is where the initiative started, but the website is for anyone, anywhere — you do not need to know our school to use it.'
  },
  {
    num: '06',
    heading: 'Our awareness activities',
    detail:
      'The team launched the campaign at a school assembly on Monday 2 November 2026, supervised by Ma\u2019am Neelum. Awareness day followed on Thursday 12 November 2026: a short presentation and posters on the notice boards. The website went live the same week, the YouTube channel opened, and data collection runs from 13 November to 20 December. The first video lands on 20 November, a seminar is planned for 20–24 November if a speaker confirms, and the final results are published on 31 December.'
  },
  {
    num: '07',
    heading: 'British Council Your World 2026–27',
    detail:
      'The campaign is our entry for British Council Your World 2026–27, on the theme \u201cHealthy habits in a digital world\u201d. The competition asks student teams to make a live-action video of up to three minutes that delivers real impact in their community. For us, the competition is the origin and the real-world application of this platform — it is how the ideas on this site are tested with real students. It is not the platform itself: the website stands on its own, and a visitor can use all of it without knowing anything about the competition.'
  },
  {
    num: '08',
    heading: 'Our societal awareness objectives',
    detail:
      'The objective is societal, not personal: spread awareness among school children, help them see their own habits clearly, and give them one small change they can actually keep. No competition, no award, no winner. The team does not compete with anyone — classes take part together. Success is not a number; it is students who understand their habits better than they did before.'
  },
  {
    num: '09',
    heading: 'How we measure impact',
    detail:
      'Impact is measured three ways: an anonymous show of hands in class, before and after; the team\u2019s own before-and-after; and newsletter replies. Results are published on 31 December — and nothing is shown until it is real. No numbers are claimed before they are measured, and no result is rounded up. That honesty is part of the project.'
  }
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper">
      <section className="articles-header" aria-labelledby="about-title">
        <span className="eyebrow">About Us</span>
        <h1 id="about-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">👥</span> About Us
        </h1>
        <p className="articles-intro">
          YourScreenHabits is an educational awareness initiative created
          by students — not a company, not a clinic, and not a campaign
          that ends when the competition does.
        </p>
      </section>

      <div className="article-steps-list">
        {ACTIVITIES.map((section) => (
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

      <Reveal>
        <section className="article-body-step article-step-block article-step-item">
          <span className="article-step-num" aria-hidden="true">10</span>
          <div className="article-step-body">
            <h2 className="article-step-heading">Our student team</h2>
            <p className="article-step-detail">
              Four students, one campaign — testing our own habits first,
              then sharing what actually worked.
            </p>
            <div className="home-campaign-grid">
              {TEAM.map((member) => (
                <div className="home-campaign-card" key={member.name}>
                  <span className="home-campaign-emoji" aria-hidden="true">{member.emoji}</span>
                  <span className="home-campaign-title">{member.name}</span>
                  <span className="home-campaign-desc">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <div className="articles-preview-footer">
        <PillButton
          label="Read the team guide"
          variant="primary"
          arrow
          onClick={() => onNavigate('article/healthy-habits-student-team')}
        />
      </div>
    </div>
  );
};
