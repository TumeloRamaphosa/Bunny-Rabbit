"use client";

import { useEffect, useState } from "react";
import type { FoodDayLog } from "@/lib/types";
import { formatDisplayDate, todayYmd } from "@/lib/format";
import { loadFoodDay, saveFoodDay } from "@/lib/storage";

const MEALS: { key: keyof FoodDayLog; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "snacks", label: "Snacks & drinks" },
];

export function FoodTracker() {
  const [date, setDate] = useState(todayYmd);
  const [log, setLog] = useState<FoodDayLog>(() => loadFoodDay(todayYmd()));

  useEffect(() => {
    setLog(loadFoodDay(date));
  }, [date]);

  function update(key: keyof FoodDayLog, value: string) {
    setLog((prev) => ({ ...prev, [key]: value }));
  }

  function persist() {
    saveFoodDay({ ...log, date });
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-sand-900">Light food log</h2>
        <p className="text-sm text-sand-600 mt-1">
          Meals and notes only — not a calorie counter. Helpful for energy and
          shared planning.
        </p>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-sand-900">Day</span>
        <input
          type="date"
          className="mt-2 w-full sm:w-auto rounded-lg border border-sand-200 bg-white px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <span className="block mt-1 text-sand-500">{formatDisplayDate(date)}</span>
      </label>

      <div className="space-y-4">
        {MEALS.map((meal) => (
          <label key={meal.key} className="block text-sm">
            <span className="font-medium text-sand-800">{meal.label}</span>
            <input
              className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2"
              value={log[meal.key] as string}
              onChange={(e) => update(meal.key, e.target.value)}
              onBlur={persist}
              placeholder="What we ate…"
            />
          </label>
        ))}

        <label className="block text-sm">
          <span className="font-medium text-sand-800">Notes</span>
          <textarea
            className="mt-1 w-full min-h-[80px] rounded-lg border border-sand-200 bg-white p-3"
            value={log.notes}
            onChange={(e) => update("notes", e.target.value)}
            onBlur={persist}
            placeholder="How we felt, eating out, prep ideas…"
          />
        </label>
      </div>
    </section>
  );
}
