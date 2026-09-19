"use client";

import type { ChecklistItem, ItineraryItem, WellnessMarker } from "./types";
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
