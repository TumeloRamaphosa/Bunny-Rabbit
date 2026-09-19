"use client";

import clsx from "clsx";

export type AppSection = "travel" | "os";

const SECTIONS: { id: AppSection; label: string }[] = [
  { id: "travel", label: "Phuket trip" },
  { id: "os", label: "Family OS" },
];

interface SectionNavProps {
  active: AppSection;
  onChange: (id: AppSection) => void;
}

export function SectionNav({ active, onChange }: SectionNavProps) {
  return (
    <nav
      className="flex gap-2 p-1 rounded-2xl bg-sand-100/80 border border-sand-200/80"
      aria-label="App sections"
    >
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onChange(section.id)}
          className={clsx(
            "flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
            active === section.id
              ? "bg-white text-lagoon-800 shadow-sm border border-sand-200"
              : "text-sand-600 hover:text-sand-800",
          )}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
