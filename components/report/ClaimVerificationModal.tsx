"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { X, UserRound } from "lucide-react";
import type { Item } from "@/lib/types";

function getRefId(item: Item) {
  // Demo ref id derived from item.id
  const raw = item.id || "00000";
  const digits = raw.replace(/\D/g, "");
  const base = digits.slice(-5).padStart(5, "0");
  return `#${base}`;
}

export default function ClaimVerificationModal({
  open,
  item,
  onClose,
  onSubmit,
}: {
  open: boolean;
  item: Item | null;
  onClose: () => void;
  onSubmit: (payload: { itemId: string; proof: string; studentId: string }) => void;
}) {
  const [proof, setProof] = useState("");
  const [studentId, setStudentId] = useState("");

  const refId = useMemo(() => (item ? getRefId(item) : "#00000"), [item]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center px-4 py-4 sm:px-6 sm:py-8">
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close"
      />

      {/* modal */}
      <div className="relative z-301 w-full max-w-170 max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-4xl sm:rounded-[28px] bg-[#22324a] shadow-2xl ring-1 ring-white/10 flex flex-col">
        {/* header */}
        <div className="flex items-start justify-between px-6 py-6 sm:px-10 sm:py-8 shrink-0">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="mt-1 sm:mt-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-orange-500/15 ring-1 ring-orange-500/30 shrink-0">
              <UserRound className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />
            </div>

            <div>
              <div className="text-[17px] sm:text-[20px] font-semibold text-white">Identify &amp; Claim</div>
              <div className="mt-1 text-[11px] sm:text-[13px] font-semibold tracking-widest text-white/45">
                VERIFICATION PROCESS
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-0 sm:mt-1 rounded-full p-1.5 sm:p-2 bg-black/40 sm:bg-transparent text-white/80 hover:bg-white/10 shrink-0"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
        </div>

        <div className="h-px w-full bg-white/10 shrink-0" />

        {/* scrollable body */}
        <div className="overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">
          {/* item preview */}
          <div className="rounded-xl sm:rounded-2xl bg-[#18263c] p-4 sm:p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative h-20 w-20 sm:h-40 sm:w-40 overflow-hidden rounded-lg sm:rounded-xl bg-white/5 ring-1 ring-white/10 shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/30 text-[11px] sm:text-[13px]">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="truncate text-[16px] sm:text-[20px] font-semibold text-white">{item.title}</div>
                <div className="mt-1 sm:mt-3 text-[13px] sm:text-[15px] text-white/55">{item.location}</div>
                <div className="mt-1 text-[9px] sm:text-[10px] font-semibold text-orange-400">REF ID: {refId}</div>
              </div>
            </div>
          </div>

          <p className="mt-4 sm:mt-6 text-[12px] sm:text-[13px] leading-5 sm:leading-6 text-white/55 italic">
            To ensure the item reaches the rightful owner, please provide specific details that aren&apos;t
            mentioned in the public report.
          </p>

          {/* proof */}
          <div className="mt-4 sm:mt-6">
            <label htmlFor="claim-proof" className="mb-2 block text-[14px] sm:text-[15px] font-semibold text-white/80">
              Proof of Ownership / Specific Details
            </label>
            <textarea
              id="claim-proof"
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              placeholder="e.g. Serial numbers, specific contents inside, unique marks, wallpaper description..."
              className="min-h-24 sm:min-h-30 w-full resize-none rounded-xl sm:rounded-2xl bg-[#0f1e33] px-4 py-3 sm:px-5 sm:py-4 text-[13px] sm:text-[13px] text-white/80 outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-white/20"
            />
          </div>

          {/* student id */}
          <div className="mt-4 sm:mt-6">
            <label htmlFor="claim-student-id" className="mb-2 block text-[14px] sm:text-[15px] font-semibold text-white/80">
              Your Student/Staff ID Number
            </label>
            <input
              id="claim-student-id"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 2024-XXXX-XXXX"
              className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-[#0f1e33] px-4 sm:px-5 text-[13px] sm:text-[14px] text-white/80 outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-white/20"
            />
          </div>

          {/* warning */}
          <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl bg-orange-500/10 p-4 sm:p-5 ring-1 ring-orange-500/25">
            <div className="text-[12px] sm:text-[13px] leading-5 sm:leading-6 text-white/75">
              Proper identification and item verification are required. False claims may lead to disciplinary
              action as per school policy.
            </div>
          </div>

          {/* submit */}
          <button
            type="button"
            onClick={() =>
              onSubmit({
                itemId: item.id,
                proof: proof.trim(),
                studentId: studentId.trim(),
              })
            }
            className="mt-6 sm:mt-8 h-12 sm:h-14 w-full rounded-xl sm:rounded-2xl bg-orange-500 text-[14px] sm:text-[16px] font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400"
          >
            Submit Claim Request
          </button>
        </div>
      </div>
    </div>
  );
}
