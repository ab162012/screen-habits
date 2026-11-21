export type AnswerType = 'slider' | 'multi-chips' | 'single-cards' | 'scale-1-to-5';

export interface QuestionOption {
  id: string;
  label: string;
  emoji?: string;
  subtext?: string;
  points: number; // 0 to 25 scale
}

export interface Question {
  id: string;
  partIndex: number; // 0: Devices & Time, 1: Apps & Scrolling, 2: Night & Sleep, 3: Body & Focus
  partTitle: string;
  partEmoji: string;
  type: AnswerType;
  title: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: QuestionOption[];
}

export interface AnswersState {
  [questionId: string]: string | number | string[] | undefined;
}

export type ScoreBand = 'Thriving' | 'Balanced' | 'Strained' | 'Overloaded' | 'Incomplete';

export interface PartScore {
  partIndex: number;
  title: string;
  emoji: string;
  score: number; // 0 to 25
  maxScore: number; // 25
  ruleHint: string;
  answeredCount: number;
  totalQuestions: number;
  hasAnswered: boolean;
  questionResults: {
    questionId: string;
    title: string;
    statusText: string;
    isSkipped: boolean;
  }[];
}

export interface Recommendation {
  id: string;
  title: string;
  action: string;
  tinyFirstStep: string;
  icon: string;
}

export interface ScoreReport {
  totalScore: number; // 0 to 100 (scaled across answered questions only)
  band: ScoreBand;
  bandEmoji: string;
  bandDescription: string;
  verdictLine: string; // Specific to weakest part
  weakestPartTitle: string;
  partScores: PartScore[];
  recommendations: Recommendation[]; // exactly top 3
  answeredCount: number;
  totalQuestions: number;
  isPartial: boolean; // true if answeredCount < 5
  slogan: string; // "Know your screen. Own your time."
}

export interface UserProfile {
  name: string;
  classSection: string;
}

export type ArticleCategory = 'Sleep' | 'Eyes' | 'Focus' | 'Body' | 'Mind' | 'Routines' | 'Expert' | 'Team';

/**
 * ONE article shape for the whole site (merged 2026-11-21): the 7
 * guides (kind 'guide') and the 6 health topics (kind 'topic') live
 * in the same store, src/data/articles.ts. Words moved, not rewritten.
 * - minutes: words in the body (intro + step headings + step details
 *   + Try-one-thing label and text) divided by 200, rounded up.
 * - summary: guides keep their summary; topics carry their intro as
 *   their summary (they never had one).
 * - tryOneThing: guides carry their old closing line (label "Try one
 *   thing"); topics carry their old "Practical steps" section, heading
 *   kept as the label, detail as the text.
 * - sources: only the titles each piece names in its own text; an
 *   empty list means the detail page shows no sources footer.
 * - related: the pieces' own cross-references (e.g. a topic's "Read
 *   the full guide" line), as links to the paired piece.
 */
export interface Article {
  id: string;
  slug: string;
  title: string;
  kind: 'guide' | 'topic';
  category: ArticleCategory;
  emoji: string;
  minutes: number;
  summary: string;
  intro: string;
  steps: {
    heading: string;
    detail: string;
  }[];
  tryOneThing: {
    label: string;
    text: string;
  };
  sources: string[];
  related: {
    slug: string;
    label: string;
  }[];
}

export type ChallengeType = 'breaks' | 'cutoff';

export interface ChallengePledge {
  type: ChallengeType;
  title: string;
  description: string;
  startDay: string;
}
