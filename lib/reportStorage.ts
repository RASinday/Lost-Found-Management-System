import type { Item } from "./types";

const STORAGE_KEY = "lf_reports_v1";

function isItem(x: any): x is Item {
  return (
    x &&
    typeof x === "object" &&
    typeof x.id === "string" &&
    typeof x.title === "string" &&
    typeof x.desc === "string" &&
    typeof x.location === "string" &&
    typeof x.date === "string" &&
    typeof x.time === "string" &&
    Array.isArray(x.tags)
  );
}

export function loadReports(): Item[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isItem);
  } catch {
    return [];
  }
}

export function saveReports(items: Item[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addReport(item: Item) {
  const existing = loadReports();
  // newest first
  saveReports([item, ...existing]);
}
