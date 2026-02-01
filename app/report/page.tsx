"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, Search } from "lucide-react";

import ItemCard from "@/components/report/ItemCard";
import ReportTabs from "@/components/report/ReportTabs";
import ReportTypeModal, { type ReportType } from "@/components/report/ReportTypeModal";
import ItemDetailsModal from "@/components/report/ItemDetailsModal";
import ClaimVerificationModal from "@/components/report/ClaimVerificationModal";
import EditReportModal from "@/components/report/EditReportModal";

import { filterItems } from "@/lib/filterItems";
import type { Item, Tab } from "@/lib/types";
import { useTempItems, getTempItems } from "@/lib/tempReportsStore";

export default function ReportPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isChooserOpen, setIsChooserOpen] = useState(false);

  const { items: allItems, claimTempItem, updateTempItem } = useTempItems();

  const items = useMemo(
    () => filterItems(allItems, activeTab, searchQuery),
    [allItems, activeTab, searchQuery]
  );

  const [selected, setSelected] = useState<Item | null>(null);
  const [claimItem, setClaimItem] = useState<Item | null>(null);

  // NEW: edit modal state
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

    // Demo: after submit verification request, mark as CLAIM
    claimTempItem(payload.itemId);

    setClaimItem(null);

    const updated = getTempItems().find((x) => x.id === payload.itemId) ?? null;
    if (updated) setSelected(updated);
  }

  // NEW: open edit modal instead of alert / routing
  function handleEdit(item: Item) {
    setEditItem(item);
  }

  function handleUpdateReport(updated: Item) {
    updateTempItem(updated);

    // refresh selected details if currently open
    const refreshed = getTempItems().find((x) => x.id === updated.id) ?? null;
    if (selected?.id === updated.id) setSelected(refreshed);

    setEditItem(null);
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#07121f] text-white">
      <main className="mx-auto w-full max-w-550 px-10 py-10">
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

        <div className="mt-15">
          <ReportTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} onOpen={() => handleOpenItem(item)} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="py-16 text-center text-white/60 text-[20px]">No items found.</div>
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

      {/* NEW: edit modal */}
      <EditReportModal
        open={!!editItem}
        item={editItem}
        onClose={() => setEditItem(null)}
        onUpdate={handleUpdateReport}
      />
    </div>
  );
}
