import { TRIP } from "@/lib/types";

export function TripHeader() {
  return (
    <header className="rounded-2xl bg-white/80 backdrop-blur border border-sand-200/80 p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-lagoon-600">
        Bunny Rabbit Travel Ops
      </p>
      <h1 className="font-display text-2xl sm:text-3xl text-sand-900 mt-1 text-balance">
        {TRIP.destination}
      </h1>
      <p className="text-sand-700 mt-2 text-sm sm:text-base">
        <span className="font-medium">15–22 Dec 2026</span>
        <span className="mx-2 text-sand-400">·</span>
        {TRIP.villaRequirement}
      </p>
      <ul className="flex flex-wrap gap-2 mt-4">
        {TRIP.guests.map((g) => (
          <li
            key={g}
            className="text-xs sm:text-sm px-3 py-1 rounded-full bg-lagoon-50 text-lagoon-800 border border-lagoon-100"
          >
            {g}
          </li>
        ))}
      </ul>
    </header>
  );
}
