"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Image as ImageIcon, X } from "lucide-react";
import type { Item } from "@/lib/types";

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

function time12To24(t: string): string {
  const s = (t || "").trim();
  const m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return "";
  let hh = Number(m[1]);
  const mm = m[2];
  const ap = m[3].toUpperCase();
  if (ap === "AM") {
    if (hh === 12) hh = 0;
  } else {
    if (hh !== 12) hh += 12;
  }
  return `${String(hh).padStart(2, "0")}:${mm}`;
}

function time24To12(time: string): string {
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

function extractCategoryFromDesc(desc: string) {
  const lines = (desc || "").split("\n");
  const first = (lines[0] || "").trim();
  const m = first.match(/^Category:\s*(.+)$/i);
  if (!m) return { category: null as string | null, cleanDesc: desc };
  const category = m[1].trim();
  const cleanDesc = lines.slice(1).join("\n").trimStart();
  return { category, cleanDesc };
}

export default function EditReportModal({
  open,
  item,
  onClose,
  onUpdate,
}: {
  open: boolean;
  item: Item | null;
  onClose: () => void;
  onUpdate: (updated: Item) => void;
}) {
  // keep hooks safe (they must run regardless)
  const initialCategory = useMemo(() => {
    if (!item) return CATEGORIES[0];

    // supports future `category` field if you add it later
    const anyItem = item as unknown as { category?: unknown };
    if (typeof anyItem.category === "string" && anyItem.category) return anyItem.category;

    const parsed = extractCategoryFromDesc(item.desc || "");
    if (parsed.category && CATEGORIES.includes(parsed.category)) return parsed.category;

    return CATEGORIES[0];
  }, [item]);

  const initialDesc = useMemo(() => {
    if (!item) return "";
    const anyItem = item as unknown as { category?: unknown };
    if (typeof anyItem.category === "string") return item.desc || "";
    return extractCategoryFromDesc(item.desc || "").cleanDesc || "";
  }, [item]);

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time24, setTime24] = useState("");
  const [location, setLocation] = useState(LOCATIONS[0]);

  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!open || !item) return;

    setItemName(item.title ?? "");
    setCategory(initialCategory);
    setDescription(initialDesc ?? "");
    setDate(item.date ?? "");
    setTime24(time12To24(item.time || ""));
    setLocation(item.location ?? LOCATIONS[0]);

    setExistingImage(item.image);
    setPhotoFile(null);
    setPhotoName(item.image ? "Existing image" : null);
  }, [open, item, initialCategory, initialDesc]);

  // ✅ render guard
  if (!open || !item) return null;

  // ✅ after this line, item is Item (not null)
  const base: Item = item;

  async function handleUpdate() {
    let image = existingImage;
    if (photoFile) {
      try {
        image = await fileToDataUrl(photoFile);
      } catch {
        image = existingImage;
      }
    }

    const anyBase = base as unknown as { category?: unknown };

    const descFinal =
      typeof anyBase.category === "string"
        ? description.trim()
        : category && category !== "Other"
          ? `Category: ${category}\n${description.trim()}`
          : description.trim();

    // ✅ Item is satisfied: id is required string from base.id
    const updated: Item = {
      ...base,
      id: base.id,
      title: itemName.trim() || base.title,
      desc: descFinal || base.desc,
      date,
      time: time24 ? time24To12(time24) : base.time,
      location,
      image,
      tags: base.tags,
    };

    // optional future support if you add category to Item later
    if (typeof anyBase.category === "string") {
      (updated as unknown as { category?: string }).category = category;
    }

    onUpdate(updated);
  }

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Close edit modal" />

      <div className="relative z-501 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#151F2E]">
        <div className="flex items-center justify-between border-b border-white/5 p-6">
          <h1 className="text-xl font-black text-white">Edit Report</h1>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-[15px] font-black text-white/45">
                ITEM INFORMATION
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Item Name / Brand
                  </label>
                  <input
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#FF9F1C]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Category
                  </label>
                  <div className="relative">
                    <select
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
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                  Physical Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#FF9F1C]/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                  Time &amp; Location
                </p>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Reported Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors focus:border-[#FF9F1C]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Approximate Time
                  </label>
                  <input
                    type="time"
                    value={time24}
                    onChange={(e) => setTime24(e.target.value)}
                    className="w-full rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors focus:border-[#FF9F1C]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Approximate Location
                  </label>
                  <div className="relative">
                    <select
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

            <button
              type="button"
              onClick={handleUpdate}
              className="w-full rounded-xl bg-[#FF9F1C] py-4 text-[11px] font-black uppercase tracking-widest text-black transition-colors hover:bg-[#FF8C00] active:scale-[0.99]"
            >
              Update Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
