"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MoveLeft, ChevronDown, Image as ImageIcon, X } from "lucide-react";

import type { Item, Status } from "@/lib/types";
import { addTempReport, updateTempItem, getTempItems } from "@/lib/tempReportsStore";
import ReportTypeModal, { type ReportType as ReportTypeEnum } from "./ReportTypeModal";

type ReportType = "lost" | "found";

const CATEGORIES = [
  "ID", 
  "Wallet",
  "Phone",
  "Keys", 
  "Bag", 
  "Thumbler",
  "Handkerchief",
  "Towel",
  "Picture",
  "Clothing",
  "Footwear",
  "Other"
];

const LOCATIONS = [
  "JHS Guard House",
  "PTA Office",
  "Principal's  Office",
  "Admin Office",
  "Waiting Shed (between PTA & LAB. 1)",
  "LAB. 1",
  "LAB. 2",
  "Math Park",
  "Science Building (Old Library)",
  "HNVS Kiosk (Guest House)",
  "Garments Building",
  "Supply Office/Clinic",
  "Casa (near Science Buildingg)",
  "JHS Canteen",
  "Parking",
  "ERAP Sports Complex",
  "HNVS Quadrangle",
  "HNVS Gym",
  "HNVS Stage",
  "SSLG Stage",
  "HNVS Pathway",
  "Guidance Office",
  "Covered Walk",
  "Science Laboratory",
  "New Comp. Lab",
  "New Library",
  "MAPEH Office",
  "HNVS Coop",
  "Foodtrades Building",
  "Automotive Building",
  "Old Waiting Shed (near ERAP)",
  "MAPEH Building",
  "Generic Building (near cemetery)",
  "Civil Tech. Building",
  "Pharma. Garden",
  "CSS Building",
  "HNVS Gulayan",
  "SHS Canteen",
  "SHS Guardhouse",
  "Old Building",
  "Building 1",
  "Building 2",
  "Building 3",
  "SHS Pathway",
  "SHS Grounds",
  "Makeshift (Acacia)",
  "Annex Building",
  "Small Grand Stand",
  "Big Grand Stand",
  "HNVS Oval",
  "Other",

];

function formatTime12h(time: string) {
  const [hStr, mStr] = (time || "").split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return time || "";

  const suffix = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm} ${suffix}`;
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function ReportFormPage({
  type,
  editId,
}: {
  type: ReportType;
  editId?: string;
}) {
  const router = useRouter();

  const isEdit = !!editId;

  const existingItem = useMemo(() => {
    if (!editId) return null;
    return getTempItems().find((x) => x.id === editId) ?? null;
  }, [editId]);

  // Title change requested
  const title = isEdit ? "Edit Report" : type === "lost" ? "Report Lost Item" : "Report Found Item";
  const dateLabel = type === "lost" ? "Date Last Seen" : "Date Found";
  const timeLabel = "Approximate time";

  // form state
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState(LOCATIONS[0]);

  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // keep existing image if user doesn't upload a new one
  const [existingImage, setExistingImage] = useState<string | undefined>(undefined);

  // Error state for validation
  const [error, setError] = useState<string>("");

  // Type modal state
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

  const handleTypeChange = (newType: ReportTypeEnum) => {
    setIsTypeModalOpen(false);
    router.push(`/report/${newType}`);
  };

  // Prefill on edit
  useEffect(() => {
    if (!isEdit) return;
    if (!existingItem) return;

    setItemName(existingItem.title ?? "");
    setDescription(existingItem.desc ?? "");
    setDate(existingItem.date ?? "");
    setLocation(existingItem.location ?? "");
    setExistingImage(existingItem.image);

    // If your time is stored like "12:30 PM", we keep it as-is.
    // If you want to convert back to 24h time input, tell me.
    setTime("");

    // Category is not a field in Item type; keep default.
    setCategory(CATEGORIES[0]);

    // show something in UI so user knows there's already an image
    setPhotoName(existingItem.image ? "Existing image" : null);
    setPhotoFile(null);
  }, [isEdit, existingItem]);

  function validate(): string {
    if (!itemName.trim()) return "Item Name / Brand is required.";
    if (!category.trim()) return "Category is required.";
    if (!description.trim()) return "Physical Description is required.";
    if (!date.trim()) return `${dateLabel} is required.`;
    if (!time.trim()) return "Approximate time is required.";
    if (!location.trim()) return "Approximate Location is required.";
    return "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate all required fields
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Clear error if validation passes
    setError("");

    // decide image
    let image: string | undefined = existingImage;
    if (photoFile) {
      try {
        image = await fileToDataUrl(photoFile);
      } catch {
        // keep existingImage
        image = existingImage;
      }
    }

    // tags must be Status[]
    const baseTag: Status = type === "lost" ? "LOST" : "FOUND";
    const isClaimed = isEdit && existingItem?.tags.includes("CLAIM");
    let tags: Status[] = isClaimed ? [baseTag, "CLAIM"] : [baseTag, "REPORTED"];

    // keep category safely inside description (optional)
    const descWithCategory =
      category && category !== "Other"
        ? `Category: ${category}\n\n${description.trim()}`
        : description.trim();

    if (isEdit && existingItem) {
      const updated: Item = {
        ...existingItem,
        title: itemName.trim() || existingItem.title,
        desc: descWithCategory || existingItem.desc,
        location,
        date,
        // if user didn't pick time (because time input expects 24h), preserve old time
        time: time ? formatTime12h(time) : existingItem.time,
        image,
        tags,
      };

      updateTempItem(updated);
      router.push("/report");
      return;
    }

    // Create new
    const newItem: Item = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
      title: itemName.trim() || "(No title)",
      desc: descWithCategory || "(No description)",
      location,
      date,
      time: formatTime12h(time),
      image,
      tags,
    };

    addTempReport(newItem);
    router.push("/report");
  }

  return (
    <div className="fixed inset-0 z-200 overflow-y-auto">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(59,130,246,0.10),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_0%_60%,rgba(249,115,22,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_100%_55%,rgba(34,197,94,0.08),transparent_60%)]" />
      </div>

      {/* Backdrop - clickable to close */}
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-default"
        onClick={() => router.push("/report")}
        aria-label="Close form"
      />

      {/* Centered container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-3 sm:p-4 md:p-6 py-8 sm:py-10">
        {/* Floating card - click events don't propagate to backdrop */}
        <div 
          className="w-full max-w-2xl overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-linear-to-br from-[#1e2b44] to-[#151f2e] shadow-2xl animate-in fade-in zoom-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between border-b border-white/5 p-4 sm:p-6">
            <div>
              <button
                type="button"
                onClick={() => setIsTypeModalOpen(true)}
                className="text-[11px] sm:text-[13px] font-black uppercase tracking-widest text-[#FF9F1C] hover:text-[#FF8C00] transition-colors"
              >
                <MoveLeft className="mr-1.5 sm:mr-2 inline-block h-3 w-3 sm:h-4 sm:w-4" />
                CHANGE TYPE
              </button>

              <h1 className="mt-2 sm:mt-3 text-lg sm:text-xl font-black text-white">{title}</h1>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={() => router.push("/report")}
              className="rounded-lg p-1.5 sm:p-2 bg-black/40 sm:bg-transparent text-white/80 sm:text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 md:p-8 max-h-[calc(100vh-160px)] overflow-y-auto">
            <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-5">
                <p className="text-[13px] sm:text-[15px] font-black text-white/45">
                  Item Information
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="report-page-item-name" className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                      Item Name / Brand
                    </label>
                    <input
                      id="report-page-item-name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g iPhone, Key, Notebook"
                      className="w-full rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#FF9F1C]/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="report-page-category" className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        id="report-page-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full cursor-pointer appearance-none rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors focus:border-[#FF9F1C]/50"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c} className="bg-[#0B121E]">
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="report-page-description" className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Physical Description
                  </label>
                  <textarea
                    id="report-page-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Color, size, material, distinguishing marks..."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#FF9F1C]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-4 sm:space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                    Time &amp; Location
                  </p>

                  <div>
                    <label htmlFor="report-page-date" className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                      {dateLabel}
                    </label>
                    <input
                      id="report-page-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors focus:border-[#FF9F1C]/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="report-page-time" className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                      {timeLabel}
                    </label>
                    <input
                      id="report-page-time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors focus:border-[#FF9F1C]/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="report-page-location" className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                      Approximate Location
                    </label>
                    <div className="relative">
                      <select
                        id="report-page-location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full cursor-pointer appearance-none rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors focus:border-[#FF9F1C]/50"
                      >
                        {LOCATIONS.map((l) => (
                          <option key={l} value={l} className="bg-[#0B121E]">
                            {l}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">Photo</p>

                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0B121E] transition-colors hover:bg-white/2">
                    <input
                      type="file"
                      name="report-page-photo"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setPhotoFile(file);
                        setPhotoName(file ? file.name : null);
                      }}
                    />
                    <div className="rounded-full bg-white/5 p-4">
                      <ImageIcon className="h-7 w-7 text-white/40" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">
                      {photoName ? photoName : "Click to upload photo"}
                    </p>
                  </label>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-red-200 ring-1 ring-red-500/30">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg sm:rounded-xl bg-[#FF9F1C] py-3 sm:py-4 text-[11px] font-black uppercase tracking-widest text-black transition-all hover:bg-[#FF8C00] active:scale-[0.98] shadow-lg shadow-orange-500/20"
              >
                {isEdit ? "Update Report" : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ReportTypeModal
        open={isTypeModalOpen}
        onClose={() => setIsTypeModalOpen(false)}
        onSelect={handleTypeChange}
      />
    </div>
  );
}
