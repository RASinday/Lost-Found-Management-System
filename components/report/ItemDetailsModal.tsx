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
    <div className="fixed inset-0 z-200 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Compact floating card */}
      <div className="relative z-201 w-full max-w-125 my-auto overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-[#1e2b44] to-[#151f2e] shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200">
        {/* Close button - always visible at top right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 rounded-full p-2 sm:p-2.5 bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm transition-colors shadow-lg"
          aria-label="Close"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Image section with overlay */}
        <div className="relative">
          <div className="relative aspect-4/3 sm:aspect-video overflow-hidden bg-white">
            {item.image ? (
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover" 
                sizes="(max-width: 640px) 100vw, 500px"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-black/40 text-[16px] sm:text-[18px]">No image</span>
              </div>
            )}
            
            {/* Tags overlay on image */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
              {item.tags.map((t) => (
                <TagPill key={t} tag={t} />
              ))}
            </div>

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />
          </div>
        </div>

        {/* Content section - compact and scrollable */}
        <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 max-h-[50vh] overflow-y-auto">
          {/* Title and Edit button */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[19px] sm:text-[22px] font-bold text-white leading-tight flex-1">
              {item.title}
            </h2>
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white/90 ring-1 ring-white/10 hover:bg-white/20 transition-colors"
              aria-label="Edit item"
            >
              <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Description */}
          <div>
            <div className="text-[11px] sm:text-[12px] font-bold tracking-widest text-orange-400 mb-2">
              DESCRIPTION
            </div>
            <p className="text-[13px] sm:text-[14px] leading-6 text-white/80">
              {item.desc}
            </p>
          </div>

          {/* Location and Date - compact grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-white/40 mb-1.5">
                LOCATION
              </div>
              <div className="flex items-start gap-2 text-[12px] sm:text-[13px] text-white/85">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{item.location}</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-white/40 mb-1.5">
                DATE
              </div>
              <div className="flex items-start gap-2 text-[12px] sm:text-[13px] text-white/85">
                <Calendar className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{item.date}</span>
              </div>
            </div>
          </div>

          {/* Claim button - fixed at bottom */}
          {showClaim && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onStartClaim(item)}
                className="w-full rounded-xl sm:rounded-2xl bg-orange-500 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-bold text-white shadow-lg shadow-orange-500/30 hover:bg-orange-400 transition-all hover:shadow-orange-500/50 active:scale-[0.98]"
              >
                <ShieldCheck className="mr-2 inline-block h-5 w-5" />
                Claim this Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
