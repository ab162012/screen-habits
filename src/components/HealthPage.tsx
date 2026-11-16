import React from 'react';
import { HEALTH_TOPICS } from '../data/healthTopics';
import { Reveal } from './Reveal';

interface HealthPageProps {
  onNavigate: (route: string) => void;
}

/** Health & Effects — an overview of the six topics. Each topic
    explains the issue, the evidence, the possible effects, and
    practical steps, with sources named. No medical claims. */
export const HealthPage: React.FC<HealthPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper">
      <section className="articles-header" aria-labelledby="health-title">
        <span className="eyebrow">Health &amp; Effects</span>
        <h1 id="health-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">💙</span> How Screens Affect Health
        </h1>
        <p className="articles-intro">
          Screens touch sleep, eyes, focus, movement, mood, and everyday
          routines — not all at once, and not the same for everyone. Each
          topic below explains the issue, what the evidence actually says,
          the possible effects, and practical steps. Sources are named on
          every page; nothing here is a medical diagnosis.
        </p>
      </section>

      <div className="home-campaign-grid">
        {HEALTH_TOPICS.map((topic) => (
          <Reveal key={topic.id}>
            <a
              href={`#health/${topic.slug}`}
              className="home-campaign-card"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`health/${topic.slug}`);
              }}
              aria-label={`${topic.title} — read the topic`}
            >
              <span className="home-campaign-emoji" aria-hidden="true">{topic.emoji}</span>
              <span className="home-campaign-title">{topic.title}</span>
              <span className="home-campaign-desc">{topic.intro}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
