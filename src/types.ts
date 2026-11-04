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

export interface Article {
  id: string;
  slug: string;
  title: string;
  topicTag: string;
  readTime: string;
  emoji: string;
  summary: string;
  intro: string;
  steps: {
    heading: string;
    detail: string;
  }[];
  closingLine: string;
}

export type ChallengeType = 'breaks' | 'cutoff';

export interface ChallengePledge {
  type: ChallengeType;
  title: string;
  description: string;
  startDay: string;
}
