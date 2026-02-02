"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="h-18 bg-[#294372]">
        <nav className="relative mx-auto flex h-full w-full items-center px-4 sm:px-10">
          {/* LEFT: Brand */}
          <Link
            href="/home"
            className="flex items-center text-[22px] sm:text-[26px] font-medium tracking-wide"
          >
            <Search className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-orange-300" />
            <span className="text-white">HNV</span>
            <span className="text-orange-300">Search</span>
          </Link>

          {/* CENTER: Desktop nav (Home / Report / About / Contact) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-medium text-white/90">
            <Link href="/home" className="hover:text-white">
              Home
            </Link>
            <Link href="/report" className="hover:text-white">
              Report
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>

          {/* RIGHT: Log in on desktop, sidebar trigger on mobile */}
          <div className="ml-auto flex items-center gap-3">
            {/* Desktop Log in */}
            <Link
              href="/login"
              className="hidden md:inline-flex rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Log in
            </Link>

            {/* Mobile menu button */}
            <SidebarTrigger className="text-white md:hidden" />
          </div>
        </nav>
      </div>
    </header>
  );
}
