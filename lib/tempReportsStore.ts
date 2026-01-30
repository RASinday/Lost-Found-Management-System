import { useSyncExternalStore } from "react";
import type { Item } from "./types";

/**
 * Temporary in-memory store:
 * - Works until refresh
 * - Refresh resets to empty
 */
let reports: Item[] = [];
const listeners = new Set<() => void>();

const EMPTY: Item[] = []; // IMPORTANT: stable reference for server snapshot

function emit() {
  for (const l of listeners) l();
}

export function getTempReports(): Item[] {
  return reports;
}

export function addTempReport(item: Item) {
  reports = [item, ...reports];
  emit();
}

export function deleteTempReport(id: string) {
  reports = reports.filter((r) => r.id !== id);
  emit();
}

export function clearTempReports() {
  reports = [];
  emit();
}

export function subscribeTempReports(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useTempReports() {
  const snapshot = useSyncExternalStore(
    subscribeTempReports,
    getTempReports,
    () => EMPTY // IMPORTANT: stable server snapshot
  );

  return {
    reports: snapshot,
    addTempReport,
    deleteTempReport,
    clearTempReports,
  };
}
