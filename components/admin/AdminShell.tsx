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
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-16 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
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
              <p className="mt-2 text-sm text-white/45">{subtitle}</p>
            ) : null}
          </div>

          {right ? <div className="shrink-0">{right}</div> : null}
        </div>

        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
