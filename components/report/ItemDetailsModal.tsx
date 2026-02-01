"use client";

import Image from "next/image";
import { X, MapPin, Calendar, ShieldCheck, Pencil } from "lucide-react";
import TagPill from "./TagPill";
import type { Item } from "@/lib/types";

function canClaim(item: Item) {
  return item.tags.includes("REPORTED") && !item.tags.includes("CLAIM");
}

export default function ItemDetailsModal({
  open,
  item,
  onClose,
  onStartClaim,
  onEdit,
}: {
  open: boolean;
  item: Item | null;
  onClose: () => void;
  onStartClaim: (item: Item) => void;
  onEdit: (item: Item) => void;
}) {
  if (!open || !item) return null;

  const showClaim = canClaim(item);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="relative z-[201] w-full max-w-[1200px] overflow-hidden rounded-[32px] bg-[#223555] shadow-2xl ring-1 ring-white/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-8 top-7 rounded-full p-3 text-white/80 hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left image */}
          <div className="relative min-h-[420px] bg-white">
            {item.image ? (
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            ) : (
              <div className="flex h-full min-h-[420px] w-full items-center justify-center">
                <span className="text-black/40 text-[20px]">No image</span>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="p-10">
            <div className="flex flex-wrap gap-3 pr-16">
              {item.tags.map((t) => (
                <TagPill key={t} tag={t} />
              ))}
            </div>

            <div className="mt-6 flex items-start justify-between gap-4">
              <h2 className="text-[34px] font-semibold text-white leading-tight">{item.title}</h2>

              {/* edit icon */}
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-white/90 ring-1 ring-white/10 hover:bg-white/15"
                aria-label="Edit item"
              >
                <Pencil className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6">
              <div className="text-[14px] font-semibold tracking-widest text-orange-400">DESCRIPTION</div>
              <p className="mt-3 text-[18px] leading-7 text-white/75">{item.desc}</p>
            </div>

            <div className="my-8 h-px w-full bg-white/10" />

            <div className="grid grid-cols-2 gap-10">
              <div>
                <div className="text-[13px] font-semibold tracking-widest text-white/45">LOCATION</div>
                <div className="mt-3 flex items-center gap-3 text-[18px] text-white/80">
                  <MapPin className="h-5 w-5 text-amber-400" />
                  <span>{item.location}</span>
                </div>
              </div>

              <div>
                <div className="text-[13px] font-semibold tracking-widest text-white/45">REPORTED DATE</div>
                <div className="mt-3 flex items-center gap-3 text-[18px] text-white/80">
                  <Calendar className="h-5 w-5 text-amber-400" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>

            {/* bottom action */}
            <div className="mt-10">
              {showClaim && (
                <button
                  type="button"
                  onClick={() => onStartClaim(item)}
                  className="mt-6 w-full rounded-2xl bg-orange-500 py-4 text-[18px] font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400"
                >
                  <ShieldCheck className="mr-3 inline-block h-6 w-6" />
                  Claim this Item
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
