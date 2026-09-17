"use client";

import { useState } from "react";
import { TripHeader } from "./TripHeader";
import { NavTabs, type TabId } from "./NavTabs";
import { TripCalendar } from "./TripCalendar";
import { VillaBoard } from "./VillaBoard";
import { ChecklistNotes } from "./ChecklistNotes";
import { WellnessCalendar } from "./WellnessCalendar";

export function TravelPlanner() {
  const [tab, setTab] = useState<TabId>("calendar");

  return (
    <div className="min-h-dvh max-w-2xl mx-auto px-4 pb-12 pt-6 sm:pt-10">
      <TripHeader />
      <div className="mt-6">
        <NavTabs active={tab} onChange={setTab} />
      </div>
      <main className="mt-6">
        {tab === "calendar" && <TripCalendar />}
        {tab === "villas" && <VillaBoard />}
        {tab === "checklist" && <ChecklistNotes />}
        {tab === "wellness" && <WellnessCalendar />}
      </main>
      <footer className="mt-12 text-center text-xs text-sand-500">
        Bunny Rabbit · Private trip ops · Not for public indexing
      </footer>
    </div>
  );
}
