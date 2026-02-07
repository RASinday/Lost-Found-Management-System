// components/admin/StatCard.tsx
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function StatCard({
  icon,
  label,
  value,
  iconBg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#151F2E] p-6">
      <div
        className={cx(
          "flex h-10 w-10 items-center justify-center rounded-lg text-white",
          iconBg
        )}
      >
        {icon}
      </div>

      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.15em] text-white/45">
        {label}
      </p>
      <div className="mt-1 text-3xl font-black text-white">{value}</div>
    </div>
  );
}
