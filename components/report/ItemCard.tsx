import Image from "next/image";
import { MapPin, Clock, Tag } from "lucide-react";
import TagPill from "./TagPill";
import type { Item } from "../../lib/types";

export default function ItemCard({
  item,
  onOpen,
  eager = false,
}: {
  item: Item;
  onOpen: () => void;
  eager?: boolean;
}) {
  const displayDescription = (() => {
    const raw = item.desc ?? "";
    const match = raw.match(/^Category:\s.*(?:\r?\n\r?\n|\r?\n)?([\s\S]*)$/);
    return (match ? match[1] : raw).trimStart();
  })();

  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen();
      }}
      className="group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-[#223555] shadow-xl ring-1 ring-white/10 transition-all hover:ring-white/20"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden bg-white/5">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            loading={eager ? "eager" : "lazy"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white">
            <span className="text-black/40 text-[14px] sm:text-[15px]">No image</span>
          </div>
        )}

        {/* Pills */}
        <div className="absolute right-2 top-2 sm:right-3 sm:top-3 flex gap-1.5 sm:gap-2">
          {item.tags.map((t) => (
            <TagPill key={t} tag={t} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <div className="space-y-3 sm:space-y-4">
          {/* Top row: title + icon */}
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <h3 className="text-[17px] sm:text-[18px] md:text-[20px] font-semibold text-white leading-snug">
              {item.title}
            </h3>

            {/* Keep your icon, but make it open the modal too */}
            <button
              type="button"
              className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center"
              aria-label="More"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            >
              <Tag className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <p className="text-[14px] sm:text-[15px] text-white/70 leading-6 sm:leading-7 line-clamp-2 min-h-24 sm:min-h-30">
            {displayDescription}
          </p>

          <div className="h-px w-full bg-white/10" />

          <div className="space-y-1.5 sm:space-y-2 text-left text-[12px] sm:text-[13px] leading-6 sm:leading-7 text-white/60 min-h-24 sm:min-h-30">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 shrink-0" />
              <span>
                {item.date} | {item.time}
              </span>
            </div>
          </div>
        </div>

        {/* Removed Identify & Claim button (per your request) */}
      </div>
    </div>
  );
}
