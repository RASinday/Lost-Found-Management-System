"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { Tab } from "@/lib/types";

// Reuse the same type as your tabs
export type ReportFilter = Tab;

const FILTERS: { key: ReportFilter; label: string }[] = [
  { key: "all", label: "All Items" },
  { key: "reported", label: "Reported / Unclaimed" },
  { key: "claimed", label: "Successfully Claimed" },
];

export function ReportFilters({
  value,
  onChange,
}: {
  value: ReportFilter;
  onChange: (value: ReportFilter) => void;
}) {
  return (
    <div className="w-full">
      {/* MOBILE & TABLET: dropdown */}
      <div className="lg:hidden">
        <div className="relative">
          <select
            name="report-filter"
            className="w-full appearance-none rounded-lg sm:rounded-xl border border-slate-700 bg-[#020817] px-3 sm:px-4 py-3 sm:py-4 pr-9 sm:pr-10 text-base sm:text-lg md:text-xl font-semibold text-slate-100"
            value={value}
            onChange={(e) => onChange(e.target.value as ReportFilter)}
          >
            {FILTERS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="pointer-events-none absolute right-3 sm:right-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-slate-300"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* DESKTOP: pill buttons */}
      <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-wrap">
        {FILTERS.map((f) => {
          const active = value === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onChange(f.key)}
              className={`rounded-full px-5 xl:px-7 py-2.5 xl:py-3 text-sm xl:text-base font-semibold transition-colors
                ${
                  active
                    ? "bg-[#294372] text-white"
                    : "bg-transparent text-slate-200 hover:bg-slate-800"
                }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}