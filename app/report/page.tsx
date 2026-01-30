"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, Search } from "lucide-react";

import ItemCard from "@/components/report/ItemCard";
import ReportTabs from "@/components/report/ReportTabs";
import ReportTypeModal, { type ReportType } from "@/components/report/ReportTypeModal";
import { sampleItems } from "@/components/report/sampleItems";
import { filterItems } from "@/components/report/filterItems";
import type { Tab } from "@/components/report/types";

export default function ReportPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isChooserOpen, setIsChooserOpen] = useState(false);

  const items = useMemo(
    () => filterItems(sampleItems, activeTab, searchQuery),
    [activeTab, searchQuery]
  );

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
               <PlusIcon className="inline-block mr-1 h-10 w-10" />
               File a Report
            </button>
         </div>

         {/* Tabs spacing like your screenshot */}
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

         {/* Modal Chooser */}
         <ReportTypeModal
         open={isChooserOpen}
         onClose={() => setIsChooserOpen(false)}
         onSelect={handleChoose}
         />
      </div>
  );
}
