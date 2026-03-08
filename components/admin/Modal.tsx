// components/admin/Modal.tsx
import React from "react";

export default function Modal({
  title,
  open,
  onClose,
  children,
  width = "max-w-2xl",
  mobileAlign = "top",
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  mobileAlign?: "top" | "center";
}) {
  if (!open) return null;

  const mobilePositionClass = mobileAlign === "center" ? "items-center" : "items-start";

  return (
    <div className={`fixed inset-0 z-100 flex ${mobilePositionClass} justify-center overflow-y-auto px-4 py-4 sm:items-center sm:py-8`}>
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`relative z-10 flex max-h-[95vh] w-full ${width} flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151F2E] sm:max-h-[90vh]`}
      >
        <div className="shrink-0 flex items-center justify-between border-b border-white/5 p-4 sm:p-6">
          <h3 className="text-xl font-black text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
