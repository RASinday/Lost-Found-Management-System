"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, Search } from "lucide-react";

import ItemCard from "@/components/report/ItemCard";
import ReportTabs from "@/components/report/ReportTabs";
import ReportTypeModal, { type ReportType } from "@/components/report/ReportTypeModal";

import { sampleItems } from "@/lib/sampleItems";
import { filterItems } from "@/lib/filterItems";
import type { Tab } from "@/lib/types";
import { useTempReports } from "@/lib/tempReportsStore";

export default function ReportPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isChooserOpen, setIsChooserOpen] = useState(false);

  const { reports: filedReports } = useTempReports();

  const allItems = useMemo(() => {
    return [...filedReports, ...sampleItems];
  }, [filedReports]);

  const items = useMemo(() => {
    return filterItems(allItems, activeTab, searchQuery);
  }, [allItems, activeTab, searchQuery]);

  function handleChoose(type: ReportType) {
    setIsChooserOpen(false);
    if (type === "lost") router.push("/report/lost");
    if (type === "found") router.push("/report/found");
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#07121f] text-white">
      <main className="mx-auto w-full max-w-550 px-10 py-10">
        {/* Search + Action */}
        <div className="flex items-start justify-between gap-6">
          <div className="w-full max-w-200">
            <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <Search className="h-10 w-10 text-white/50" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full bg-transparent text-[20px] outline-none text-white/90 placeholder:text-white/60"
              />
            </div>
          </div>

          <button
            onClick={() => setIsChooserOpen(true)}
            className="shrink-0 rounded-xl bg-orange-500 px-6 py-3 text-[20px] font-semibold hover:bg-orange-400"
          >
            <PlusIcon className="mr-2 inline-block h-10 w-10" />
            File a Report
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-15">
          <ReportTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="py-16 text-center text-white/60 text-[20px]">
            No items found.
          </div>
        )}
      </main>

      <ReportTypeModal
        open={isChooserOpen}
        onClose={() => setIsChooserOpen(false)}
        onSelect={handleChoose}
      />
    </div>
  );
}
