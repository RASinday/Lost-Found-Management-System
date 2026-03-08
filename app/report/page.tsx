"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, Search } from "lucide-react";

import ItemCard from "@/components/report/ItemCard";
import ReportTypeModal, { type ReportType } from "@/components/report/ReportTypeModal";
import ItemDetailsModal from "@/components/report/ItemDetailsModal";
import ClaimVerificationModal from "@/components/report/ClaimVerificationModal";
import EditReportModal from "@/components/report/EditReportModal";
import { ReportFilters, type ReportFilter } from "@/components/ReportFilters";

import { filterItems } from "@/lib/filterItems";
import type { Item } from "@/lib/types";
import { useTempItems, getTempItems } from "@/lib/tempReportsStore";

export default function ReportPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<ReportFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isChooserOpen, setIsChooserOpen] = useState(false);

  const { items: allItems, claimTempItem, updateTempItem } = useTempItems();

  const items = useMemo(
    () => filterItems(allItems, activeTab, searchQuery),
    [allItems, activeTab, searchQuery]
  );

  const [selected, setSelected] = useState<Item | null>(null);
  const [claimItem, setClaimItem] = useState<Item | null>(null);
  const [editItem, setEditItem] = useState<Item | null>(null);

  function handleChoose(type: ReportType) {
    setIsChooserOpen(false);
    if (type === "lost") router.push("/report/lost");
    if (type === "found") router.push("/report/found");
  }

  function handleOpenItem(item: Item) {
    setSelected(item);
  }

  function handleCloseDetails() {
    setSelected(null);
  }

  function handleStartClaim(item: Item) {
    setSelected(null);
    setClaimItem(item);
  }

  function handleCloseClaim() {
    setClaimItem(null);
  }

  function handleSubmitClaim(payload: { itemId: string; proof: string; studentId: string }) {
    if (!payload.proof || !payload.studentId) {
      alert("Please fill in the proof details and your ID number.");
      return;
    }

    claimTempItem(payload.itemId);
    setClaimItem(null);

    const updated = getTempItems().find((x) => x.id === payload.itemId) ?? null;
    if (updated) setSelected(updated);
  }

  function handleEdit(item: Item) {
    setEditItem(item);
  }

  function handleUpdateReport(updated: Item) {
    updateTempItem(updated);

    const refreshed = getTempItems().find((x) => x.id === updated.id) ?? null;
    if (selected?.id === updated.id) setSelected(refreshed);

    setEditItem(null);
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#07121f] text-white">
      <main className="mx-auto w-full max-w-350 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10">
        {/* Search + File a report */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <div className="w-full md:max-w-150">
            <div className="flex items-center gap-3 rounded-lg sm:rounded-xl bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 ring-1 ring-white/10">
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-white/50 shrink-0" />
              <input
                name="report-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full bg-transparent text-[14px] sm:text-[15px] outline-none text-white/90 placeholder:text-white/60"
              />
            </div>
          </div>

          <button
            onClick={() => setIsChooserOpen(true)}
            className="shrink-0 w-full md:w-auto rounded-lg sm:rounded-xl bg-orange-500 px-4 sm:px-5 py-2.5 sm:py-2.5 text-[14px] sm:text-[15px] font-semibold hover:bg-orange-400 transition-colors"
          >
            <PlusIcon className="inline-block mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            File a Report
          </button>
        </div>

        {/* Filters: dropdown on mobile, pills on desktop */}
        <div className="mt-5 sm:mt-6">
          <ReportFilters value={activeTab} onChange={setActiveTab} />
        </div>

        {/* Items grid */}
        <div className="mt-5 sm:mt-6 grid gap-5 sm:gap-6 md:gap-7 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <ItemCard key={item.id} item={item} eager={index === 0} onOpen={() => handleOpenItem(item)} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="py-16 text-center text-white/60 text-[25px]">No items found.</div>
        )}
      </main>

      <ReportTypeModal
        open={isChooserOpen}
        onClose={() => setIsChooserOpen(false)}
        onSelect={handleChoose}
      />

      <ItemDetailsModal
        open={!!selected}
        item={selected}
        onClose={handleCloseDetails}
        onStartClaim={handleStartClaim}
        onEdit={handleEdit}
      />

      <ClaimVerificationModal
        open={!!claimItem}
        item={claimItem}
        onClose={handleCloseClaim}
        onSubmit={handleSubmitClaim}
      />

      <EditReportModal
        open={!!editItem}
        item={editItem}
        onClose={() => setEditItem(null)}
        onUpdate={handleUpdateReport}
      />
    </div>
  );
}
