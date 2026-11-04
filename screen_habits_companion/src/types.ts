export interface ReminderSettings {
  breaksEnabled: boolean;
  breakInterval: number; // in minutes: 30, 50, 60, 90
  bedtimeEnabled: boolean;
  bedtimeTime: string; // "22:30"
  morningEnabled: boolean;
  morningTime: string; // "08:30"
  weeklyEnabled: boolean;
  quietHoursStart: string; // default "22:00"
  quietHoursEnd: string; // default "08:00"
  permissionAsked: boolean;
  permissionGranted: boolean;
}

export interface CheckInRecord {
  date: string; // "YYYY-MM-DD"
  answerId: string;
  answerLabel: string;
  emoji: string;
  timestamp: number;
}

export interface WebScoreRecord {
  score: number;
  band: string;
  date: string;
}

export interface NotificationLog {
  timestamp: number;
  type: 'break' | 'bedtime' | 'morning' | 'weekly';
  title: string;
  body: string;
}

export type ActiveTab = 'home' | 'reminders' | 'summary' | 'checkin' | 'about';
