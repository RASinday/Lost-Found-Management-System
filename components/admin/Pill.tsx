// components/admin/Pill.tsx
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Variant =
  | "lost"
  | "found"
  | "pending"
  | "approved"
  | "claimed"
  | "rejected"
  | "role"
  | "active"
  | "banned";

export default function Pill({
  variant,
  children,
  shape = "pill",
}: {
  variant: Variant;
  children: React.ReactNode;
  shape?: "pill" | "soft";
}) {
  const base = cx(
    "inline-block px-7 py-1.5 text-[10px] font-black uppercase tracking-widest border",
    shape === "pill" ? "rounded-full" : "rounded-lg"
  );

  const styles: Record<Variant, string> = {
    lost: "bg-red-500/10 text-red-400 border-red-500/20",
    found: "bg-green-500/10 text-green-400 border-green-500/20",
    pending: "bg-orange-500/10 text-[#FF9F1C] border-orange-500/20",
    approved: "bg-green-500/10 text-green-400 border-green-500/20",
    claimed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    role: "bg-[#0B121E] text-white/55 border-white/5",
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    banned: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return <span className={cx(base, styles[variant])}>{children}</span>;
}
