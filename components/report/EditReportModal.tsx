"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Image as ImageIcon, X } from "lucide-react";
import type { Item } from "@/lib/types";

const CATEGORIES = ["ID / Wallet", "Phone", "Laptop", "Keys", "Bag", "Clothing", "Other"];

const LOCATIONS = [
  "Guard House",
  "Senior High Gate",
  "Junior High Gymnasium",
  "Library",
  "Cafeteria",
  "Lecture Hall",
  "Parking Area",
  "Room 204",
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
  const isOpen = open && item !== null;

  const initialCategory = useMemo(() => {
    if (!item) return CATEGORIES[0];
    // If you have a real "category" field, use it (without breaking TS)
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
    if (!isOpen || !item) return;

    setItemName(item.title ?? "");
    setCategory(initialCategory);
    setDescription(initialDesc ?? "");
    setDate(item.date ?? "");
    setTime24(time12To24(item.time || ""));
    setLocation(item.location ?? LOCATIONS[0]);

    setExistingImage(item.image);
    setPhotoFile(null);
    setPhotoName(item.image ? "Existing image" : null);
  }, [isOpen, item, initialCategory, initialDesc]);

  if (!isOpen || !item) return null;

  async function handleUpdate() {
    // ✅ hard guard so TS knows item is not null and id exists
    if (!item) {
      alert("Cannot edit: item is missing.");
      return;
    }
    const id = item.id;
    if (!id) {
      alert("Cannot edit: item id is missing.");
      return;
    }

    let image = existingImage;
    if (photoFile) {
      try {
        image = await fileToDataUrl(photoFile);
      } catch {
        image = existingImage;
      }
    }

    const anyItem = item as unknown as { category?: unknown };

    const descFinal =
      typeof anyItem.category === "string"
        ? description.trim()
        : category && category !== "Other"
          ? `Category: ${category}\n${description.trim()}`
          : description.trim();

    // ✅ Now TS is happy: id is guaranteed string here
    const updated: Item = {
      ...item,
      id, // ensure required string id
      title: itemName.trim() || item.title,
      desc: descFinal || item.desc,
      date,
      time: time24 ? time24To12(time24) : item.time,
      location,
      image,
      tags: item.tags, // keep tags unchanged
    };

    // optional: if you really have a category field in your Item, keep it updated
    if (typeof anyItem.category === "string") {
      (updated as unknown as { category?: string }).category = category;
    }

    onUpdate(updated);
  }

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center px-6 py-10">
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close edit modal"
      />

      <div className="relative z-501 w-full max-w-230 overflow-hidden rounded-[22px] bg-[#22324a] shadow-2xl ring-1 ring-white/10">
        <div className="flex items-start justify-between px-10 py-8">
          <h1 className="text-[28px] font-semibold text-white">Edit report</h1>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-2 text-white/70 hover:bg-white/5 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="px-10 py-8">
          <div className="text-[12px] font-semibold tracking-widest text-white/55">
            ITEM INFORMATION
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[18px] font-medium text-white/85">
                Item Name / Brand
              </label>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="h-12 w-full rounded-xl bg-[#18263c] px-5 text-[15px] text-white/90 outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-white/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-[18px] font-medium text-white/85">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl bg-[#18263c] px-5 pr-12 text-[15px] text-white/90 outline-none ring-1 ring-white/10 focus:ring-white/20"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-[#18263c]">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/55" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-[18px] font-medium text-white/85">
              Physical Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32.5 w-full resize-none rounded-xl bg-[#18263c] px-5 py-4 text-[15px] text-white/90 outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-white/20"
            />
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-[12px] font-semibold tracking-widest text-white/55">
                TIME &amp; LOCATION
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-[18px] font-medium text-white/85">
                  Reported Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 w-full rounded-xl bg-[#18263c] px-5 text-[15px] text-white/90 outline-none ring-1 ring-white/10 focus:ring-white/20 scheme-dark"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[18px] font-medium text-white/85">
                  Approximate time
                </label>
                <input
                  type="time"
                  value={time24}
                  onChange={(e) => setTime24(e.target.value)}
                  className="h-12 w-full rounded-xl bg-[#18263c] px-5 text-[15px] text-white/90 outline-none ring-1 ring-white/10 focus:ring-white/20 scheme-dark"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[18px] font-medium text-white/85">
                  Approximate Location
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-12 w-full appearance-none rounded-xl bg-[#18263c] px-5 pr-12 text-[15px] text-white/90 outline-none ring-1 ring-white/10 focus:ring-white/20"
                  >
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l} className="bg-[#18263c]">
                        {l}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/55" />
                </div>
              </div>
            </div>

            <div>
              <div className="text-[12px] font-semibold tracking-widest text-white/55">PHOTO</div>

              <label className="mt-6 flex h-60 cursor-pointer flex-col items-center justify-center rounded-2xl bg-[#18263c] ring-1 ring-white/10 hover:ring-white/20">
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
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <ImageIcon className="h-8 w-8 text-white/70" />
                </div>
                <div className="mt-4 text-[15px] text-white/70">
                  {photoName ? photoName : "Click to upload photos"}
                </div>
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUpdate}
            className="mt-10 h-14 w-full rounded-2xl bg-orange-500 text-[16px] font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400"
          >
            Update report
          </button>
        </div>
      </div>
    </div>
  );
}
