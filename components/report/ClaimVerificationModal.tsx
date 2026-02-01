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
    <div className="fixed inset-0 z-300 flex items-center justify-center px-6 py-8">
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close"
      />

      {/* modal */}
      <div className="relative z-301 w-full max-w-170 overflow-hidden rounded-[28px] bg-[#22324a] shadow-2xl ring-1 ring-white/10">
        {/* header */}
        <div className="flex items-start justify-between px-10 py-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 ring-1 ring-orange-500/30">
              <UserRound className="h-6 w-6 text-orange-400" />
            </div>

            <div>
              <div className="text-[22px] font-semibold text-white">Identify &amp; Claim</div>
              <div className="mt-1 text-[13px] font-semibold tracking-widest text-white/45">
                VERIFICATION PROCESS
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/80 hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="h-px w-full bg-white/10" />

        {/* scrollable body */}
        <div className="max-h-[70vh] overflow-y-auto px-10 py-8">
          {/* item preview */}
          <div className="rounded-2xl bg-[#18263c] p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-5">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
                {item.image ? (
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/30 text-[12px]">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="truncate text-[18px] font-semibold text-white">{item.title}</div>
                <div className="mt-1 text-[14px] text-white/55">{item.location}</div>
                <div className="mt-2 text-[12px] font-semibold text-orange-400">REF ID: {refId}</div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[14px] leading-6 text-white/55 italic">
            To ensure the item reaches the rightful owner, please provide specific details that aren&apos;t
            mentioned in the public report.
          </p>

          {/* proof */}
          <div className="mt-6">
            <label className="mb-2 block text-[14px] font-semibold text-white/80">
              Proof of Ownership / Specific Details
            </label>
            <textarea
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              placeholder="e.g. Serial numbers, specific contents inside, unique marks, wallpaper description..."
              className="min-h-30 w-full resize-none rounded-2xl bg-[#0f1e33] px-5 py-4 text-[14px] text-white/80 outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-white/20"
            />
          </div>

          {/* student id */}
          <div className="mt-6">
            <label className="mb-2 block text-[14px] font-semibold text-white/80">
              Your Student/Staff ID Number
            </label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. 2024-XXXX-XXXX"
              className="h-12 w-full rounded-2xl bg-[#0f1e33] px-5 text-[14px] text-white/80 outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-white/20"
            />
          </div>

          {/* warning */}
          <div className="mt-8 rounded-2xl bg-orange-500/10 p-5 ring-1 ring-orange-500/25">
            <div className="text-[13px] leading-6 text-white/75">
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
            className="mt-8 h-14 w-full rounded-2xl bg-orange-500 text-[16px] font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400"
          >
            Submit Claim Request
          </button>
        </div>
      </div>
    </div>
  );
}
