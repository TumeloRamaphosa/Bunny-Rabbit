"use client";

import { useMemo, useState } from "react";
import { SEED_VILLAS, HOTELS_COM_SEARCH } from "@/lib/seed";
import { formatZar } from "@/lib/format";
import {
  loadVillaShortlist,
  saveVillaShortlist,
} from "@/lib/storage";

const BUDGET_MIN = 50000;
const BUDGET_MAX = 100000;

export function VillaBoard() {
  const [minBudget, setMinBudget] = useState(BUDGET_MIN);
  const [maxBudget, setMaxBudget] = useState(BUDGET_MAX);
  const [shortlist, setShortlist] = useState<string[]>(() => loadVillaShortlist());

  const filtered = useMemo(
    () =>
      SEED_VILLAS.filter(
        (v) =>
          v.peakEstimateZar >= minBudget && v.peakEstimateZar <= maxBudget,
      ),
    [minBudget, maxBudget],
  );

  function toggleShortlist(id: string) {
    const next = shortlist.includes(id)
      ? shortlist.filter((x) => x !== id)
      : [...shortlist, id];
    setShortlist(next);
    saveVillaShortlist(next);
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-sand-900">Villa shortlist</h2>
        <p className="text-sm text-sand-600 mt-1">
          4BR + pool for Dec 15–22. Filter by estimated ZAR budget (7 nights).
        </p>
      </div>

      <div className="rounded-xl bg-white border border-sand-200 p-4 space-y-4">
        <p className="text-sm font-medium text-sand-800">Budget filter (ZAR)</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="text-sand-600">Min</span>
            <input
              type="number"
              step={5000}
              className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
              value={minBudget}
              onChange={(e) => setMinBudget(Number(e.target.value))}
            />
          </label>
          <label className="text-sm">
            <span className="text-sand-600">Max</span>
            <input
              type="number"
              step={5000}
              className="mt-1 w-full rounded-lg border border-sand-200 px-3 py-2"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
            />
          </label>
        </div>
        <input
          type="range"
          min={20000}
          max={120000}
          step={5000}
          className="w-full accent-lagoon-600"
          value={maxBudget}
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          aria-label="Maximum budget"
        />
      </div>

      <ul className="space-y-4">
        {filtered.length === 0 && (
          <li className="text-sm text-sand-600 rounded-xl border border-dashed border-sand-300 p-6 text-center">
            No villas in this range. Widen the filter or check Laem Ka below
            (lower band).
          </li>
        )}
        {SEED_VILLAS.map((villa) => {
          const inFilter = filtered.some((f) => f.id === villa.id);
          if (!inFilter && villa.peakEstimateZar > maxBudget) return null;
          if (!inFilter && villa.peakEstimateZar < minBudget) {
            return (
              <li
                key={villa.id}
                className="rounded-xl border border-sand-100 bg-sand-50/50 p-4 opacity-75"
              >
                <p className="text-xs text-sand-500">Outside filter</p>
                <p className="font-medium text-sand-800">{villa.name}</p>
                <p className="text-sm text-sand-600">
                  {formatZar(villa.peakEstimateZar)} est.
                </p>
              </li>
            );
          }
          const starred = shortlist.includes(villa.id);
          return (
            <li
              key={villa.id}
              className={`rounded-2xl border p-4 shadow-sm ${
                starred
                  ? "border-lagoon-400 bg-lagoon-50/40"
                  : "border-sand-200 bg-white"
              }`}
            >
              <div className="flex justify-between gap-2">
                <div>
                  <h3 className="font-medium text-sand-900">{villa.name}</h3>
                  <p className="text-sm text-sand-600">{villa.area}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleShortlist(villa.id)}
                  className="text-sm shrink-0 px-3 py-1 rounded-full border border-lagoon-200 text-lagoon-800"
                  aria-pressed={starred}
                >
                  {starred ? "★ Shortlisted" : "☆ Shortlist"}
                </button>
              </div>
              <p className="mt-2 text-sm">
                <span className="font-medium text-lagoon-800">
                  {formatZar(villa.peakEstimateZar)}
                </span>
                <span className="text-sand-500"> / {villa.nights} nights · </span>
                {villa.bedrooms} BR
              </p>
              {villa.confirmFourBr && (
                <p className="mt-2 text-xs font-medium text-coral-600 bg-coral-400/10 inline-block px-2 py-1 rounded">
                  Confirm 4BR layout before booking
                </p>
              )}
              {villa.notes && (
                <p className="text-sm text-sand-500 mt-2">{villa.notes}</p>
              )}
              <a
                href={villa.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm font-medium text-lagoon-700 hover:underline"
              >
                View listing →
              </a>
            </li>
          );
        })}
      </ul>

      <div className="rounded-xl bg-sand-100/80 border border-sand-200 p-4">
        <h3 className="font-medium text-sand-900">Hotel backup (deep link only)</h3>
        <p className="text-sm text-sand-600 mt-1">
          We only link to Hotels.com search — no fabricated member rates.
        </p>
        <a
          href={HOTELS_COM_SEARCH}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white bg-sand-800 hover:bg-sand-900 px-4 py-2 rounded-lg"
        >
          Search Hotels.com — Phuket
        </a>
      </div>
    </section>
  );
}
