"use client";

import clsx from "clsx";

export type TabId = "calendar" | "villas" | "checklist" | "wellness";

const TABS: { id: TabId; label: string; short: string }[] = [
  { id: "calendar", label: "Itinerary", short: "Plan" },
  { id: "villas", label: "Villas", short: "Stay" },
  { id: "checklist", label: "Checklist & notes", short: "Lists" },
  { id: "wellness", label: "Wellness (private)", short: "You" },
];

interface NavTabsProps {
  active: TabId;
  onChange: (id: TabId) => void;
}

export function NavTabs({ active, onChange }: NavTabsProps) {
  return (
    <nav
      className="sticky top-0 z-20 -mx-1 px-1 py-2 bg-sand-50/90 backdrop-blur-md border-b border-sand-200/60"
      aria-label="Trip sections"
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
