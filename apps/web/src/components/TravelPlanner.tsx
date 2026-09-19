"use client";

import { useState } from "react";
import { TripHeader } from "./TripHeader";
import { NavTabs, type TabId } from "./NavTabs";
import { TripCalendar } from "./TripCalendar";
import { VillaBoard } from "./VillaBoard";
import { ChecklistNotes } from "./ChecklistNotes";
import { WellnessCalendar } from "./WellnessCalendar";
import { SectionNav, type AppSection } from "./SectionNav";
import { OsHeader } from "./OsHeader";
import { OsNavTabs, type OsTabId } from "./OsNavTabs";
import { LockInDiary } from "./LockInDiary";
import { FitnessTracker } from "./FitnessTracker";
import { FoodTracker } from "./FoodTracker";
import { CoupleGoals } from "./CoupleGoals";

export function TravelPlanner() {
  const [section, setSection] = useState<AppSection>("travel");
  const [tab, setTab] = useState<TabId>("calendar");
  const [osTab, setOsTab] = useState<OsTabId>("lockin");

  return (
    <div className="min-h-dvh max-w-2xl mx-auto px-4 pb-12 pt-6 sm:pt-10">
      <SectionNav active={section} onChange={setSection} />

      {section === "travel" ? (
        <>
          <div className="mt-6">
            <TripHeader />
          </div>
          <div className="mt-6">
            <NavTabs active={tab} onChange={setTab} />
          </div>
          <main className="mt-6">
            {tab === "calendar" && <TripCalendar />}
            {tab === "villas" && <VillaBoard />}
            {tab === "checklist" && <ChecklistNotes />}
            {tab === "wellness" && <WellnessCalendar />}
          </main>
        </>
      ) : (
        <>
          <div className="mt-6">
            <OsHeader />
          </div>
          <div className="mt-6">
            <OsNavTabs active={osTab} onChange={setOsTab} />
          </div>
          <main className="mt-6">
            {osTab === "lockin" && <LockInDiary />}
            {osTab === "fitness" && <FitnessTracker />}
            {osTab === "food" && <FoodTracker />}
            {osTab === "couple" && <CoupleGoals />}
          </main>
        </>
      )}

      <footer className="mt-12 text-center text-xs text-sand-500">
        Bunny Rabbit · Private ops · Not for public indexing
      </footer>
    </div>
  );
}
