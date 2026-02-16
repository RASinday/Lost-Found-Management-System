// components/admin/Tabs.tsx
export type TabOption<T extends string> = { key: T; label: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: TabOption<T>[];
}) {
  return (
    <div className="inline-flex rounded-xl border border-white/5 bg-[#151F2E] p-1">
      {options.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "rounded-lg px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors",
              active ? "bg-[#FF9F1C] text-black" : "text-white/55 hover:text-white"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
