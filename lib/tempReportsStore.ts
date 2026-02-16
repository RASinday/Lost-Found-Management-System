import { useSyncExternalStore } from "react";
import type { Item, Status } from "./types";
import { sampleItems } from "./sampleItems";

/**
 * Temporary in-memory store:
 * - Works during current session
 * - Refresh resets to sampleItems
 */
let items: Item[] = [...sampleItems];
const listeners = new Set<() => void>();
const EMPTY: Item[] = []; // stable snapshot for SSR

function emit() {
  for (const l of listeners) l();
}

export function getTempItems(): Item[] {
  return items;
}

export function addTempReport(item: Item) {
  items = [item, ...items];
  emit();
}

export function updateTempItem(updated: Item) {
  items = items.map((it) => (it.id === updated.id ? updated : it));
  emit();
}

/** Mark item as CLAIM (after verification submit) */
export function claimTempItem(id: string) {
  items = items.map((it) => {
    if (it.id !== id) return it;
    if (it.tags.includes("CLAIM")) return it;

    const nextTags: Status[] = [...it.tags.filter((t) => t !== "REPORTED"), "CLAIM"];
    return { ...it, tags: nextTags };
  });
  emit();
}

export function subscribeTempItems(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTempItems() {
  const snapshot = useSyncExternalStore(subscribeTempItems, getTempItems, () => EMPTY);

  return {
    items: snapshot,
    addTempReport,
    updateTempItem,
    claimTempItem,
  };
}
