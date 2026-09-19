"use client";

import { useState } from "react";
import type { FitnessWeekLog } from "@/lib/types";
import { addDaysYmd, formatDisplayDate, mondayOfWeek } from "@/lib/format";
import {
  fitnessWeekStreak,
  loadAllFitnessWeeks,
  loadFitnessWeek,
  saveFitnessWeek,
} from "@/lib/storage";

function weekLabel(weekStart: string): string {
  const end = addDaysYmd(weekStart, 6);
  return `${formatDisplayDate(weekStart)} – ${formatDisplayDate(end)}`;
}

export function FitnessTracker() {
  const [weekStart, setWeekStart] = useState(() => mondayOfWeek());
  const [log, setLog] = useState<FitnessWeekLog>(() => loadFitnessWeek(mondayOfWeek()));

  const streak = fitnessWeekStreak(loadAllFitnessWeeks());

  function selectWeek(start: string) {
    setWeekStart(start);
    setLog(loadFitnessWeek(start));
  }

  function persist(next: FitnessWeekLog) {
    setLog(next);
    saveFitnessWeek(next);
  }

  function toggleWeight(index: 0 | 1) {
    const sessions = [...log.weightSessions] as [boolean, boolean];
    sessions[index] = !sessions[index];
    persist({ ...log, weightSessions: sessions });
  }

  function toggleWalk(index: 0 | 1 | 2) {
    const walks = [...log.walks] as [boolean, boolean, boolean];
    walks[index] = !walks[index];
    persist({ ...log, walks: walks });
  }

  const doneCount =
    log.weightSessions.filter(Boolean).length + log.walks.filter(Boolean).length;
  const targetCount = 5;

  return (
    <section className="space-y-6">
      <div className="rounded-xl bg-white border border-sand-200 p-4 shadow-sm">
        <p className="text-sm text-sand-600">Weekly targets (shared)</p>
        <ul className="mt-2 text-sm text-sand-800 list-disc list-inside space-y-1">
          <li>2 weight sessions</li>
          <li>3 walks × 1 hour</li>
        </ul>
        <p className="mt-4 text-2xl font-display text-lagoon-700">
          {streak} week{streak === 1 ? "" : "s"} streak
        </p>
        <p className="text-xs text-sand-500 mt-1">
          Consecutive weeks with all five boxes checked.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg border border-sand-200 text-sm"
          onClick={() => selectWeek(addDaysYmd(weekStart, -7))}
        >
          ← Prev week
        </button>
        <span className="text-sm font-medium text-sand-800 flex-1 text-center min-w-[12rem]">
          {weekLabel(weekStart)}
        </span>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg border border-sand-200 text-sm"
          onClick={() => selectWeek(addDaysYmd(weekStart, 7))}
        >
          Next week →
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg bg-lagoon-50 text-lagoon-800 text-sm border border-lagoon-100"
          onClick={() => selectWeek(mondayOfWeek())}
        >
          This week
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-sand-200 p-4 shadow-sm space-y-4">
        <div className="flex justify-between items-baseline">
          <h2 className="font-display text-xl text-sand-900">This week</h2>
          <span className="text-sm text-sand-600">
            {doneCount}/{targetCount} done
          </span>
        </div>

        <div>
          <h3 className="text-sm font-medium text-sand-800 mb-2">Weight sessions</h3>
          <ul className="space-y-2">
            {([0, 1] as const).map((i) => (
              <li
                key={`w-${i}`}
                className="flex items-center gap-3 rounded-xl bg-sand-50 border border-sand-100 p-3"
              >
                <input
                  type="checkbox"
                  id={`weight-${i}`}
                  checked={log.weightSessions[i]}
                  onChange={() => toggleWeight(i)}
                  className="h-4 w-4 accent-lagoon-600"
                />
                <label htmlFor={`weight-${i}`} className="text-sm text-sand-800">
                  Weight session {i + 1}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-sand-800 mb-2">Walks (1 hour)</h3>
          <ul className="space-y-2">
            {([0, 1, 2] as const).map((i) => (
              <li
                key={`walk-${i}`}
                className="flex items-center gap-3 rounded-xl bg-sand-50 border border-sand-100 p-3"
              >
                <input
                  type="checkbox"
                  id={`walk-${i}`}
                  checked={log.walks[i]}
                  onChange={() => toggleWalk(i)}
                  className="h-4 w-4 accent-lagoon-600"
                />
                <label htmlFor={`walk-${i}`} className="text-sm text-sand-800">
                  Walk {i + 1}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
