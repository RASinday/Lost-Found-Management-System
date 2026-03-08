// components/admin/AdminShell.tsx
import React from "react";

export default function AdminShell({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-[#0B121E]">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 pb-12 sm:pb-14 md:pb-16 pt-12 sm:pt-14 md:pt-16">
        <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              {title.split(" ").map((w, i) =>
                w.toLowerCase() === "panel" ? (
                  <span key={i} className="text-[#FF9F1C]">
                    {" "}
                    {w}
                  </span>
                ) : (
                  <span key={i}>{i === 0 ? w : ` ${w}`}</span>
                )
              )}
            </h1>
            {subtitle ? (
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/45">{subtitle}</p>
            ) : null}
          </div>

          {right ? <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">{right}</div> : null}
        </div>

        <div className="mt-6 sm:mt-7 md:mt-8">{children}</div>
      </section>
    </main>
  );
}
