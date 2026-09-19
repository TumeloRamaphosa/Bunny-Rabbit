import type { ChecklistItem, ItineraryItem, VillaOption } from "./types";

export const SEED_VILLAS: VillaOption[] = [
  {
    id: "nh23-nai-harn",
    name: "NH23 — Nai Harn Private Pool Villa",
    area: "Nai Harn Beach, Phuket",
    bedrooms: 4,
    budgetZarMin: 50000,
    budgetZarMax: 100000,
    peakEstimateZar: 82000,
    nights: 7,
    url: "https://abyssphuket.com/properties/nh23-private-pool-villa-in-nai-harn-beach-phuket/",
    notes: "~R82k / 7 nights peak season estimate",
  },
  {
    id: "hipflat-rawai-4br",
    name: "Hipflat Rawai 4BR",
    area: "Rawai, Phuket",
    bedrooms: 4,
    budgetZarMin: 50000,
    budgetZarMax: 100000,
    peakEstimateZar: 82000,
    nights: 7,
    url: "https://www.hipflat.com/ads/un34018u8n4833842c3hh8a23u0h14hl",
    notes: "~R82k estimate for trip window",
  },
  {
    id: "laem-ka-0783",
    name: "Laem Ka Rawai #0783",
    area: "Rawai / Laem Ka, Phuket",
    bedrooms: 4,
    budgetZarMin: 29000,
    budgetZarMax: 39000,
    peakEstimateZar: 35000,
    nights: 7,
    url: "https://indreamsphuket.com/rent/villa/rawai-laem-ka-4bed-0783",
    notes: "R29–39k range; confirm 4BR layout before booking",
    confirmFourBr: true,
  },
];

export const SEED_ITINERARY: ItineraryItem[] = [
  {
    id: "arrival",
    date: "2026-12-15",
    title: "Arrive HKT · Villa check-in",
    time: "Afternoon",
    location: "Phuket International",
    notes: "Pool villa welcome dinner with the group",
  },
  {
    id: "beach-day",
    date: "2026-12-17",
    title: "Nai Harn / Rawai beach day",
    time: "10:00",
    notes: "Sunscreen, towels, easy lunch nearby",
  },
  {
    id: "departure",
    date: "2026-12-22",
    title: "Checkout & depart",
    time: "Morning",
    notes: "Coordinate transfers for four guests",
  },
];

export const SEED_CHECKLIST: ChecklistItem[] = [
  { id: "c1", text: "Shortlist villa (budget R50k–R100k)", done: false, assignee: "Katlego" },
  { id: "c2", text: "Confirm 4BR layout for Laem Ka #0783", done: false, assignee: "Tumelo" },
  { id: "c3", text: "Travel insurance for all four guests", done: false },
  { id: "c4", text: "Share flight details in group chat", done: false, assignee: "Sister" },
  { id: "c5", text: "Pool floaties & first-aid kit", done: false },
];

export const HOTELS_COM_SEARCH =
  "https://www.hotels.com/Hotel-Search?destination=Phuket%2C%20Thailand&startDate=2026-12-15&endDate=2026-12-22&rooms=2&adults=4";
