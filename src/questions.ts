import type { Question, AnswersState, ScoreReport, PartScore, ScoreBand, Recommendation } from './types';

export const APP_SLOGAN = 'Know your screen. Own your time.';

export const DISCLAIMER_TEXT =
  'This is a habits guide, not medical advice. For ongoing eye pain, headaches, or sleep problems, see a professional.';

export const PART_NAMES = [
  { index: 0, title: 'Devices & Time', emoji: '📱' },
  { index: 1, title: 'Apps & Scrolling', emoji: '📲' },
  { index: 2, title: 'Night & Sleep', emoji: '🌙' },
  { index: 3, title: 'Body & Focus', emoji: '🎯' }
];

export const QUESTIONS: Question[] = [
  // --- PART 1: Devices and Time (📱) ---
  {
    id: 'q1',
    partIndex: 0,
    partTitle: 'Devices & Time',
    partEmoji: '📱',
    type: 'slider',
    title: 'How many hours of personal screen time do you average daily?',
    min: 1,
    max: 16,
    step: 0.5,
    unit: 'hours/day'
  },
  {
    id: 'q2',
    partIndex: 0,
    partTitle: 'Devices & Time',
    partEmoji: '📱',
    type: 'multi-chips',
    title: 'Which digital screens do you use in a typical day?',
    options: [
      { id: 'phone', label: 'Smartphone', emoji: '📱', points: 20 },
      { id: 'laptop', label: 'Laptop / PC', emoji: '💻', points: 20 },
      { id: 'tablet', label: 'Tablet / iPad', emoji: '📟', points: 15 },
      { id: 'tv', label: 'TV / Streaming', emoji: '📺', points: 15 },
      { id: 'console', label: 'Gaming Console', emoji: '🎮', points: 12 }
    ]
  },

  // --- PART 2: Apps and Scrolling (📲) ---
  {
    id: 'q3',
    partIndex: 1,
    partTitle: 'Apps & Scrolling',
    partEmoji: '📲',
    type: 'single-cards',
    title: 'Which app category pulls the largest chunk of your free time?',
    options: [
      { id: 'short_video', label: 'Short Videos (Reels, TikTok)', emoji: '⚡', subtext: 'Continuous algorithm feeds', points: 5 },
      { id: 'social', label: 'Social Media Feeds', emoji: '💬', subtext: 'Checking posts and stories', points: 10 },
      { id: 'messaging', label: 'Direct Messaging', emoji: '✉️', subtext: 'Chats with friends and groups', points: 18 },
      { id: 'work', label: 'Reading, Audio, or Work', emoji: '📚', subtext: 'Purposeful content or study', points: 25 }
    ]
  },
  {
    id: 'q4',
    partIndex: 1,
    partTitle: 'Apps & Scrolling',
    partEmoji: '📲',
    type: 'single-cards',
    title: 'How often do you unlock your phone without a specific reason?',
    options: [
      { id: 'rarely', label: 'Rarely', emoji: '🍃', subtext: 'Only when I have a clear task in mind', points: 25 },
      { id: 'few_times', label: 'A few times daily', emoji: '🌤️', subtext: 'Brief look during natural pauses', points: 19 },
      { id: 'frequently', label: 'Frequently', emoji: '🔄', subtext: 'Whenever there is any idle moment', points: 11 },
      { id: 'constantly', label: 'Constantly', emoji: '⚡', subtext: 'Unconscious autopilot habit', points: 4 }
    ]
  },
  {
    id: 'q5',
    partIndex: 1,
    partTitle: 'Apps & Scrolling',
    partEmoji: '📲',
    type: 'single-cards',
    title: 'How often do you scroll in bed or late into the night?',
    options: [
      { id: 'rarely', label: 'Rarely or never', emoji: '🌙', subtext: 'Screens shut down before bedtime', points: 25 },
      { id: '1_2', label: '1 to 2 nights a week', emoji: '🛋️', subtext: 'Occasional late browsing', points: 18 },
      { id: '3_5', label: '3 to 5 nights a week', emoji: '🌗', subtext: 'Regular late-night screen time', points: 10 },
      { id: 'every_night', label: 'Almost every night', emoji: '🕯️', subtext: 'Screen is active right until sleep', points: 3 }
    ]
  },

  // --- PART 3: Night and Sleep (🌙) ---
  {
    id: 'q6',
    partIndex: 2,
    partTitle: 'Night & Sleep',
    partEmoji: '🌙',
    type: 'single-cards',
    title: 'Do you use active screens during your final hour before sleep?',
    options: [
      { id: 'no_screens', label: 'Screens off for wind-down', emoji: '📖', subtext: 'Reading, quiet routine, or music', points: 25 },
      { id: 'dim_brief', label: 'Quiet use with warm filter', emoji: '🛋️', subtext: 'Brief audio or warm reading', points: 19 },
      { id: 'until_lights', label: 'Until right before lights out', emoji: '📱', subtext: 'Screen stays on in bed', points: 10 },
      { id: 'fall_asleep', label: 'Fall asleep with phone active', emoji: '💡', subtext: 'Display glowing as I drift off', points: 3 }
    ]
  },
  {
    id: 'q7',
    partIndex: 2,
    partTitle: 'Night & Sleep',
    partEmoji: '🌙',
    type: 'scale-1-to-5',
    title: 'How would you rate your sleep hours and rest quality?',
    options: [
      { id: '1', label: '1 — Fragmented & exhausted', points: 5 },
      { id: '2', label: '2 — Restless or too short', points: 11 },
      { id: '3', label: '3 — Moderate rest', points: 17 },
      { id: '4', label: '4 — Good, wake up rested', points: 21 },
      { id: '5', label: '5 — Deep, refreshing sleep', points: 25 }
    ]
  },

  // --- PART 4: Body and Focus (🎯) ---
  {
    id: 'q8',
    partIndex: 3,
    partTitle: 'Body & Focus',
    partEmoji: '🎯',
    type: 'single-cards',
    title: 'How often do you feel eye dryness or screen fatigue after sessions?',
    options: [
      { id: 'rarely', label: 'Rarely or never', emoji: '✨', subtext: 'Eyes feel comfortable daily', points: 25 },
      { id: 'occasional', label: 'Occasional mild tired eyes', emoji: '👁️', subtext: 'Noticeable after full days', points: 18 },
      { id: 'regular', label: 'Regular strain or dull ache', emoji: '👓', subtext: 'Dryness or strain mid-week', points: 10 },
      { id: 'frequent', label: 'Frequent discomfort', emoji: '⚡', subtext: 'Interferes with my daily tasks', points: 4 }
    ]
  },
  {
    id: 'q9',
    partIndex: 3,
    partTitle: 'Body & Focus',
    partEmoji: '🎯',
    type: 'single-cards',
    title: 'How long can you focus on one deep task without checking a screen?',
    options: [
      { id: 'deep', label: 'Over 1 hour with ease', emoji: '🎯', subtext: 'Deep sustained attention', points: 25 },
      { id: 'moderate', label: '30 to 45 minutes', emoji: '⏳', subtext: 'Comfortable steady focus chunks', points: 20 },
      { id: 'short', label: '10 to 20 minutes', emoji: '⏱️', subtext: 'Urge to check arises quickly', points: 12 },
      { id: 'distracted', label: 'Under 10 minutes', emoji: '⚡', subtext: 'Easily pulled into distraction', points: 5 }
    ]
  },
  {
    id: 'q10',
    partIndex: 3,
    partTitle: 'Body & Focus',
    partEmoji: '🎯',
    type: 'single-cards',
    title: 'What does your break rhythm look like during extended screen sessions?',
    options: [
      { id: 'frequent', label: 'Brief pause every 20–30 mins', emoji: '🚶', subtext: 'Look away, stand up, move', points: 25 },
      { id: 'hourly', label: 'Stretch every hour or two', emoji: '☕', subtext: 'Step away for water or tea', points: 19 },
      { id: 'seldom', label: 'Seldom pause until done', emoji: '🕒', subtext: 'Only break when session ends', points: 10 },
      { id: 'nonstop', label: 'Non-stop for hours', emoji: '🛑', subtext: 'Glued in place without shifting', points: 4 }
    ]
  }
];

export function isQuestionAnswered(_q: Question, value: string | number | string[] | undefined): boolean {
  if (value === undefined || value === null) return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
}

function calculateQuestionScore(q: Question, value: string | number | string[] | undefined): number | null {
  if (!isQuestionAnswered(q, value)) {
    return null; // Skipped questions contribute nothing
  }

  if (q.type === 'slider') {
    const hours = typeof value === 'number' ? value : parseFloat(String(value));
    if (isNaN(hours)) return null;
    if (hours <= 3) return 25;
    if (hours <= 5) return 21;
    if (hours <= 7) return 17;
    if (hours <= 9) return 12;
    if (hours <= 12) return 7;
    return 3;
  }

  if (q.type === 'multi-chips') {
    const arr = Array.isArray(value) ? value : [];
    if (arr.length === 0) return null;
    if (arr.length === 1) return 25;
    if (arr.length === 2) return 22;
    if (arr.length === 3) return 16;
    return 10;
  }

  if (q.type === 'scale-1-to-5') {
    const val = parseInt(String(value), 10);
    if (val === 5) return 25;
    if (val === 4) return 21;
    if (val === 3) return 17;
    if (val === 2) return 11;
    if (val === 1) return 5;
    return null;
  }

  const opt = q.options?.find(o => o.id === value);
  return opt ? opt.points : null;
}

export function calculateReport(answers: AnswersState): ScoreReport {
  const partQuestions: Question[][] = [[], [], [], []];
  QUESTIONS.forEach(q => {
    partQuestions[q.partIndex].push(q);
  });

  let totalAnsweredCount = 0;
  let totalAnsweredPointsSum = 0;

  const partScores: PartScore[] = partQuestions.map((qList, pIdx) => {
    let partPointsSum = 0;
    let partAnswered = 0;

    const questionResults = qList.map(q => {
      const val = answers[q.id];
      const answered = isQuestionAnswered(q, val);
      const pts = calculateQuestionScore(q, val);
      if (pts !== null) {
        partPointsSum += pts;
        partAnswered++;
        totalAnsweredCount++;
        totalAnsweredPointsSum += pts;
      }
      return {
        questionId: q.id,
        title: q.title,
        statusText: answered ? formatAnswerForSummary(q, val) : 'Skipped',
        isSkipped: !answered
      };
    });

    const hasAnswered = partAnswered > 0;
    const avgScore = hasAnswered ? Math.round(partPointsSum / partAnswered) : 0;
    const clampedScore = Math.max(0, Math.min(25, avgScore));

    const rules = [
      'Daily screen hours & device variety',
      'Intentional app use & scrolling impulse',
      'Pre-sleep wind down & restfulness',
      'Eye recovery rhythm & single-task focus'
    ];

    return {
      partIndex: pIdx,
      title: PART_NAMES[pIdx].title,
      emoji: PART_NAMES[pIdx].emoji,
      score: clampedScore,
      maxScore: 25,
      ruleHint: rules[pIdx],
      answeredCount: partAnswered,
      totalQuestions: qList.length,
      hasAnswered,
      questionResults
    };
  });

  const totalQuestions = QUESTIONS.length; // 10
  const isPartial = totalAnsweredCount < 5;

  let totalScore = 0;
  if (totalAnsweredCount > 0) {
    // Score is scaled to 100 across answered questions only (each worth up to 25 pts)
    const maxPossiblePoints = totalAnsweredCount * 25;
    totalScore = Math.max(0, Math.min(100, Math.round((totalAnsweredPointsSum / maxPossiblePoints) * 100)));
  }

  let band: ScoreBand = 'Balanced';
  let bandEmoji = '⚖️';
  let bandDescription = '';
  let verdictLine = '';

  if (isPartial) {
    band = 'Incomplete';
    bandEmoji = '🏆';
    bandDescription = `Not enough answers for a full score. Answer at least 5 of 10 questions to receive your Screen Balance score.`;
    verdictLine = `Score based on ${totalAnsweredCount} of 10 questions. Retake with all questions answered for a complete habits diagnosis.`;
  } else {
    bandEmoji = '🏆';
    if (totalScore >= 80) {
      band = 'Thriving';
      bandDescription = 'Excellent balance. Your screen habits support your energy and clarity.';
    } else if (totalScore >= 60) {
      band = 'Balanced';
      bandDescription = 'Good foundation. A few minor tweaks will elevate your daily focus.';
    } else if (totalScore >= 40) {
      band = 'Strained';
      bandDescription = 'Noticeable digital fatigue. Screen time is cutting into rest and focus.';
    } else {
      band = 'Overloaded';
      bandDescription = 'High screen overload. Your eyes, sleep, and mental clarity need recovery.';
    }

    // Weakest part is determined from answered parts only
    const answeredParts = partScores.filter(p => p.hasAnswered);
    const sortedByScore = [...answeredParts].sort((a, b) => a.score - b.score);
    const weakestPart = sortedByScore[0] || partScores[0];

    if (totalScore >= 80 && sortedByScore.every(p => p.score >= 20)) {
      verdictLine = 'Thriving habit balance across all areas. Continue protecting your screen-free evenings and intentional unlocks.';
    } else if (weakestPart.partIndex === 2) {
      verdictLine = 'Weakest area: Night & Sleep. Fix: Shut screens off 30 minutes before bed to allow melatonin rise and deeper sleep.';
    } else if (weakestPart.partIndex === 1) {
      verdictLine = 'Weakest area: Apps & Scrolling. Fix: Put your top distraction app in a folder to break unconscious autopilot unlocks.';
    } else if (weakestPart.partIndex === 3) {
      verdictLine = 'Weakest area: Body & Focus. Fix: Practice the 20-20-2 eye recovery rule and stretch during unbroken screen stretches.';
    } else {
      verdictLine = 'Weakest area: Devices & Time. Fix: Anchor meals and daily commutes as device-free zones to ease continuous hours.';
    }
  }

  const answeredParts = partScores.filter(p => p.hasAnswered);
  const sortedParts = [...answeredParts].sort((a, b) => a.score - b.score);
  const weakestPartTitle = sortedParts[0]?.title || 'Screen Balance';

  const recommendations = getTopRecommendations(answers, partScores);

  return {
    totalScore,
    band,
    bandEmoji,
    bandDescription,
    verdictLine,
    weakestPartTitle,
    partScores,
    recommendations,
    answeredCount: totalAnsweredCount,
    totalQuestions,
    isPartial,
    slogan: APP_SLOGAN
  };
}

function getTopRecommendations(answers: AnswersState, partScores: PartScore[]): Recommendation[] {
  const answeredParts = partScores.filter(p => p.hasAnswered);
  const sortedParts = [...answeredParts].sort((a, b) => a.score - b.score);
  const picked: Recommendation[] = [];

  const candidates: { [key: string]: Recommendation } = {
    windDown: {
      id: 'wind_down',
      title: 'Digital Sunset Buffer',
      action: 'Turn screens off 30 minutes before sleep to allow your natural melatonin to rise.',
      tinyFirstStep: 'Charge your phone across the room tonight instead of your bedside table.',
      icon: '🌙'
    },
    autopilotPause: {
      id: 'autopilot_pause',
      title: '10-Second Intentional Pause',
      action: 'Break unconscious unlocking habits by naming your reason before touching the screen.',
      tinyFirstStep: 'Place your top distraction app inside a folder on your second home screen.',
      icon: '🍃'
    },
    rule20202: {
      id: 'rule_20202',
      title: '20-20-2 Eye Recovery',
      action: 'Every 20 minutes, gaze at an object 20 feet away for 20 seconds to relax eye muscles.',
      tinyFirstStep: 'Take one deep breath and look out the nearest window right after this screen.',
      icon: '👁️'
    },
    standingBreak: {
      id: 'standing_break',
      title: 'Hourly Posture Reset',
      action: 'Break long unbroken stretches by standing up and rolling your shoulders every hour.',
      tinyFirstStep: 'Stand up and refill a fresh glass of water before continuing your next task.',
      icon: '🧘'
    },
    screenCap: {
      id: 'screen_cap',
      title: 'Screen-Free Meal Routine',
      action: 'Protect meal times as a device-free oasis to ease continuous daily screen load.',
      tinyFirstStep: 'Leave your phone face down in another room during your next meal.',
      icon: '🍽️'
    },
    singleFocus: {
      id: 'single_focus',
      title: 'Single-Device Work Focus',
      action: 'Close secondary screens or streaming sidecars while completing primary deep work.',
      tinyFirstStep: 'Keep only your primary task window open on your screen today.',
      icon: '💻'
    }
  };

  const q6 = answers['q6'];
  const q5 = answers['q5'];
  const q4 = answers['q4'];
  const q8 = answers['q8'];
  const q10 = answers['q10'];
  const q1 = typeof answers['q1'] === 'number' ? answers['q1'] : null;

  for (const part of sortedParts) {
    if (picked.length >= 3) break;

    if (part.partIndex === 2) {
      if ((q6 === 'until_lights' || q6 === 'fall_asleep' || q5 === 'every_night') && !picked.find(p => p.id === 'wind_down')) {
        picked.push(candidates.windDown);
      }
    } else if (part.partIndex === 1) {
      if ((q4 === 'constantly' || q4 === 'frequently') && !picked.find(p => p.id === 'autopilot_pause')) {
        picked.push(candidates.autopilotPause);
      }
    } else if (part.partIndex === 3) {
      if ((q8 === 'regular' || q8 === 'frequent') && !picked.find(p => p.id === 'rule_20202')) {
        picked.push(candidates.rule20202);
      } else if ((q10 === 'seldom' || q10 === 'nonstop') && !picked.find(p => p.id === 'standing_break')) {
        picked.push(candidates.standingBreak);
      }
    } else if (part.partIndex === 0) {
      if (q1 !== null && q1 > 8 && !picked.find(p => p.id === 'screen_cap')) {
        picked.push(candidates.screenCap);
      } else if (!picked.find(p => p.id === 'single_focus')) {
        picked.push(candidates.singleFocus);
      }
    }
  }

  const fallbackList = [
    candidates.windDown,
    candidates.rule20202,
    candidates.autopilotPause,
    candidates.standingBreak,
    candidates.screenCap,
    candidates.singleFocus
  ];

  for (const item of fallbackList) {
    if (picked.length >= 3) break;
    if (!picked.find(p => p.id === item.id)) {
      picked.push(item);
    }
  }

  return picked.slice(0, 3);
}

export function formatAnswerForSummary(q: Question, value: string | number | string[] | undefined): string {
  if (value === undefined || value === null) {
    return 'Skipped';
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return 'Skipped';
    return value.map(id => {
      const opt = q.options?.find(o => o.id === id);
      return opt ? opt.label : id;
    }).join(', ');
  }
  if (typeof value === 'string' && value.trim() === '') {
    return 'Skipped';
  }
  if (q.type === 'slider') {
    const num = typeof value === 'number' ? value : parseFloat(String(value));
    if (isNaN(num)) return 'Skipped';
    return `${num} hours/day`;
  }
  if (q.type === 'scale-1-to-5') {
    return `${value} / 5 stars`;
  }
  const opt = q.options?.find(o => o.id === value);
  return opt ? opt.label : String(value);
}

export function getGamificationLevel(xp: number): { level: string; minXP: number; maxXP: number } {
  if (xp >= 90) return { level: 'Finisher', minXP: 90, maxXP: 100 };
  if (xp >= 60) return { level: 'Focused', minXP: 60, maxXP: 89 };
  if (xp >= 30) return { level: 'Explorer', minXP: 30, maxXP: 59 };
  return { level: 'Starter', minXP: 0, maxXP: 29 };
}

