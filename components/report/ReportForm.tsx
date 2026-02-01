"use client";

import * as React from "react";
import { X } from "lucide-react";
import type { ReportKind, Item } from "../../lib/types";

type Props = {
  open: boolean;
  kind: ReportKind; // "lost" | "found"
  onClose: () => void;
  onBack: () => void;
  onCreate: (item: Item) => void;
};

function formatTime12h(time: string) {
  const [hStr, mStr] = (time || "").split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return "";

  const suffix = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm} ${suffix}`;
}

export default function ReportFormModal({
  open,
  kind,
  onClose,
  onBack,
  onCreate,
}: Props) {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("ID / Wallet");
  const [desc, setDesc] = React.useState("");
  const [date, setDate] = React.useState<string>(""); // YYYY-MM-DD
  const [time, setTime] = React.useState<string>(""); // HH:mm
  const [location, setLocation] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState<string | undefined>(undefined);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    if (!open) return;
    setError("");
  }, [open]);

  React.useEffect(() => {
    return () => {
      if (photoUrl?.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  if (!open) return null;

  const isLost = kind === "lost";
  const titleText = isLost ? "Report Lost Item" : "Report Found Item";
  const dateLabel = isLost ? "Date Last Seen" : "Date Found";

  function resetForm() {
    setTitle("");
    setCategory("ID / Wallet");
    setDesc("");
    setDate("");
    setTime("");
    setLocation("");
    setPhotoUrl(undefined);
    setError("");
  }

  function validate() {
    if (!title.trim()) return "Item Name / Brand is required.";
    if (!category.trim()) return "Category is required.";
    if (!desc.trim()) return "Physical Description is required.";
    if (!date.trim()) return `${dateLabel} is required.`;
    if (!time.trim()) return "Approximate time is required.";
    if (!location.trim()) return "Approximate Location is required.";
    return "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    const newItem: Item = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
      title: title.trim(),
      desc: desc.trim(),
      location: location.trim(),
      date,
      time: formatTime12h(time),
      image: photoUrl,
      tags: [isLost ? "LOST" : "FOUND", "REPORTED"],
    };

    onCreate(newItem);
    resetForm();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-6">
      {/* blurred overlay */}
      <button
        className="absolute inset-0 bg-[#07121f]/70 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="relative w-full max-w-190 overflow-hidden rounded-[28px] bg-[#2b3f5f]/80 ring-1 ring-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 p-8">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="text-[14px] font-semibold text-amber-400 hover:underline"
            >
              ← CHANGE TYPE
            </button>
            <h2 className="mt-2 text-[28px] font-semibold text-white">{titleText}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/80 hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* ITEM INFORMATION */}
          <div className="text-[16px] font-semibold tracking-wide text-white/70">
            ITEM INFORMATION
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-[20px] font-semibold text-white/90">Item Name / Brand</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g iPhone 17, Key, Notebook"
                className="mt-3 h-15 w-full rounded-2xl bg-[#0f1f36] px-5 text-[20px] font-medium text-white/90 ring-1 ring-white/15 outline-none focus:ring-2 focus:ring-amber-400/60"
              />
            </div>

            <div>
              <label className="text-[20px] font-semibold text-white/90">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-3 h-15 w-full rounded-2xl bg-[#0f1f36] px-5 text-[20px] font-medium text-white/90 ring-1 ring-white/15 outline-none focus:ring-2 focus:ring-amber-400/60"
              >
                <option>ID / Wallet</option>
                <option>Gadget</option>
                <option>Bag</option>
                <option>Book / Stationery</option>
                <option>Clothing / Accessory</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-[20px] font-semibold text-white/90">Physical Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Color, size, material, distinguishing marks..."
              className="mt-3 min-h-35 w-full resize-none rounded-2xl bg-[#0f1f36] px-5 py-4 text-[20px] font-medium text-white/90 ring-1 ring-white/15 outline-none focus:ring-2 focus:ring-amber-400/60"
            />
          </div>

          {/* TIME & LOCATION + PHOTO */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-[16px] font-semibold tracking-wide text-white/70">
                TIME &amp; LOCATION
              </div>

              <div className="mt-6">
                <label className="text-[20px] font-semibold text-white/90">{dateLabel}</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-3 h-15 w-full rounded-2xl bg-[#0f1f36] px-5 text-[20px] font-medium text-white/90 ring-1 ring-white/15 outline-none focus:ring-2 focus:ring-amber-400/60"
                />
              </div>

              <div className="mt-6">
                <label className="text-[20px] font-semibold text-white/90">Approximate time</label>
                <input
                  type="time"
                  step="60"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-3 h-15 w-full rounded-2xl bg-[#0f1f36] px-5 text-[20px] font-medium text-white/90 ring-1 ring-white/15 outline-none focus:ring-2 focus:ring-amber-400/60"
                />
              </div>

              <div className="mt-6">
                <label className="text-[20px] font-semibold text-white/90">Approximate Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Guard House"
                  className="mt-3 h-15 w-full rounded-2xl bg-[#0f1f36] px-5 text-[20px] font-medium text-white/90 ring-1 ring-white/15 outline-none focus:ring-2 focus:ring-amber-400/60"
                />
              </div>
            </div>

            <div>
              <div className="text-[16px] font-semibold tracking-wide text-white/70">PHOTO</div>

              <label className="mt-6 flex h-57.5 w-full cursor-pointer flex-col items-center justify-center rounded-2xl bg-[#0f1f36] ring-1 ring-white/15 hover:bg-white/5">
                <div className="text-[20px] font-semibold text-white/70">Click to upload photos</div>
                <div className="mt-3 text-[16px] text-white/50">(Optional)</div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (photoUrl?.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
                    setPhotoUrl(URL.createObjectURL(file));
                  }}
                />
              </label>

              {photoUrl && (
                <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <img src={photoUrl} alt="Preview" className="h-40 w-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-8 rounded-2xl bg-red-500/10 px-6 py-4 text-[18px] text-red-200 ring-1 ring-red-500/30">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-10 h-16 w-full rounded-2xl bg-orange-500 text-[20px] font-semibold text-white shadow-lg shadow-black/30 hover:bg-orange-400"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
