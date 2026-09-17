"use client";

import { useMemo, useState } from "react";
import type { ItineraryItem } from "@/lib/types";
import {
  TRIP_HIGHLIGHT_END,
  TRIP_HIGHLIGHT_START,
} from "@/lib/types";
import {
  daysInMonth,
  isInTripRange,
  padDate,
} from "@/lib/format";
import {
  loadItinerary,
  saveItinerary,
} from "@/lib/storage";

const YEAR = 2026;
const MONTH = 11; // December

function newId(): string {
  return `it-${Date.now().toString(36)}`;
}

export function TripCalendar() {
  const [items, setItems] = useState<ItineraryItem[]>(() => loadItinerary());
  const [editing, setEditing] = useState<ItineraryItem | null>(null);
  const [form, setForm] = useState<Partial<ItineraryItem>>({});

  const byDate = useMemo(() => {
    const map = new Map<string, ItineraryItem[]>();
    for (const item of items) {
      const list = map.get(item.date) ?? [];
      list.push(item);
      map.set(item.date, list);
    }
    return map;
  }, [items]);

  const totalDays = daysInMonth(YEAR, MONTH);
  const firstDow = new Date(YEAR, MONTH, 1).getDay();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function persist(next: ItineraryItem[]) {
    setItems(next);
    saveItinerary(next);
  }

  function openNew(date: string) {
    setEditing({ id: newId(), date, title: "" });
    setForm({ date, title: "", time: "", location: "", notes: "" });
  }

  function openEdit(item: ItineraryItem) {
    setEditing(item);
    setForm({ ...item });
  }

  function saveForm() {
    if (!editing || !form.title?.trim() || !form.date) return;
    const nextItem: ItineraryItem = {
      id: editing.id,
      date: form.date,
      title: form.title.trim(),
      time: form.time?.trim() || undefined,
      location: form.location?.trim() || undefined,
      notes: form.notes?.trim() || undefined,
    };
    const exists = items.some((i) => i.id === editing.id);
    persist(
      exists
        ? items.map((i) => (i.id === editing.id ? nextItem : i))
        : [...items, nextItem],
    );
    setEditing(null);
  }

  function removeItem(id: string) {
    persist(items.filter((i) => i.id !== id));
    setEditing(null);
  }

  const sorted = [...items].sort((a, b) =>
    a.date === b.date
      ? (a.time ?? "").localeCompare(b.time ?? "")
      : a.date.localeCompare(b.date),
  );

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-sand-900">December 2026</h2>
        <p className="text-sm text-sand-600 mt-1">
          Trip window{" "}
          <span className="text-lagoon-700 font-medium">15–22</span> highlighted.
          Tap a day to add plans.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-sand-200 p-3 shadow-sm">
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-sand-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`e-${idx}`} className="aspect-square" />;
            }
            const dateStr = padDate(YEAR, MONTH, day);
            const inTrip = isInTripRange(
              dateStr,
              TRIP_HIGHLIGHT_START,
              TRIP_HIGHLIGHT_END,
            );
            const dayItems = byDate.get(dateStr) ?? [];
            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => openNew(dateStr)}
                className={`aspect-square rounded-xl text-sm flex flex-col items-center justify-center relative transition-colors ${
                  inTrip
                    ? "bg-coral-400/30 border-2 border-coral-500 text-sand-900 font-semibold"
                    : "bg-sand-50 border border-sand-100 text-sand-700 hover:bg-sand-100"
                }`}
              >
                {day}
                {dayItems.length > 0 && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-lagoon-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sand-800 mb-3">Itinerary</h3>
        <ul className="space-y-3">
          {sorted.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-sand-200 bg-white p-4 shadow-sm"
            >
              <div className="flex justify-between gap-2 items-start">
                <div>
                  <p className="text-xs text-lagoon-700 font-medium">
                    {item.date}
                    {item.time ? ` · ${item.time}` : ""}
                  </p>
                  <p className="font-medium text-sand-900 mt-0.5">{item.title}</p>
                  {item.location && (
                    <p className="text-sm text-sand-600">{item.location}</p>
                  )}
                  {item.notes && (
                    <p className="text-sm text-sand-500 mt-1">{item.notes}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="text-sm text-lagoon-700 hover:underline shrink-0"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-sand-900/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="itinerary-dialog-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl border border-sand-200">
            <h3 id="itinerary-dialog-title" className="font-display text-lg">
              {items.some((i) => i.id === editing.id) ? "Edit" : "Add"} plan
            </h3>
            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                <span className="text-sand-600">Date</span>
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
                  value={form.date ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                />
              </label>
              <label className="block text-sm">
                <span className="text-sand-600">Title</span>
                <input
                  className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
                  value={form.title ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </label>
              <label className="block text-sm">
                <span className="text-sand-600">Time (optional)</span>
                <input
                  className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
                  value={form.time ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                />
              </label>
              <label className="block text-sm">
                <span className="text-sand-600">Location</span>
                <input
                  className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
                  value={form.location ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                />
              </label>
              <label className="block text-sm">
                <span className="text-sand-600">Notes</span>
                <textarea
                  className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2 min-h-[72px]"
                  value={form.notes ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 justify-end">
              {items.some((i) => i.id === editing.id) && (
                <button
                  type="button"
                  onClick={() => removeItem(editing.id)}
                  className="px-4 py-2 text-sm text-coral-600 hover:bg-coral-400/10 rounded-lg"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-sm rounded-lg border border-sand-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveForm}
                className="px-4 py-2 text-sm rounded-lg bg-lagoon-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
