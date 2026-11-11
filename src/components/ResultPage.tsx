import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { calculateReport, QUESTIONS, APP_SLOGAN } from '../questions';
import type { AnswersState, UserProfile, ChallengeType } from '../types';
import { PathMap } from './PathMap';
import { PillButton } from './PillButton';
import { PillBadge } from './PillBadge';
import { FloatingBar } from './FloatingBar';

interface ResultPageProps {
  answers: AnswersState;
  profile: UserProfile;
  completionCount: number;
  onRetake: () => void;
  onNavigate: (route: string) => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  answers,
  profile,
  completionCount,
  onRetake,
  onNavigate
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeType>('breaks');
  const [startDay, setStartDay] = useState<string>('Tomorrow');
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const confettiFired = useRef(false);

  const report = useMemo(() => calculateReport(answers), [answers]);

  // Confetti in ocean blues only, 14 pieces, falling once for ~2s
  useEffect(() => {
    if (!confettiFired.current && !report.isPartial && report.answeredCount > 0) {
      confettiFired.current = true;
      try {
        confetti({
          particleCount: 14,
          spread: 55,
          origin: { y: 0.65 },
          colors: ['#0B4F6C', '#0369A1', '#7DD3FC', '#BAE6FD']
        });
      } catch {
        // Fallback
      }
    }
  }, [report.isPartial, report.answeredCount]);

  // Score count-up animation — rolls up like the reel's dial; instant
  // when the user prefers reduced motion.
  useEffect(() => {
    if (report.isPartial) {
      setAnimatedScore(0);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimatedScore(report.totalScore);
      return;
    }
    let start = 0;
    const target = report.totalScore;
    const stepTime = 20;
    const totalSteps = 25;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [report.totalScore, report.isPartial]);

  // Challenge details
  const challengeDetails = {
    breaks: {
      title: 'Phone-free breaks during the day',
      desc: 'Set the phone in another room or bag during every study pause. Reconnect with a 3-minute physical reset, water, or stretching instead of scrolling feeds.'
    },
    cutoff: {
      title: 'A 9pm screen cut-off',
      desc: 'Shut down all active phone and computer screens by 9:00 PM. Charge devices away from the bed and spend the final hour before sleep with offline routines.'
    }
  };

  const currentChallenge = challengeDetails[selectedChallenge];

  // Derived single fix for weakest area
  const singleFix = useMemo(() => {
    if (report.isPartial) {
      return 'Answer at least 5 questions to receive your diagnostic and pinpoint your single habit fix.';
    }
    const weakest = report.partScores.find((p) => p.title === report.weakestPartTitle);
    const idx = weakest ? weakest.partIndex : 0;
    switch (idx) {
      case 2:
        return 'Shut screens off 30 minutes before bed to allow melatonin rise and deeper sleep.';
      case 1:
        return 'Put your top distraction app inside a folder to break unconscious autopilot unlocks.';
      case 3:
        return 'Practice the 20-20-2 eye recovery rule and stretch during unbroken screen stretches.';
      default:
        return 'Anchor meals and daily commutes as device-free zones to ease continuous daily screen hours.';
    }
  }, [report]);

  // One short paragraph the user can read aloud in their team video
  const readAloudParagraph = useMemo(() => {
    if (report.isPartial) {
      return `During my Screen Habits diagnostic, I completed a partial check answering ${report.answeredCount} of 10 questions. My initial habit focus is ${report.weakestPartTitle}, and for our team video project on Healthy habits in a digital world, I am committing to a 7-day challenge of "${currentChallenge.title}" starting ${startDay}. Over the next week, our team will test and film this habit in action.`;
    }
    return `During my Screen Habits diagnostic, I achieved a ${report.band} score of ${report.totalScore}/100, answering ${report.answeredCount} of 10 questions. My weakest area was ${report.weakestPartTitle}, so for our team video project on Healthy habits in a digital world, I am committing to a 7-day challenge of "${currentChallenge.title}" starting ${startDay}. Over the next week, our team will test and film this habit in action.`;
  }, [report, currentChallenge, startDay]);

  // Video-ready summary block text
  const videoSummaryText = useMemo(() => {
    const studentLine = profile.name
      ? `Student: ${profile.name}${profile.classSection ? ` (${profile.classSection})` : ''}`
      : 'Student habits profile';

    const baselineLine = report.isPartial
      ? `Screen Balance: Partial check (${report.answeredCount} of 10 questions answered).`
      : `Screen Balance Score: ${report.totalScore}/100 (${report.band} Band, based on ${report.answeredCount} of 10 questions).`;

    const weakestLine = `Habit Focus Area: ${report.weakestPartTitle}.`;

    const challengeLine = `7-Day Challenge: ${currentChallenge.title} (Starting: ${startDay}).
Challenge Commitment: ${currentChallenge.desc}`;

    const questionLines = QUESTIONS.map((q) => {
      const p = report.partScores[q.partIndex];
      const r = p?.questionResults.find((qr) => qr.questionId === q.id);
      return `• ${q.title}: ${r ? r.statusText : 'Skipped'}`;
    }).join('\n');

    return `SCREEN HABITS — VIDEO SUMMARY
Theme: Healthy habits in a digital world
Competition: British Council Your World Video Competition

SPOKEN SCRIPT (READ ALOUD IN VIDEO)
"${readAloudParagraph}"

${studentLine}
Slogan: ${APP_SLOGAN}

BASELINE DIAGNOSTIC
${baselineLine}
${weakestLine}
One Fix: ${singleFix}
Verdict: ${report.verdictLine}

CHOSEN 7-DAY CHALLENGE (✅)
${challengeLine}

QUESTION DETAIL (HONEST RECORD)
${questionLines}

FILMING & COMPETITION NOTES
• What to film: Real students, a real place, the real seven days of testing this habit change.
• Video format: Live-action only, maximum 3 minutes duration, created by a team of 3 to 5 students.
• Important: This summary provides baseline habit evidence. Team registration and student eligibility are confirmed by school mentors, not by this webpage.`;
  }, [report, profile, currentChallenge, startDay, readAloudParagraph, singleFix]);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(videoSummaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = videoSummaryText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (report.answeredCount === 0) {
    return (
      <div className="result-composed-page">
        <section className="result-card result-empty-state">
          <span className="result-empty-mark" aria-hidden="true">📱</span>
          <h2 className="result-empty-title">
            No Active Result Yet
          </h2>
          <p className="result-empty-body">
            Complete the ten-question Screen Habits Quest to calculate your personal balance score and unlock your video-ready report.
          </p>
          <PillButton
            label="Start the Quest"
            variant="primary"
            arrow
            onClick={() => onNavigate('quest')}
          />
        </section>
      </div>
    );
  }

  // SVG Ring calculation
  const circleRadius = 54;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = report.isPartial
    ? circumference
    : circumference - (animatedScore / 100) * circumference;

  const hasFinisherBadge = report.answeredCount === 10;
  const hasComebackBadge = completionCount >= 2;

  return (
    <div className="result-composed-page">
      {/* 1. HERO CARD — the score first. The path strip now sits BELOW
          the hero, not above it. */}
      <section className="result-card result-hero-card">
        {/* Name and class chips at the top — ALL white pill / navy text
            inside the ocean band (the old navy-on-navy Finisher badge
            was invisible at 1.00:1). */}
        <div className="hero-chips-row">
          <PillBadge label={profile.name || 'Guest'} tone="on-dark" />
          {profile.classSection && (
            <PillBadge label={`Class: ${profile.classSection}`} tone="on-dark" />
          )}
          {hasFinisherBadge && (
            <PillBadge label="⭐ Finisher" tone="on-dark" />
          )}
          {hasComebackBadge && (
            <PillBadge label="🔄 Comeback" tone="on-dark" />
          )}
        </div>

        {/* Hero Score Block */}
        <div className="hero-score-block">
          {/* Score Ring */}
          <div className="score-ring-wrapper">
            <svg className="score-svg" viewBox="0 0 140 140" aria-label={`Score: ${animatedScore} out of 100`}>
              <circle
                className="score-track-bg"
                cx="70"
                cy="70"
                r={circleRadius}
              />
              <circle
                className="score-track-fill-blue"
                cx="70"
                cy="70"
                r={circleRadius}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset
                }}
                transform="rotate(-90 70 70)"
              />
            </svg>
            <div className="score-inside-text">
              {report.isPartial ? (
                <span className="score-number-big score-number-partial">
                  {report.answeredCount}/10
                </span>
              ) : (
                <>
                  <span className="score-number-big">{animatedScore}</span>
                  <span className="score-max-label">out of 100</span>
                </>
              )}
            </div>
          </div>

          {/* Hero Band Block */}
          <div className="hero-band-block">
            {report.isPartial ? (
              <span className="band-pill band-pill-incomplete result-band-title">
                <span className="band-pill-emoji" aria-hidden="true">⏳</span>
                Not enough answers for a full score
              </span>
            ) : (
              <span className="band-pill result-band-title">
                <span className="band-pill-emoji" aria-hidden="true">{report.bandEmoji}</span>
                {report.band} Band
              </span>
            )}

            {/* Slogan line under score */}
            <div className="hero-slogan-line result-slogan">{APP_SLOGAN}</div>

            {/* Answered count badge */}
            <div className="answered-count-badge result-answered-count">
              Score from {report.answeredCount} of {report.totalQuestions} questions
            </div>
          </div>
        </div>

        {/* Specific Verdict Line */}
        <div className={`hero-verdict-box ${report.isPartial ? 'verdict-box-partial' : 'verdict-box-blue'}`}>
          <p className="hero-verdict-line result-verdict">{report.verdictLine}</p>
        </div>

        {/* One-line scoring rule */}
        <p className="hero-scoring-rule">
          Score scaled across answered questions only. Skipped questions contribute 0 points and do not penalize your average.
        </p>
      </section>

      {/* 2. PATH WALKED — proof of what was answered, below the score. */}
      <div className="result-path-strip">
        <PathMap
          variant="strip"
          currentStep={QUESTIONS.length}
          answers={answers}
        />
      </div>

      {/* 3. WEAKEST PART WITH ONE FIX ONLY */}
      <section className="result-card weakest-part-section" aria-label="Weakest habit area and single fix">
        <h2 className="result-section-heading">
          <span className="section-emoji" aria-hidden="true">🎯</span>
          <span>Weakest Area &amp; Single Fix</span>
        </h2>
        <div className="weakest-fix-bubble">
          <div className="weakest-fix-row">
            <span className="weakest-fix-area">
              Focus Area: {report.weakestPartTitle}
            </span>
            <PillBadge label="Priority Target" />
          </div>
          <p className="weakest-fix-text">
            <strong>One Fix:</strong> {singleFix}
          </p>
        </div>
      </section>

      {/* 4. PARTS SUMMARY GRID (2x2 grid) */}
      <section className="result-card parts-section-container" aria-label="Habit breakdown by area">
        <h2 className="result-section-heading"><span className="section-emoji" aria-hidden="true">🧩</span> Four Habit Areas</h2>
        <div className="parts-summary-grid">
          {report.partScores.map((part) => (
            <div className="part-stat-card part-result-card" key={part.partIndex}>
              <div className="part-header">
                <span className="part-emoji-mark" aria-hidden="true">{part.emoji}</span>
                <span className="part-name-label">{part.title}</span>
                <span className="part-score-pill">
                  {part.hasAnswered ? `${part.score} / ${part.maxScore} pts` : 'No answers'}
                </span>
              </div>

              <div className="part-rule-hint">{part.ruleHint}</div>

              <div className="part-items-container">
                {part.questionResults.map((item) => (
                  <div className="part-item-row" key={item.questionId}>
                    <span className="part-q-title-text">{item.title}</span>
                    <span className={`part-q-answer-pill ${item.isSkipped ? 'pill-skipped is-skipped' : ''}`}>
                      {item.statusText}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RECOMMENDATIONS — WHITE ground, not a navy panel
          (the hero is already the page's one dark band). */}
      <section className="result-card recommendations-section" aria-label="Personal recommendations">
        <h2 className="result-section-heading"><span className="section-emoji" aria-hidden="true">💡</span> Top Three Practical Actions</h2>
        <p className="rec-section-subtext">
          Targeted habit adjustments based directly on your weakest diagnostic area:
        </p>
        <div className="rec-cards-list">
          {report.recommendations.map((rec, index) => (
            <div className="rec-card action-card" key={rec.id}>
              <div className="rec-card-header">
                <span className="rec-icon-emoji" aria-hidden="true">{rec.icon}</span>
                <span className="rec-title-text">{index + 1}. {rec.title}</span>
              </div>
              <div className="rec-action-row">{rec.action}</div>
              <div className="rec-first-step-box">
                <span className="rec-step-tag">First Step:</span>
                <span className="rec-step-text">{rec.tinyFirstStep}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. THE 7-DAY CHALLENGE PICKER (Filmable challenge for video) */}
      <section className="result-card" aria-label="Pick Your 7-Day Team Challenge">
        <h2 className="result-section-heading">
          <span className="section-emoji" aria-hidden="true">✅</span>
          <span>Pick Your 7-Day Team Challenge</span>
        </h2>
        <p className="challenge-intro">
          Select exactly ONE challenge to test for seven continuous days. This is the real habit trial
          your team can film and document for the video competition.
        </p>

        <div className="challenge-picker-box" role="radiogroup" aria-label="7-Day Challenge Options">
          <button
            type="button"
            className={`challenge-toggle-btn ${selectedChallenge === 'breaks' ? 'selected' : ''}`}
            onClick={() => setSelectedChallenge('breaks')}
            role="radio"
            aria-checked={selectedChallenge === 'breaks'}
          >
            <span className={`challenge-radio ${selectedChallenge === 'breaks' ? 'selected' : ''}`} aria-hidden="true">{selectedChallenge === 'breaks' ? '✓' : ''}</span>
            <span className="challenge-toggle-body">
              <strong className="challenge-toggle-title">
                Phone-free breaks during the day
              </strong>
              <span className="challenge-toggle-desc">
                Leave screens behind during pauses. Physical reset with water and stretching.
              </span>
            </span>
          </button>

          <button
            type="button"
            className={`challenge-toggle-btn ${selectedChallenge === 'cutoff' ? 'selected' : ''}`}
            onClick={() => setSelectedChallenge('cutoff')}
            role="radio"
            aria-checked={selectedChallenge === 'cutoff'}
          >
            <span className={`challenge-radio ${selectedChallenge === 'cutoff' ? 'selected' : ''}`} aria-hidden="true">{selectedChallenge === 'cutoff' ? '✓' : ''}</span>
            <span className="challenge-toggle-body">
              <strong className="challenge-toggle-title">
                A 9pm screen cut-off
              </strong>
              <span className="challenge-toggle-desc">
                Shut down active devices at 9:00 PM. Charge away from bed and wind down offline.
              </span>
            </span>
          </button>
        </div>

        {/* Interactive Pledge Card */}
        <div className="challenge-pledge-card pledge-card">
          <div className="challenge-pledge-header">
            Pledge: {currentChallenge.title}
          </div>
          <p className="challenge-pledge-desc">
            {currentChallenge.desc}
          </p>
          <div className="challenge-day-selector">
            <label htmlFor="pledge-start-day">
              <strong>Start Day:</strong>
            </label>
            <select
              id="pledge-start-day"
              className="challenge-day-select"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
            >
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="This Monday">This Monday</option>
              <option value="Next Weekend">Next Weekend</option>
            </select>
          </div>
        </div>
      </section>

      {/* 7. VIDEO-READY SUMMARY BLOCK */}
      <section className="result-card video-summary-section" aria-label="British Council Your World Summary">
        <div className="summary-header-row">
          <h2 className="result-section-heading">
            <span className="section-emoji" aria-hidden="true">🏆</span>
            <span>British Council Your World Summary</span>
          </h2>
          {copied && (
            <span className="copied-pill">
              ✓ Copied to clipboard!
            </span>
          )}
        </div>
        <p className="summary-intro">
          Your video-ready habit evidence summary. Read the spoken paragraph aloud in your video, and copy the full record below.
        </p>

        {/* Read-Aloud Spoken Paragraph */}
        <div className="read-aloud-box">
          <div className="read-aloud-header">
            <span className="read-aloud-label">
              <span className="section-emoji" aria-hidden="true">🗣️</span>
              <span>Spoken Video Script (Read Aloud)</span>
            </span>
            <span className="read-aloud-time">
              ~20 seconds
            </span>
          </div>
          <p className="read-aloud-text">
            &ldquo;{readAloudParagraph}&rdquo;
          </p>
        </div>

        <div className="video-summary-wrapper video-summary-box">
          <pre className="video-summary-content video-summary-pre">{videoSummaryText}</pre>
        </div>
      </section>

      {/* 8. ACTION BAR — floating pill, same component as the Quest nav. */}
      <FloatingBar label="Result actions">
        <PillButton
          label={copied ? '✓ Summary Copied' : '📋 Copy Summary'}
          variant="primary"
          onClick={handleCopySummary}
        />
        <PillButton
          label="🖨️ Print or Save PDF"
          variant="secondary"
          onClick={handlePrint}
        />
        <PillButton
          label="🔄 Retake Quest"
          variant="secondary"
          onClick={onRetake}
        />
      </FloatingBar>
    </div>
  );
};
