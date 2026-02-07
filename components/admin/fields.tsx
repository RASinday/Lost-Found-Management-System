// components/admin/fields.tsx
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
      <select
        name={name}
        defaultValue={defaultValue}
        className={cx(
          "w-full cursor-pointer appearance-none rounded-lg border border-white/5 bg-[#0B121E] px-5 py-3",
          "text-sm text-white outline-none transition-colors focus:border-[#FF9F1C]/50"
        )}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0B121E]">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
