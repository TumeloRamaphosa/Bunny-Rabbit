"use client";

import { useEffect, useState } from "react";
import type { LockInEntry } from "@/lib/types";
import { formatDisplayDate, todayYmd } from "@/lib/format";
import {
  loadLockInEntry,
  loadLockInTherapyNote,
  saveLockInEntry,
  saveLockInTherapyNote,
} from "@/lib/storage";

const AGENDA = [
  {
    key: "overview" as const,
    title: "1 · Couple-goals overview",
    hint: "~5 min — where we are this week",
    field: "overview" as keyof LockInEntry,
  },
  {
    key: "agents",
    title: "2 · Agents (~20 min)",
    hint: "Goals, procedures, blockers",
    field: "agentsBlock" as keyof LockInEntry,
  },
  {
    key: "couple",
    title: "3 · Couple, fitness & therapy (~20 min)",
    hint: "Shared notepad — therapy detail goes in the private box below",
    field: "coupleFitnessBlock" as keyof LockInEntry,
  },
  {
    key: "diary",
    title: "4 · Diary & tomorrow",
    hint: "Capture the day + align on tomorrow",
    field: "diaryTomorrow" as keyof LockInEntry,
  },
];

export function LockInDiary() {
  const [date, setDate] = useState(todayYmd);
  const [entry, setEntry] = useState<LockInEntry>(() => loadLockInEntry(todayYmd()));
  const [therapy, setTherapy] = useState("");

  useEffect(() => {
    setEntry(loadLockInEntry(date));
    setTherapy(loadLockInTherapyNote(date));
  }, [date]);

  function updateField(field: keyof LockInEntry, value: string) {
    const next = { ...entry, date, [field]: value };
    setEntry(next);
  }

  function persistEntry() {
    saveLockInEntry({ ...entry, date });
  }

  function persistTherapy() {
    saveLockInTherapyNote(date, therapy);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-xl bg-coral-400/15 border border-coral-400/40 p-4 text-sm text-sand-800">
        <p className="font-display text-lg text-sand-900">19:00 lock-in</p>
        <p className="mt-2 font-medium">
          Laptops + notepads only — no phones, no WhatsApp.
        </p>
        <p className="mt-1 text-sand-700">
          One hour together (or on video). Phones stay in another room.
        </p>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-sand-900">Session date</span>
        <input
          type="date"
          className="mt-2 w-full sm:w-auto rounded-lg border border-sand-200 bg-white px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <span className="block mt-1 text-sand-500">{formatDisplayDate(date)}</span>
      </label>

      <div className="space-y-5">
        {AGENDA.map((block) => (
          <div
            key={block.key}
            className="rounded-xl bg-white border border-sand-200 p-4 shadow-sm"
          >
            <h3 className="font-medium text-sand-900">{block.title}</h3>
            <p className="text-xs text-sand-500 mt-0.5">{block.hint}</p>
            <textarea
              className="mt-3 w-full min-h-[100px] rounded-lg border border-sand-200 p-3 text-sm"
              value={entry[block.field] as string}
              onChange={(e) => updateField(block.field, e.target.value)}
              onBlur={persistEntry}
              placeholder="Notepad…"
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-lagoon-50 border border-lagoon-100 p-4 space-y-3">
        <div>
          <h3 className="font-medium text-lagoon-900">
            Therapy / counselling (private)
          </h3>
          <p className="text-xs text-lagoon-800/90 mt-1">
            Stored separately on this device only — not mixed into shared couple
            notes. Never synced to a server.
          </p>
        </div>
        <textarea
          className="w-full min-h-[100px] rounded-lg border border-lagoon-200 bg-white p-3 text-sm"
          value={therapy}
          onChange={(e) => setTherapy(e.target.value)}
          onBlur={persistTherapy}
          placeholder="Private reflections from the session block…"
        />
      </div>

      <p className="text-xs text-sand-500 text-center">
        Saves automatically when you leave a field. localStorage v1.
      </p>
    </section>
  );
}
