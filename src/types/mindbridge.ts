export type MoodType =
  | "HAPPY"
  | "SAD"
  | "ANXIOUS"
  | "ANGRY"
  | "CALM"
  | "NEUTRAL"
  | "OVERWHELMED"
  | "HOPEFUL"
  | "LONELY"
  | "FEARFUL";

export type MoodEntry = {
  id: string;
  userId: string;
  value: number;
  moodType: MoodType | null;
  intensity: number | null;
  note: string | null;
  sleepScore: number | null;
  energyScore: number | null;
  createdAt: string; // ISO string from JSON response
};

export type MoodSummary = {
  totalEntries: number;
  averageIntensity: number;
  averageValue: number;
  averageSleepScore: number | null;
  averageEnergyScore: number | null;
  moodDistribution: Record<string, number>;
  currentStreak: number;
};

export type WeeklyTrendPoint = {
  date: string;
  label: string;         // "Mon", "Tue", etc.
  average: number | null;
  count: number;
};

// ── Analysis ─────────────────────────────────────────────────

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRISIS";

export type MessageAnalysis = {
  id: string;
  messageId: string;
  emotion: string;
  intensity: number;
  riskLevel: RiskLevel;
  createdAt: string;
};

export type EmotionFrequency = {
  emotion: string;
  count: number;
  percentage: number;
};

export type StressScore = {
  score: number;
  label: "Low" | "Moderate" | "High" | "Critical";
  trend: "up" | "down" | "stable";
};

// ── Insights ─────────────────────────────────────────────────

export type WeeklyInsight = {
  id: string;
  userId: string;
  weekStart: string;
  content: string;
  tags: string[];
  generatedAt: string;
};

// ── Specialists ──────────────────────────────────────────────

export type ConsultationType = "virtual" | "physical" | "both";

export type Specialist = {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  yearsOfExperience: number;
  location: string;
  languages: string[];
  email: string | null;
  phone: string | null;
  imageUrl: string | null;
  rating: number;
  availability: string;
  consultationType: ConsultationType;
  tags: string[];
  verified: boolean;
  createdAt: string;
};

export type RecommendationResult = {
  specialists: Specialist[];
  reason: string;
};

// ── Dashboard ────────────────────────────────────────────────

export type DashboardData = {
  moodSummary: MoodSummary;
  weeklyTrend: WeeklyTrendPoint[];
  recentMoodEntries: MoodEntry[];
  stressScore: StressScore;
  dominantEmotions: string[];
  latestInsight: WeeklyInsight | null;
  recentSessions: { id: string; title: string | null; updatedAt: string }[];
  recommendedSpecialists: Specialist[];
  recommendationReason: string;
};
