"use client";

import type { Tab } from "./types";

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "reported", label: "Reported / Unclaimed" },
  { id: "claimed", label: "Successfully Claimed" },
];

export default function ReportTabs({ activeTab, onChange }: { activeTab: Tab; onChange: (tab: Tab) => void }) {
  return (
    <div className="mt-15 flex items-center gap-4">
      <button
        className={`rounded-xl px-5 py-2.5 text-[20px] font-semibold ${
          activeTab === "all"
            ? "bg-[#3b5a86] text-white"
            : "bg-transparent text-white/70 hover:bg-white/10"
        }`}
        onClick={() => onChange("all")}
      >
        All Items
      </button>

      <button
        className={`rounded-xl px-5 py-2.5 text-[20px] font-semibold ${
          activeTab === "reported"
            ? "bg-[#3b5a86] text-white"
            : "bg-transparent text-white/70 hover:bg-white/10"
        }`}
        onClick={() => onChange("reported")}
      >
        Reported / Unclaimed
      </button>

      <button
        className={`rounded-xl px-5 py-2.5 text-[20px] font-semibold ${
          activeTab === "claimed"
            ? "bg-[#3b5a86] text-white"
            : "bg-transparent text-white/70 hover:bg-white/10"
        }`}
        onClick={() => onChange("claimed")}
      >
        Successfully Claimed
      </button>
    </div>
  );
}