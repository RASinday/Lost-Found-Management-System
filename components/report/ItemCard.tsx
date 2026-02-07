import Image from "next/image";
import { MapPin, Clock, Tag } from "lucide-react";
import TagPill from "./TagPill";
import type { Item } from "../../lib/types";

export default function ItemCard({
  item,
  onOpen,
}: {
  item: Item;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen();
      }}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-[#223555] shadow-xl ring-1 ring-white/10"
    >
      {/* Image */}
      <div className="relative h-80 w-full overflow-hidden bg-white/5">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white">
            <span className="text-black/40 text-[20px]">No image</span>
          </div>
        )}

        {/* Pills */}
        <div className="absolute right-3 top-3 flex gap-2">
          {item.tags.map((t) => (
            <TagPill key={t} tag={t} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mt-2 p-6">
        {/* Top row: title + icon */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[25px] font-semibold text-white leading-snug">
            {item.title}
          </h3>

          {/* Keep your icon, but make it open the modal too */}
          <button
            type="button"
            className="grid h-15 w-15 shrink-0 place-items-center"
            aria-label="More"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            <Tag className="h-7 w-7" />
          </button>
        </div>

        <p className="mt-5 text-[20px] text-white/70 leading-7 line-clamp-2 min-h-30">
          {item.desc}
        </p>

        <div className="my-3 h-px w-full bg-white/10" />

        <div className="space-y-2 text-left text-[20px] leading-7 text-white/60 min-h-40">
          <div className="flex items-center gap-2">
            <MapPin className="h-10 w-7 text-amber-400" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-10 w-7 text-amber-400" />
            <span>
              {item.date} | {item.time}
            </span>
          </div>
        </div>

        {/* Removed Identify & Claim button (per your request) */}
      </div>
    </div>
  );
}
