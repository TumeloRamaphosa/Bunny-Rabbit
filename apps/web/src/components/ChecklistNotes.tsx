"use client";

import { useEffect, useState } from "react";
import type { ChecklistItem, Guest } from "@/lib/types";
import { TRIP } from "@/lib/types";
import {
  loadChecklist,
  loadSharedNotes,
  saveChecklist,
  saveSharedNotes,
} from "@/lib/storage";

const GUESTS: Guest[] = TRIP.guests;

function newCheckId(): string {
  return `chk-${Date.now().toString(36)}`;
}

export function ChecklistNotes() {
  const [list, setList] = useState<ChecklistItem[]>(() => loadChecklist());
  const [notes, setNotes] = useState("");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    setNotes(loadSharedNotes());
  }, []);

  function persistList(next: ChecklistItem[]) {
    setList(next);
    saveChecklist(next);
  }

  function toggle(id: string) {
    persistList(
      list.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function addItem() {
    if (!newText.trim()) return;
    persistList([
      ...list,
      { id: newCheckId(), text: newText.trim(), done: false },
    ]);
    setNewText("");
  }

  function onNotesBlur() {
    saveSharedNotes(notes);
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-display text-xl text-sand-900">Shared checklist</h2>
        <p className="text-sm text-sand-600 mt-1">
          Synced in this browser for Tumelo, Katlego & guests.
        </p>
      </div>

      <ul className="space-y-2">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 rounded-xl bg-white border border-sand-200 p-3"
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggle(item.id)}
              className="mt-1 h-4 w-4 accent-lagoon-600"
              id={`chk-${item.id}`}
            />
            <label
              htmlFor={`chk-${item.id}`}
              className={`flex-1 text-sm ${item.done ? "text-sand-400 line-through" : "text-sand-800"}`}
            >
              {item.text}
              {item.assignee && (
                <span className="ml-2 text-xs text-lagoon-700 bg-lagoon-50 px-2 py-0.5 rounded-full">
                  {item.assignee}
                </span>
              )}
            </label>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-sand-200 px-3 py-2 text-sm"
          placeholder="Add a task…"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 rounded-lg bg-lagoon-600 text-white text-sm font-medium"
        >
          Add
        </button>
      </div>

      <div>
        <h2 className="font-display text-xl text-sand-900">Group notes</h2>
        <p className="text-sm text-sand-600 mt-1 mb-3">
          Flight ideas, dietary needs, villa questions — visible to everyone using
          this device.
        </p>
        <textarea
          className="w-full min-h-[140px] rounded-xl border border-sand-200 bg-white p-4 text-sm"
          placeholder="Shared notes for the trip…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={onNotesBlur}
        />
        <p className="text-xs text-sand-500 mt-2">
          Assignees: {GUESTS.join(", ")}
        </p>
      </div>
    </section>
  );
}
