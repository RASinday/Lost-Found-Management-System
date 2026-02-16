"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  open: boolean;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
);

function useSidebarContext() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) {
    throw new Error("Sidebar components must be used within <SidebarProvider>");
  }
  return ctx;
}

export function SidebarProvider({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = React.useCallback(() => setOpen((o) => !o), []);
  const value = React.useMemo(() => ({ open, toggle }), [open, toggle]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: "offcanvas" | "none";
  variant?: "default" | "floating";
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      collapsible = "offcanvas",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const { open } = useSidebarContext();

    // CLOSED: slide completely to the right
    const offcanvas =
      collapsible === "offcanvas"
        ? open
          ? "translate-x-0"
          : "translate-x-full"
        : "";

    // Anchor the drawer to the RIGHT
    const variantClasses =
      variant === "floating"
        ? "fixed right-0 top-0 z-40 h-screen w-64 shadow-lg"
        : "relative h-screen w-64";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col bg-[#020817] text-slate-100 border-l border-[#12223b] transition-transform duration-200",
          variantClasses,
          offcanvas,
          className
        )}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

export const SidebarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-4 py-3", className)} {...props} />
);

export const SidebarContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 overflow-y-auto px-2 py-2", className)} {...props} />
);

export const SidebarFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-4 py-3", className)} {...props} />
);

export const SidebarMenu = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={cn("flex flex-col gap-1", className)} {...props} />
);

export const SidebarMenuItem = ({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className={cn(className)} {...props} />
);

export function SidebarTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useSidebarContext();

  return (
    <button
      type="button"
      onClick={(e) => {
        toggle();
        props.onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-transparent bg-transparent px-2 py-1 text-white hover:bg-white/10 focus:outline-none",
        className
      )}
      {...props}
    >
      {children ?? (
        <span className="block h-0.5 w-5 bg-current relative before:absolute before:-top-1.5 before:h-0.5 before:w-5 before:bg-current after:absolute after:top-1.5 after:h-0.5 after:w-5 after:bg-current" />
      )}
    </button>
  );
}
