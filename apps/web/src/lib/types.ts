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
