"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
  dateLabel?: string;
  timeLabel?: string;

  date: Date | undefined;
  onDateChange: (d: Date | undefined) => void;

  time: string; // "HH:mm"
  onTimeChange: (t: string) => void;

  layout?: "stack" | "row";
};

// Converts "HH:mm" -> "h:mm AM/PM"
function formatTime12h(time: string) {
  const [hStr, mStr] = (time || "").split(":");
  const h = Number(hStr);
  const m = Number(mStr);

  if (Number.isNaN(h) || Number.isNaN(m)) return "";

  const suffix = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm} ${suffix}`;
}

export default function DatePickerTime({
  dateLabel = "Date Last Seen",
  timeLabel = "Approximate time",
  date,
  onDateChange,
  time,
  onTimeChange,
  layout = "stack",
}: Props) {
  const [open, setOpen] = React.useState(false);

  const wrapper = layout === "row" ? "grid grid-cols-2 gap-6" : "space-y-8";

  const labelClass = "text-[20px] font-semibold text-white/90";
  const fieldBase =
    "w-full rounded-2xl bg-[#0f1f36] ring-1 ring-white/15 focus-visible:ring-2 focus-visible:ring-amber-400/60";

  return (
    <div className={wrapper}>
      {/* Date */}
      <div>
        <label className={labelClass}>{dateLabel}</label>

        <div className="mt-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={[
                  fieldBase,
                  "h-15 justify-between px-5",
                  "border-0 text-[18px] font-medium text-white/90",
                  "hover:bg-[#132645] hover:text-white",
                ].join(" ")}
              >
                <span className={!date ? "text-white/55" : ""}>
                  {date ? format(date, "PPP") : "Pick a date"}
                </span>

                {/* keep icon normal size; your previous h-20 w-20 is huge */}
                <ChevronDownIcon className="h-5 w-5 text-white/70" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto rounded-2xl border border-white/10 bg-[#0f1f36] p-4 shadow-2xl"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                defaultMonth={date}
                onSelect={(d: Date | undefined) => {
                  onDateChange(d);
                  setOpen(false);
                }}
                initialFocus
                showOutsideDays
                fixedWeeks
                className="p-0"
                classNames={{
                  months: "flex flex-col",
                  month: "space-y-4",

                  // month title centered + arrows left/right
                  caption: "relative flex items-center justify-center py-2",
                  caption_label: "text-[20px] font-semibold text-white",
                  nav: "absolute left-0 right-0 flex items-center justify-between px-2",
                  nav_button:
                    "h-12 w-12 rounded-xl bg-white/5 text-white hover:bg-white hover:text-black transition-colors",

                  // weekday row + days (kept minimal, you can add more if needed)
                  day: "h-14 w-14 rounded-xl text-[20px] font-semibold text-white/90 hover:bg-white/10",
                  day_selected:
                    "bg-white text-[#07121f] hover:bg-white hover:text-[#07121f] focus:bg-white focus:text-[#07121f]",
                  day_today: "ring-2 ring-amber-400/70",
                  day_outside: "text-white/30 opacity-50",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Time */}
      <div>
      <label className={labelClass}>{timeLabel}</label>

      <Input
         type="time"
         step="60"
         value={time}
         onChange={(e) => onTimeChange(e.target.value)}
         className={[
            fieldBase,
            "mt-3 h-15 px-5",
            "border-0 text-[20px] font-medium text-white/90",
            "placeholder:text-white/55",
            "[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
         ].join(" ")}
      />
      </div>
    </div>
  );
}
