export type Guest = "Tumelo" | "Katlego" | "Sister" | "Sister's BF";

export interface TripMeta {
  destination: string;
  startDate: string;
  endDate: string;
  guests: Guest[];
  villaRequirement: string;
}

export interface ItineraryItem {
  id: string;
  date: string;
  title: string;
  time?: string;
  location?: string;
  notes?: string;
}

export interface VillaOption {
  id: string;
  name: string;
  area: string;
  bedrooms: number;
  budgetZarMin: number;
  budgetZarMax: number;
  peakEstimateZar: number;
  nights: number;
  url: string;
  notes?: string;
  confirmFourBr?: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  assignee?: Guest;
}

export interface WellnessMarker {
  id: string;
  date: string;
  label: string;
  type: "cycle" | "wellness" | "note";
}

export const TRIP: TripMeta = {
  destination: "Phuket, Thailand",
  startDate: "2026-12-15",
  endDate: "2026-12-22",
  guests: ["Tumelo", "Katlego", "Sister", "Sister's BF"],
  villaRequirement: "4BR villa with private pool",
};

export const TRIP_HIGHLIGHT_START = "2026-12-15";
export const TRIP_HIGHLIGHT_END = "2026-12-22";

/** Family OS — lock-in diary entry (shared fields; therapy is separate). */
export interface LockInEntry {
  date: string;
  overview: string;
  agentsBlock: string;
  coupleFitnessBlock: string;
  diaryTomorrow: string;
}

export const EMPTY_LOCK_IN: Omit<LockInEntry, "date"> = {
  overview: "",
  agentsBlock: "",
  coupleFitnessBlock: "",
  diaryTomorrow: "",
};

/** Weekly fitness targets: 2 weight sessions + 3 one-hour walks. */
export interface FitnessWeekLog {
  weekStart: string;
  weightSessions: [boolean, boolean];
  walks: [boolean, boolean, boolean];
}

export interface FoodDayLog {
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  notes: string;
}

export interface CoupleGoal {
  id: string;
  title: string;
  done: boolean;
  checkIns: { date: string; note: string }[];
}
