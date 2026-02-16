"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, FileText, Info, Mail, LogIn } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Report", href: "/report", icon: FileText },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="floating"
      className="md:hidden border-l border-[#12223b] bg-[#020817] text-slate-100"
    >
      <SidebarHeader className="border-b border-[#12223b] bg-[#294372] text-white px-5 py-4 shadow-sm">
        <span className="text-sm font-bold uppercase tracking-widest opacity-90">
          Menu
        </span>
      </SidebarHeader>

      <SidebarContent className="bg-[#020817] px-3 py-4">
        <SidebarMenu className="gap-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <SidebarMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-base font-semibold transition-colors
                    ${
                      isActive
                        ? "bg-[#294372] text-orange-300"
                        : "text-slate-100 hover:bg-[#111827] hover:text-white"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#12223b]/50 bg-[#020817] p-3">
        <Link
          href="/login"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-base font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          <LogIn className="h-5 w-5" />
          <span>Log in</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}