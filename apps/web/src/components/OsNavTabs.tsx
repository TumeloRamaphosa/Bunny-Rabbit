"use client";

import clsx from "clsx";

export type OsTabId = "lockin" | "fitness" | "food" | "couple";

const TABS: { id: OsTabId; label: string; short: string }[] = [
  { id: "lockin", label: "Lock-in diary", short: "7pm" },
  { id: "fitness", label: "Fitness", short: "Move" },
  { id: "food", label: "Food log", short: "Food" },
  { id: "couple", label: "Couple goals", short: "Us" },
];

interface OsNavTabsProps {
  active: OsTabId;
  onChange: (id: OsTabId) => void;
}

export function OsNavTabs({ active, onChange }: OsNavTabsProps) {
  return (
    <nav
      className="sticky top-0 z-20 -mx-1 px-1 py-2 bg-sand-50/90 backdrop-blur-md border-b border-sand-200/60"
      aria-label="Family OS modules"
    >
      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              "shrink-0 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
              active === tab.id
                ? "bg-lagoon-600 text-white shadow-sm"
                : "bg-white text-sand-700 border border-sand-200 hover:bg-sand-100",
            )}
          >
            <span className="sm:hidden">{tab.short}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
