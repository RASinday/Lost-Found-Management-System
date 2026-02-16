"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="h-18 bg-[#294372]">
        <nav className="mx-auto flex h-full w-full items-center justify-between px-4 sm:px-10 gap-8">
          {/* LEFT: Brand */}
          <Link
            href="/home"
            className="flex items-center text-[25px] font-medium tracking-wide shrink-0"
          >
            <Image src="/HNVSearchLogo.png" alt="HNVSearchLogo" width={40} height={40} className="mr-2" />
            <span className="text-white">HNV</span>
            <span className="text-orange-300">Search</span>
          </Link>

          {/* RIGHT: Desktop nav + Log in */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation links */}
            <div className="flex items-center gap-8 text-[15px] font-medium text-white/90">
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

            {/* Log in button */}
            <Link
              href="/login"
              className="rounded-[10px] bg-orange-500 px-5 py-1.5 text-[15px] font-semibold text-white hover:bg-orange-600 shrink-0"
            >
              Log in
            </Link>
          </div>

          {/* Mobile menu button */}
          <SidebarTrigger className="text-white md:hidden" />
        </nav>
      </div>
    </header>
  );
}
