import React from 'react';
import { HEALTH_TOPICS } from '../data/healthTopics';
import { PillButton } from './PillButton';
import { PillBadge } from './PillBadge';
import { Reveal } from './Reveal';

interface HealthTopicPageProps {
  topicSlug?: string;
  onNavigate: (route: string) => void;
}

/** One Health & Effects topic: issue, evidence, effects, steps.
    Evidence comes only from the WHO and AAP guidance named in the
    text and the site's own guides. No invented statistics. */
export const HealthTopicPage: React.FC<HealthTopicPageProps> = ({ topicSlug, onNavigate }) => {
  const topic = HEALTH_TOPICS.find((t) => t.slug === topicSlug) || HEALTH_TOPICS[0];

  return (
    <article className="article-detail-container article-reading-view article-detail" aria-labelledby="health-topic-heading">
      <div className="article-back-nav article-top-nav-bar article-nav-back">
        <PillButton
          label="← Back to Health & Effects"
          variant="secondary"
          onClick={() => onNavigate('health')}
        />
        <a
          href="#quest-info"
          className="article-read-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('quest-info');
          }}
        >
          Take the Quest →
        </a>
      </div>

      <div className="article-title-block">
        <div className="article-title-inner">
          <span className="article-emoji-mark" aria-hidden="true">{topic.emoji}</span>
          <h1 id="health-topic-heading" className="article-main-heading">
            {topic.title}
          </h1>
          <span className="article-tag-row">
            <PillBadge label={topic.topicTag} />
          </span>
        </div>
      </div>

      <p className="article-card-summary article-lead-paragraph article-intro">
        {topic.intro}
      </p>

      <div className="article-steps-list">
        {topic.sections.map((section, idx) => (
          <section key={idx} className="article-body-step article-step-block article-step-item">
            <span className="article-step-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
            <div className="article-step-body">
              <h2 className="article-step-heading">{section.heading}</h2>
              <p className="article-step-detail">{section.detail}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="article-closing-banner article-closing-callout article-closing-box">
        <span className="article-closing-emoji" aria-hidden="true">✅</span>{' '}
        <strong className="article-closing-label">Remember:</strong> this is a habits guide, not medical advice. For ongoing eye pain, headaches, or sleep problems, see a professional.
      </div>

      <div className="articles-preview-footer">
        <PillButton
          label="All health topics"
          variant="secondary"
          arrow
          onClick={() => onNavigate('health')}
        />
        <PillButton
          label="Healthy habits that help"
          variant="secondary"
          arrow
          onClick={() => onNavigate('habits')}
        />
      </div>

      <Reveal>
        <div className="home-campaign-grid">
          {HEALTH_TOPICS.filter((t) => t.id !== topic.id).map((other) => (
            <a
              key={other.id}
              href={`#health/${other.slug}`}
              className="home-campaign-card"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`health/${other.slug}`);
              }}
              aria-label={`${other.title} — read the topic`}
            >
              <span className="home-campaign-emoji" aria-hidden="true">{other.emoji}</span>
              <span className="home-campaign-title">{other.title}</span>
              <span className="home-campaign-desc">{other.intro}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </article>
  );
};
