import type { Item, Tab } from "./types";

export function filterItems(items: Item[], tab: Tab, query: string) {
  const q = query.toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q);

    const isReported = item.tags.includes("REPORTED");
    const isClaimed = item.tags.includes("CLAIM");

    const matchesTab =
      tab === "all" ||
      (tab === "reported" && isReported && !isClaimed) ||
      (tab === "claimed" && isClaimed);

    return matchesSearch && matchesTab;
  });
}
