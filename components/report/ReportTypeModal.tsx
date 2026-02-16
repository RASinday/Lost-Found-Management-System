"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

export type ReportType = "lost" | "found";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (type: ReportType) => void;
}

export default function ReportTypeModal({ open, onClose, onSelect }: Props) {
  if (!open) return null;

  const handleSelect = (type: ReportType) => {
    onSelect(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      {/* Backdrop with blur */}
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal container */}
      <div className="relative z-101 w-full max-w-200 rounded-[30px] bg-[#22324a] p-10 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-center text-[30px] font-semibold text-white">
          What would you like to report?
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <button
            onClick={() => handleSelect("lost")}
            className="group flex flex-col items-center rounded-2xl bg-[#18263c] p-8 text-center ring-1 ring-white/10 transition hover:ring-white/20"
          >
            <div className="mb-10 flex h-15 w-15 items-center justify-center rounded-2xl bg-red-500/20 ring-1 ring-red-500/40">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>

            <div className="text-[20px] font-semibold text-white">
              I lost an item
            </div>

            <p className="mt-5 text-[15px] leading-6 text-white/65">
              Submit a report if you lost something on campus.
            </p>
          </button>

          <button
            onClick={() => handleSelect("found")}
            className="group flex flex-col items-center rounded-2xl bg-[#18263c] p-8 text-center ring-1 ring-white/10 transition hover:ring-white/20"
          >
            <div className="mb-10 flex h-15 w-15 items-center justify-center rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-500/40">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>

            <div className="text-[20px] font-semibold text-white">
              I found an item
            </div>

            <p className="mt-5 text-[15px] leading-6 text-white/65">
              Help a fellow student by reporting a found item.
            </p>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mx-auto mt-10 block text-[15px] font-medium text-white/60 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
