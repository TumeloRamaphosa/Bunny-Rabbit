"use client";

import { useState } from "react";
import type { CoupleGoal } from "@/lib/types";
import { todayYmd } from "@/lib/format";
import { loadCoupleGoals, saveCoupleGoals } from "@/lib/storage";

function newGoalId(): string {
  return `goal-${Date.now().toString(36)}`;
}

export function CoupleGoals() {
  const [goals, setGoals] = useState<CoupleGoal[]>(() => loadCoupleGoals());
  const [newTitle, setNewTitle] = useState("");
  const [checkInNote, setCheckInNote] = useState<Record<string, string>>({});

  function persist(next: CoupleGoal[]) {
    setGoals(next);
    saveCoupleGoals(next);
  }

  function addGoal() {
    if (!newTitle.trim()) return;
    persist([
      ...goals,
      { id: newGoalId(), title: newTitle.trim(), done: false, checkIns: [] },
    ]);
    setNewTitle("");
  }

  function toggleDone(id: string) {
    persist(
      goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)),
    );
  }

  function removeGoal(id: string) {
    persist(goals.filter((g) => g.id !== id));
  }

  function addCheckIn(id: string) {
    const note = (checkInNote[id] ?? "").trim();
    if (!note) return;
    persist(
      goals.map((g) =>
        g.id === id
          ? {
              ...g,
              checkIns: [
                ...g.checkIns,
                { date: todayYmd(), note },
              ],
            }
          : g,
      ),
    );
    setCheckInNote((prev) => ({ ...prev, [id]: "" }));
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-sand-900">Couple goals</h2>
        <p className="text-sm text-sand-600 mt-1">
          Shared list for lock-in overview and Sunday align. Check in with a
          short note when something moves.
        </p>
      </div>

      <ul className="space-y-4">
        {goals.length === 0 && (
          <li className="text-sm text-sand-500 rounded-xl border border-dashed border-sand-300 p-6 text-center">
            No goals yet — add one below.
          </li>
        )}
        {goals.map((goal) => (
          <li
            key={goal.id}
            className="rounded-xl bg-white border border-sand-200 p-4 shadow-sm space-y-3"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={goal.done}
                onChange={() => toggleDone(goal.id)}
                className="mt-1 h-4 w-4 accent-lagoon-600"
                id={`goal-${goal.id}`}
              />
              <label
                htmlFor={`goal-${goal.id}`}
                className={`flex-1 text-sm font-medium ${
                  goal.done ? "text-sand-400 line-through" : "text-sand-900"
                }`}
              >
                {goal.title}
              </label>
              <button
                type="button"
                onClick={() => removeGoal(goal.id)}
                className="text-xs text-sand-500 hover:text-coral-600"
              >
                Remove
              </button>
            </div>

            {goal.checkIns.length > 0 && (
              <ul className="text-xs text-sand-600 space-y-1 pl-7 border-l-2 border-lagoon-100">
                {goal.checkIns
                  .slice()
                  .reverse()
                  .map((c, i) => (
                    <li key={`${goal.id}-ci-${i}`}>
                      <span className="text-lagoon-700">{c.date}</span> — {c.note}
                    </li>
                  ))}
              </ul>
            )}

            <div className="flex gap-2 pl-7">
              <input
                className="flex-1 rounded-lg border border-sand-200 px-3 py-1.5 text-sm"
                placeholder="Check-in note…"
                value={checkInNote[goal.id] ?? ""}
                onChange={(e) =>
                  setCheckInNote((prev) => ({
                    ...prev,
                    [goal.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => e.key === "Enter" && addCheckIn(goal.id)}
              />
              <button
                type="button"
                onClick={() => addCheckIn(goal.id)}
                className="px-3 py-1.5 rounded-lg bg-lagoon-600 text-white text-sm"
              >
                Check in
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-sand-200 px-3 py-2 text-sm"
          placeholder="New couple goal…"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
        />
        <button
          type="button"
          onClick={addGoal}
          className="px-4 py-2 rounded-lg bg-lagoon-600 text-white text-sm font-medium"
        >
          Add
        </button>
      </div>
    </section>
  );
}
