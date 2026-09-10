import { ClientScope } from '../../models/client-detail.model';

export interface MeasurementPoint { value: number; date: string; sourceId?: string; }
export interface MeasurementBaseline extends MeasurementPoint {
  key: string; source?: string; confirmedAt?: string; confirmedBy?: string;
}
export type BaselineStatus = 'missing' | 'valid' | 'source_changed' | 'source_missing';
export interface BodyComparison {
  initial: MeasurementBaseline | null;
  last: MeasurementPoint | null;
  delta: number | null;
  baselineStatus: BaselineStatus;
}
export interface OverviewPerimeter extends BodyComparison { key: string; label: string; unit: string; }
export interface OverviewWeek { start: string; end: string; average: number | null; count: number; partial: boolean; }
export interface OverviewBody {
  today: string;
  weight: BodyComparison & { weekly: OverviewWeek[] };
  perimeters: OverviewPerimeter[];
  availablePerimeters: { key: string; label: string; unit: string }[];
  latestMeasuredOn: string | null;
}
export interface OverviewContextValues {
  goals: string;
  healthConditions: string;
  experienceLevel: string | null;
  availability: string;
  trainingLocation: string | null;
  equipment: string;
  equipmentTags: string[];
  customAnswers: { questionId: string; label: string; value: string }[];
}
export interface OverviewContext {
  version: number;
  updatedAt: string | null;
  updatedBy: string | null;
  values: OverviewContextValues;
}
export interface OverviewIdentity {
  name: string; lastname: string; birth: string | null; sex: number | null;
  heightCm: number | null; height?: number | null; age?: number | null; profileVersion: string; scopes?: ClientScope[];
}
export interface OverviewStage {
  id: string; startedAt: string | null; endedAt: string | null;
  status?: string; legacy?: boolean; current?: boolean; startEstimated?: boolean;
}
export interface OverviewNote {
  _id: string; text: string; pinned: boolean; createdAt: string; updatedAt?: string; version: number;
}
export interface OverviewTask {
  _id: string; title: string; notes: string; dueDate: string | null;
  status: 'pending' | 'done'; createdAt: string; completedAt: string | null; version?: number;
}
export interface OverviewReview {
  _id: string; createdAt: string; conclusion: string; nextStep: string;
  linkedTaskId?: string | null; observedFingerprint?: string;
  correctsReviewId?: string | null;
}
export interface IntakeAnswer { key: string; label: string; value: unknown; unit?: string; date?: string; }
export interface OverviewIntake {
  available: boolean; legacy: boolean; submittedAt: string | null;
  missingMeasurements: string[];
  answers?: Record<string, unknown>;
  responses?: IntakeAnswer[];
  measurements?: {field: string; value: number; date: string}[];
  missingFields?: string[];
  questions?: {key: string; label: string; unit?: string; hint?: string}[];
  nutrition?: Record<string, unknown> | null;
  note?: string;
  complements?: MeasurementBaseline[];
  snapshot?: Record<string, unknown> | null;
}
export interface ClientOverview {
  identity: OverviewIdentity;
  stage: OverviewStage;
  stages: OverviewStage[];
  context: OverviewContext;
  intake: OverviewIntake;
  body: OverviewBody | null;
  settings: { version: number; highlightedPerimeters: string[] };
  pinnedNotes: OverviewNote[];
  tasks: { items: OverviewTask[]; total: number };
  review: { latest: OverviewReview | null; hasNewData: boolean; observedFingerprint: string; observedAt?: string; coverage?: string[] };
  sectionsErrors: Record<string, string>;
  scopes?: ClientScope[];
  readOnly?: boolean;
  nutrition?: {values: OverviewNutrition; version: string} | null;
  wellbeing?: {key: string; label: string; value: unknown; displayValue: string; recordedAt: string; requestId: string}[];
  checkins?: { pendingReviewCount: number; waitingResponseCount: number; overdueResponseCount?: number; lastResponseAt: string | null };
}
export interface OverviewList<T> { items: T[]; total: number; nextOffset: number | null; }

export interface OverviewNutrition { allergies: string; favoriteFoods: string; dislikedFoods: string; cooksAtHome: 'yes' | 'no' | 'sometimes' | null; }
export type OverviewEditor = 'context' | 'profile' | 'nutrition' | 'note' | 'task' | 'review' | 'perimeters' | 'measurement' | 'baseline';
