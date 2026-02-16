// components/admin/Modal.tsx
import React from "react";

export default function Modal({
  title,
  open,
  onClose,
  children,
  width = "max-w-2xl",
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`relative z-10 w-full ${width} overflow-hidden rounded-2xl border border-white/10 bg-[#151F2E]`}
      >
        <div className="flex items-center justify-between border-b border-white/5 p-6">
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
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
