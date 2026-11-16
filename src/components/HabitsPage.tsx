import React from 'react';
import { PillButton } from './PillButton';
import { Reveal } from './Reveal';

interface HabitsPageProps {
  onNavigate: (route: string) => void;
}

/** Healthy Habits — nine practical routines. Each one links to a
    full guide where one exists; the three without a guide are short,
    general routines drawn from the guides' own advice. Realistic,
    achievable changes — no bans, no universal rules. */
const HABITS = [
  {
    num: '01',
    emoji: '🚶',
    title: 'Phone-free breaks',
    detail:
      'A real break changes your body, not just your screen. Leave the phone across the room, move, drink water, and look far away — three minutes of something different is worth more than ten minutes of switching to another screen.',
    guide: { route: 'article/phone-free-breaks', label: 'Read the guide: Phone-free breaks' }
  },
  {
    num: '02',
    emoji: '🌙',
    title: 'The 9pm screen cut-off',
    detail:
      'An optional personal routine, not a rule for everyone: screens off at 9pm, so the last hour of the day belongs to slower things. Tell your friends the boundary, charge the phone across the room, and notice your mornings for seven days.',
    guide: { route: 'article/9pm-screen-cutoff', label: 'Read the guide: The 9pm screen cut-off' }
  },
  {
    num: '03',
    emoji: '🛌',
    title: 'Sleep and the last hour before bed',
    detail:
      'Dim warm light, a paper brain-dump for buzzing thoughts, audio instead of glare, and a bed that means sleep. The last hour decides how you sleep — protect it the same way every night.',
    guide: { route: 'article/sleep-last-hour', label: 'Read the guide: Sleep and the last hour' }
  },
  {
    num: '04',
    emoji: '📱',
    title: 'Reducing unnecessary scrolling',
    detail:
      'You do not need a detox — you need friction. Move endless-scroll apps into a folder on the last screen page, give scrolling fixed windows instead of open hours, and clean the feed so it ends sooner.',
    guide: { route: 'article/scrolling-less', label: 'Read the guide: Scrolling less' }
  },
  {
    num: '05',
    emoji: '🔕',
    title: 'Managing notifications',
    detail:
      'Keep push notifications only for direct messages from real people who need an answer. Mute recommendations, streak reminders, and app marketing — every other notification is the app asking for your attention on its schedule, not yours. A phone that only speaks when a person needs you is a tool again, not a slot machine.'
  },
  {
    num: '06',
    emoji: '👁️',
    title: 'Eye breaks and screen posture',
    detail:
      'Every twenty minutes, look twenty feet away for twenty seconds. Sit an arm\u2019s length from the screen with the top at or slightly below eye level, match the brightness to the room, and blink properly. If strain keeps coming back, get your eyes checked.',
    guide: { route: 'article/eyes-focus-breaks', label: 'Read the guide: Eyes, focus, and breaks' }
  },
  {
    num: '07',
    emoji: '🏃',
    title: 'Balancing screen time with physical activity',
    detail:
      'Movement belongs in the day, not after it. Walk in breaks, stretch between study blocks, play a game or a sport — and keep at least part of the day screen-free on purpose. The guidance is about balance, not a fixed number of active minutes.'
  },
  {
    num: '08',
    emoji: '🌳',
    title: 'Making room for offline activities',
    detail:
      'A day with no offline time is a day the screen owns. Keep one thing each day that is not on a screen — a walk, a book, a meal with family, time with friends in person — and protect it the way you would protect a lesson. Offline time is not lost time; it is the part of the day your brain uses to rest.'
  },
  {
    num: '09',
    emoji: '🧭',
    title: 'Developing intentional technology habits',
    detail:
      'Before opening any app, pause for ten seconds and state your purpose aloud. If you cannot name one, put the phone down. Write a family media plan together — sleep, activity, homework, and meals first, screens fitted around them — and pin it up where everyone can see it.'
  }
];

export const HabitsPage: React.FC<HabitsPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper">
      <section className="articles-header" aria-labelledby="habits-title">
        <span className="eyebrow">Healthy Habits</span>
        <h1 id="habits-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">🌱</span> Healthy Habits
        </h1>
        <p className="articles-intro">
          Realistic, achievable changes — not bans, not universal rules.
          Pick one habit, try it for seven days, and keep the ones that
          actually work. Every habit below either links to a full guide or
          stands on its own in a few lines.
        </p>
      </section>

      <div className="article-steps-list">
        {HABITS.map((habit) => (
          <Reveal key={habit.num}>
            <section className="article-body-step article-step-block article-step-item">
              <span className="article-step-num" aria-hidden="true">{habit.num}</span>
              <div className="article-step-body">
                <h2 className="article-step-heading">
                  <span aria-hidden="true">{habit.emoji} </span>
                  {habit.title}
                </h2>
                <p className="article-step-detail">{habit.detail}</p>
                {habit.guide && (
                  <a
                    href={`#${habit.guide.route}`}
                    className="article-read-link"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(habit.guide!.route);
                    }}
                  >
                    {habit.guide.label} →
                  </a>
                )}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <div className="articles-preview-footer">
        <PillButton
          label="Understand your habits first"
          variant="secondary"
          arrow
          onClick={() => onNavigate('understand')}
        />
        <PillButton
          label="Take the Quest"
          variant="primary"
          arrow
          onClick={() => onNavigate('quest-info')}
        />
      </div>
    </div>
  );
};
