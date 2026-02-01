"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MoveLeft, ChevronDown, Image as ImageIcon, X } from "lucide-react";

import type { Item, Status } from "@/lib/types";
import { addTempReport, updateTempItem, getTempItems } from "@/lib/tempReportsStore";

type ReportType = "lost" | "found";

const CATEGORIES = ["ID / Wallet", "Phone", "Laptop", "Keys", "Bag", "Clothing", "Other"];

const LOCATIONS = [
  "Guard House",
  "Library",
  "Cafeteria",
  "Lecture Hall",
  "Parking",
  "Sports Complex",
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

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
    let tags: Status[] = [type === "lost" ? "LOST" : "FOUND", "REPORTED"];

    if (isEdit && existingItem) {
      // preserve existing tags like CLAIM
      // also preserve LOST/FOUND based on page type
      const preserved = existingItem.tags.filter((t) => t === "CLAIM");
      tags = Array.from(new Set<Status>([...tags, ...preserved]));
    }

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
    <div className="relative min-h-screen bg-[#07121f] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(59,130,246,0.10),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_0%_60%,rgba(249,115,22,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_100%_55%,rgba(34,197,94,0.08),transparent_60%)]" />
      </div>

      <div className="absolute inset-0 bg-black/55 backdrop-blur-md" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-220 rounded-[22px] bg-[#22324a] shadow-2xl ring-1 ring-white/10"
        >
          <div className="flex items-start justify-between px-8 py-7">
            <div>
              <button
                type="button"
                onClick={() => router.push("/report")}
                className="text-[15px] font-semibold tracking-wide text-orange-400 hover:text-orange-300"
              >
                <MoveLeft className="mr-2 inline-block h-5 w-5" />
                CHANGE TYPE
              </button>

              <h1 className="mt-2 text-[25px] font-semibold text-white">{title}</h1>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={() => router.push("/report")}
              className="rounded-lg p-2 text-white/70 hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-px w-full bg-white/15" />

          <div className="px-8 py-7">
            <div className="text-[15px] font-semibold tracking-widest text-white/55">
              ITEM INFORMATION
            </div>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[20px] font-medium text-white/75">
                  Item Name / Brand
                </label>
                <input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g iPhone, Key, Notebook"
                  className="h-10 w-full rounded-xl bg-[#18263c] px-4 text-[15px] text-white/90 outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-white/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-[20px] font-medium text-white/75">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-10 w-full appearance-none rounded-xl bg-[#18263c] px-4 pr-10 text-[15px] text-white/90 outline-none ring-1 ring-white/10 focus:ring-white/20"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-[#18263c]">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-[20px] font-medium text-white/75">
                Physical Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Color, size, material, distinguishing marks..."
                className="w-full resize-none rounded-xl bg-[#18263c] px-4 py-3 text-[15px] text-white/90 outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-white/20"
              />
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="text-[12px] font-semibold tracking-widest text-white/55">
                  TIME & LOCATION
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-[20px] font-medium text-white/75">
                    {dateLabel}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-10 w-full rounded-xl bg-[#18263c] px-4 text-[15px] text-white/90 outline-none ring-1 ring-white/10 focus:ring-white/20 scheme-dark"
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-[20px] font-medium text-white/75">
                    {timeLabel}
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="h-10 w-full rounded-xl bg-[#18263c] px-4 text-[15px] text-white/90 outline-none ring-1 ring-white/10 focus:ring-white/20 scheme-dark"
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-[20px] font-medium text-white/75">
                    Approximate Location
                  </label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="h-10 w-full appearance-none rounded-xl bg-[#18263c] px-4 pr-10 text-[15px] text-white/90 outline-none ring-1 ring-white/10 focus:ring-white/20"
                    >
                      {LOCATIONS.map((l) => (
                        <option key={l} value={l} className="bg-[#18263c]">
                          {l}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[12px] font-semibold tracking-widest text-white/55">
                  PHOTO
                </div>

                <label className="mt-5 flex h-53 cursor-pointer flex-col items-center justify-center rounded-2xl bg-[#22324a] ring-1 ring-white/10 hover:ring-white/20">
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
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <ImageIcon className="h-7 w-7 text-white/70" />
                  </div>

                  <div className="mt-4 text-[15px] text-white/70">
                    {photoName ? photoName : "Click to upload photos"}
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 h-12 w-full rounded-xl bg-orange-500 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/15 hover:bg-orange-400"
            >
              {isEdit ? "Save Changes" : "Submit Report"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
