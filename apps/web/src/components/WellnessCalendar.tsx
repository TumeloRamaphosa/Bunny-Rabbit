"use client";

import { useMemo, useState } from "react";
import type { WellnessMarker } from "@/lib/types";
import {
  daysInMonth,
  isInTripRange,
  padDate,
} from "@/lib/format";
import { TRIP_HIGHLIGHT_END, TRIP_HIGHLIGHT_START } from "@/lib/types";
import {
  loadWellness,
  parseWellnessCsv,
  parseWellnessIcs,
  saveWellness,
} from "@/lib/storage";

const YEAR = 2026;
const MONTH = 11;

function newMarkerId(): string {
  return `w-${Date.now().toString(36)}`;
}

export function WellnessCalendar() {
  const [markers, setMarkers] = useState<WellnessMarker[]>(() => loadWellness());
  const [importText, setImportText] = useState("");
  const [importFormat, setImportFormat] = useState<"csv" | "ics">("csv");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("2026-12-01");
  const [type, setType] = useState<WellnessMarker["type"]>("cycle");

  const byDate = useMemo(() => {
    const map = new Map<string, WellnessMarker[]>();
    for (const m of markers) {
      const list = map.get(m.date) ?? [];
      list.push(m);
      map.set(m.date, list);
    }
    return map;
  }, [markers]);

  const totalDays = daysInMonth(YEAR, MONTH);
  const firstDow = new Date(YEAR, MONTH, 1).getDay();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function persist(next: WellnessMarker[]) {
    setMarkers(next);
    saveWellness(next);
  }

  function addMarker() {
    if (!label.trim()) return;
    persist([
      ...markers,
      { id: newMarkerId(), date, label: label.trim(), type },
    ]);
    setLabel("");
  }

  function runImport() {
    const imported =
      importFormat === "csv"
        ? parseWellnessCsv(importText)
        : parseWellnessIcs(importText);
    if (imported.length === 0) return;
    persist([...markers, ...imported]);
    setImportText("");
  }

  function clearAll() {
    if (
      typeof window !== "undefined" &&
      !window.confirm("Clear all private wellness markers on this device?")
    ) {
      return;
    }
    persist([]);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-xl bg-lagoon-50 border border-lagoon-100 p-4 text-sm text-lagoon-900">
        <p className="font-medium">Private on this device only</p>
        <p className="mt-1 text-lagoon-800/90">
          Cycle and wellness markers stay in your browser (localStorage). Flo has
          no public API — use manual entry or import stubs below.{" "}
          <strong>Not medical advice.</strong> For health decisions, speak to a
          clinician.
        </p>
      </div>

      <div>
        <h2 className="font-display text-xl text-sand-900">
          Wellness & cycle — December 2026
        </h2>
        <p className="text-sm text-sand-600 mt-1">
          Trip overlap shown for context; markers are never sent to a server.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-sand-200 p-3 shadow-sm">
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-sand-500 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={`${d}-${i}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`w-e-${idx}`} className="aspect-square" />;
            }
            const dateStr = padDate(YEAR, MONTH, day);
            const inTrip = isInTripRange(
              dateStr,
              TRIP_HIGHLIGHT_START,
              TRIP_HIGHLIGHT_END,
            );
            const dayMarkers = byDate.get(dateStr) ?? [];
            return (
              <div
                key={dateStr}
                className={`aspect-square rounded-lg text-xs flex flex-col items-center justify-center p-0.5 ${
                  inTrip
                    ? "ring-1 ring-coral-400/50 bg-coral-400/10"
                    : "bg-sand-50"
                }`}
              >
                <span className="font-medium">{day}</span>
                {dayMarkers.map((m) => (
                  <span
                    key={m.id}
                    className="w-full truncate text-[9px] text-lagoon-800 bg-lagoon-100 rounded px-0.5 mt-0.5"
                    title={m.label}
                  >
                    {m.type === "cycle" ? "●" : "○"} {m.label}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl bg-white border border-sand-200 p-4 space-y-3">
        <h3 className="font-medium text-sand-900">Add marker</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm block">
            Date
            <input
              type="date"
              className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="text-sm block">
            Type
            <select
              className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
              value={type}
              onChange={(e) =>
                setType(e.target.value as WellnessMarker["type"])
              }
            >
              <option value="cycle">Cycle</option>
              <option value="wellness">Wellness</option>
              <option value="note">Note</option>
            </select>
          </label>
        </div>
        <label className="text-sm block">
          Label
          <input
            className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. period start"
          />
        </label>
        <button
          type="button"
          onClick={addMarker}
          className="px-4 py-2 rounded-lg bg-lagoon-600 text-white text-sm"
        >
          Save locally
        </button>
      </div>

      <div className="rounded-xl border border-dashed border-sand-300 p-4 space-y-3">
        <h3 className="font-medium text-sand-900">Import stub (CSV / ICS)</h3>
        <p className="text-xs text-sand-600">
          CSV format: <code className="bg-sand-100 px-1 rounded">date,label,type</code>{" "}
          (type: cycle | wellness | note). ICS: paste exported calendar fragment.
        </p>
        <select
          className="rounded-lg border border-sand-200 px-3 py-2 text-sm"
          value={importFormat}
          onChange={(e) => setImportFormat(e.target.value as "csv" | "ics")}
        >
          <option value="csv">CSV</option>
          <option value="ics">ICS</option>
        </select>
        <textarea
          className="w-full min-h-[80px] rounded-lg border border-sand-200 p-3 text-sm font-mono"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste export here…"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={runImport}
            className="px-4 py-2 rounded-lg border border-lagoon-300 text-lagoon-800 text-sm"
          >
            Import to local storage
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-4 py-2 rounded-lg text-sm text-sand-600"
          >
            Clear all
          </button>
        </div>
      </div>

      {markers.length > 0 && (
        <ul className="text-sm space-y-2">
          {markers
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((m) => (
              <li
                key={m.id}
                className="flex justify-between gap-2 rounded-lg bg-white border border-sand-100 px-3 py-2"
              >
                <span>
                  <span className="text-lagoon-700">{m.date}</span> — {m.label}{" "}
                  <span className="text-sand-400">({m.type})</span>
                </span>
                <button
                  type="button"
                  className="text-xs text-sand-500 hover:text-coral-600"
                  onClick={() =>
                    persist(markers.filter((x) => x.id !== m.id))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
