import Image from "next/image";
import { MapPin, Clock, Tag } from "lucide-react";
import TagPill from "./TagPill";
import type { Item } from "./types";

function canIdentify(item: Item) {
  return item.tags.includes("REPORTED") && !item.tags.includes("CLAIM");
}

export default function ItemCard({ item }: { item: Item }) {
  const showButton = canIdentify(item);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#223555] shadow-xl ring-1 ring-white/10">
      {/* Image */}
      <div className="relative h-80 w-full bg-white/5">
        {item.image ? (
          <Image src={item.image} alt={item.title} fill className="object-cover" />
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

          <button
            className="grid h-15 w-15 shrink-0 place-items-center"
            aria-label="More"
          >
            <Tag className="h-7 w-7" />
          </button>
        </div>

        {/* Description: fixed height so cards match even if text short/long */}
        <p className="mt-5 text-[20px] text-white/70 leading-7 line-clamp-2 min-h-30">
          {item.desc}
        </p>

        <div className="my-3 h-px w-full bg-white/10" />

        {/* Meta info: fixed block height for consistent spacing */}
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

        {showButton && (
          <button className="mt-5 w-full rounded-xl bg-[#3b5a86] py-2.5 text-[20px] font-semibold text-white hover:bg-[#45679a]">
            Identify &amp; Claim
          </button>
        )}
      </div>
    </div>
  );
}
