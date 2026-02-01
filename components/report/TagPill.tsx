import type { Status } from "../../lib/types";

const styles: Record<Status, string> = {
  FOUND: "bg-emerald-500/90",
  LOST: "bg-rose-500/90",
  REPORTED: "bg-orange-500/90",
  CLAIM: "bg-sky-500/90",
};

export default function TagPill({ tag }: { tag: Status }) {
  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[10px] font-semibold text-white uppercase",
        styles[tag],
      ].join(" ")}
    >
      {tag === "CLAIM" ? "CLAIMED" : tag}
    </span>
  );
}
