export function OsHeader() {
  return (
    <header className="rounded-2xl bg-white/80 backdrop-blur border border-sand-200/80 p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-lagoon-600">
        Bunny Rabbit · Family OS
      </p>
      <h1 className="font-display text-2xl sm:text-3xl text-sand-900 mt-1 text-balance">
        Daily rituals & shared goals
      </h1>
      <p className="text-sand-700 mt-2 text-sm sm:text-base">
        Lock-in at <span className="font-medium">19:00 SAST</span>
        <span className="mx-2 text-sand-400">·</span>
        Stored locally in this browser (v1)
      </p>
    </header>
  );
}
