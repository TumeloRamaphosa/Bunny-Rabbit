"use client";

import type {
  ChecklistItem,
  CoupleGoal,
  FitnessWeekLog,
  FoodDayLog,
  ItineraryItem,
  LockInEntry,
  WellnessMarker,
} from "./types";
import { EMPTY_LOCK_IN } from "./types";
import { mondayOfWeek } from "./format";
import {
  SEED_CHECKLIST,
  SEED_ITINERARY,
} from "./seed";

const KEYS = {
  itinerary: "bunny-rabbit:itinerary",
  checklist: "bunny-rabbit:checklist",
  notes: "bunny-rabbit:shared-notes",
  wellness: "bunny-rabbit:wellness-private",
  villasShortlist: "bunny-rabbit:villa-shortlist",
  lockIn: "bunny-rabbit:lockin-v1",
  lockInTherapy: "bunny-rabbit:lockin-therapy-private-v1",
  fitness: "bunny-rabbit:fitness-v1",
  food: "bunny-rabbit:food-v1",
  coupleGoals: "bunny-rabbit:couple-goals-v1",
} as const;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadItinerary(): ItineraryItem[] {
  const stored = readJson<ItineraryItem[] | null>(KEYS.itinerary, null);
  if (stored && stored.length > 0) return stored;
  return SEED_ITINERARY;
}

export function saveItinerary(items: ItineraryItem[]): void {
  writeJson(KEYS.itinerary, items);
}

export function loadChecklist(): ChecklistItem[] {
  const stored = readJson<ChecklistItem[] | null>(KEYS.checklist, null);
  if (stored && stored.length > 0) return stored;
  return SEED_CHECKLIST;
}

export function saveChecklist(items: ChecklistItem[]): void {
  writeJson(KEYS.checklist, items);
}

export function loadSharedNotes(): string {
  return readJson<string>(KEYS.notes, "");
}

export function saveSharedNotes(notes: string): void {
  writeJson(KEYS.notes, notes);
}

export function loadWellness(): WellnessMarker[] {
  return readJson<WellnessMarker[]>(KEYS.wellness, []);
}

export function saveWellness(markers: WellnessMarker[]): void {
  writeJson(KEYS.wellness, markers);
}

export function loadVillaShortlist(): string[] {
  return readJson<string[]>(KEYS.villasShortlist, []);
}

export function saveVillaShortlist(ids: string[]): void {
  writeJson(KEYS.villasShortlist, ids);
}

type LockInStore = Record<string, LockInEntry>;

export function loadLockInEntry(date: string): LockInEntry {
  const store = readJson<LockInStore>(KEYS.lockIn, {});
  const existing = store[date];
  if (existing) return existing;
  return { date, ...EMPTY_LOCK_IN };
}

export function saveLockInEntry(entry: LockInEntry): void {
  const store = readJson<LockInStore>(KEYS.lockIn, {});
  store[entry.date] = entry;
  writeJson(KEYS.lockIn, store);
}

type TherapyNotesStore = Record<string, string>;

export function loadLockInTherapyNote(date: string): string {
  const store = readJson<TherapyNotesStore>(KEYS.lockInTherapy, {});
  return store[date] ?? "";
}

export function saveLockInTherapyNote(date: string, note: string): void {
  const store = readJson<TherapyNotesStore>(KEYS.lockInTherapy, {});
  store[date] = note;
  writeJson(KEYS.lockInTherapy, store);
}

type FitnessStore = Record<string, FitnessWeekLog>;

export function defaultFitnessWeek(weekStart: string): FitnessWeekLog {
  return {
    weekStart,
    weightSessions: [false, false],
    walks: [false, false, false],
  };
}

export function loadFitnessWeek(weekStart: string): FitnessWeekLog {
  const store = readJson<FitnessStore>(KEYS.fitness, {});
  return store[weekStart] ?? defaultFitnessWeek(weekStart);
}

export function saveFitnessWeek(log: FitnessWeekLog): void {
  const store = readJson<FitnessStore>(KEYS.fitness, {});
  store[log.weekStart] = log;
  writeJson(KEYS.fitness, store);
}

export function loadAllFitnessWeeks(): FitnessStore {
  return readJson<FitnessStore>(KEYS.fitness, {});
}

export function isFitnessWeekComplete(log: FitnessWeekLog): boolean {
  return (
    log.weightSessions.every(Boolean) && log.walks.every(Boolean)
  );
}

/** Consecutive complete weeks ending at the week containing `anchor`. */
export function fitnessWeekStreak(
  store: FitnessStore,
  anchor: Date = new Date(),
): number {
  let streak = 0;
  let week = mondayOfWeek(anchor);
  for (let i = 0; i < 104; i++) {
    const log = store[week] ?? defaultFitnessWeek(week);
    if (!isFitnessWeekComplete(log)) break;
    streak++;
    const [y, m, d] = week.split("-").map(Number);
    const prev = new Date(y, m - 1, d);
    prev.setDate(prev.getDate() - 7);
    week = mondayOfWeek(prev);
  }
  return streak;
}

type FoodStore = Record<string, FoodDayLog>;

const EMPTY_FOOD: Omit<FoodDayLog, "date"> = {
  breakfast: "",
  lunch: "",
  dinner: "",
  snacks: "",
  notes: "",
};

export function loadFoodDay(date: string): FoodDayLog {
  const store = readJson<FoodStore>(KEYS.food, {});
  const existing = store[date];
  if (existing) return existing;
  return { date, ...EMPTY_FOOD };
}

export function saveFoodDay(log: FoodDayLog): void {
  const store = readJson<FoodStore>(KEYS.food, {});
  store[log.date] = log;
  writeJson(KEYS.food, store);
}

export function loadCoupleGoals(): CoupleGoal[] {
  return readJson<CoupleGoal[]>(KEYS.coupleGoals, []);
}

export function saveCoupleGoals(goals: CoupleGoal[]): void {
  writeJson(KEYS.coupleGoals, goals);
}

/** Stub: parse simple CSV lines `date,label,type` */
export function parseWellnessCsv(text: string): WellnessMarker[] {
  const lines = text.trim().split(/\r?\n/);
  const out: WellnessMarker[] = [];
  for (const line of lines) {
    if (!line || line.startsWith("date,")) continue;
    const [date, label, typeRaw] = line.split(",").map((s) => s.trim());
    if (!date || !label) continue;
    const type =
      typeRaw === "cycle" || typeRaw === "wellness" || typeRaw === "note"
        ? typeRaw
        : "wellness";
    out.push({
      id: `import-${date}-${Math.random().toString(36).slice(2, 8)}`,
      date,
      label,
      type,
    });
  }
  return out;
}

/** Stub: minimal ICS — extracts DTSTART + SUMMARY per VEVENT */
export function parseWellnessIcs(text: string): WellnessMarker[] {
  const out: WellnessMarker[] = [];
  const events = text.split("BEGIN:VEVENT");
  for (const block of events.slice(1)) {
    const dt = block.match(/DTSTART[^:]*:([0-9]{8})/);
    const summary = block.match(/SUMMARY:([^\r\n]+)/);
    if (!dt || !summary) continue;
    const y = dt[1].slice(0, 4);
    const m = dt[1].slice(4, 6);
    const d = dt[1].slice(6, 8);
    out.push({
      id: `ics-${y}${m}${d}-${Math.random().toString(36).slice(2, 8)}`,
      date: `${y}-${m}-${d}`,
      label: summary[1].trim(),
      type: "wellness",
    });
  }
  return out;
}
