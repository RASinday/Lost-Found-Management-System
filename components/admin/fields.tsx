// components/admin/fields.tsx
import { ChevronDown } from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function TextField({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#FF9F1C]/50"
      />
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
        {label}
      </label>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full resize-none rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#FF9F1C]/50"
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          defaultValue={defaultValue || ""}
          className={cx(
            "w-full cursor-pointer appearance-none rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3 pr-10",
            "text-sm text-white outline-none transition-all focus:border-[#FF9F1C]/50 focus:ring-1 focus:ring-[#FF9F1C]/30"
          )}
          style={{
            backgroundImage: "none",
            paddingRight: "2.5rem",
          }}
        >
          {options.map((o) => (
            <option key={o} value={o} style={{ backgroundColor: "#0B121E", color: "white" }}>
              {o}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <ChevronDown className="h-5 w-5 text-white/45" />
        </div>
      </div>
    </div>
  );
}
