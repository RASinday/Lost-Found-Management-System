"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Home, FileText, Info, Mail, Menu, LogIn } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="h-16 sm:h-18 bg-[#294372]">
        <nav className="mx-auto flex h-full w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 gap-4 sm:gap-6 md:gap-8">
          {/* LEFT: Brand */}
          <Link
            href="/home"
            className="flex items-center text-[20px] sm:text-[22px] md:text-[25px] font-medium tracking-wide shrink-0"
          >
            <Image src="/HNVSearchLogo.png" alt="HNVSearchLogo" width={32} height={32} className="mr-1.5 sm:mr-2 w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-white">HNV</span>
            <span className="text-orange-300">Search</span>
          </Link>

          {/* RIGHT: Desktop nav + Log in */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {/* Navigation links */}
            <div className="flex items-center gap-5 lg:gap-8 text-[14px] lg:text-[15px] font-medium text-white/90">
              <Link href="/home" className="flex items-center gap-2 hover:text-white transition-colors">
                <Home size={18} />
                Home
              </Link>
              <Link href="/report" className="flex items-center gap-2 hover:text-white transition-colors">
                <FileText size={18} />
                Report
              </Link>
              <Link href="/about" className="flex items-center gap-2 hover:text-white transition-colors">
                <Info size={18} />
                About
              </Link>
              <Link href="/contact" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={18} />
                Contact
              </Link>
            </div>

            {/* Log in button */}
            <Link
              href="/login"
              className="rounded-lg sm:rounded-[10px] bg-orange-500 px-4 lg:px-5 py-1.5 text-[14px] lg:text-[15px] font-semibold text-white hover:bg-orange-600 shrink-0 items-center gap-1.5 lg:gap-2 flex"
            >
              <LogIn size={16} className="lg:w-4.5 lg:h-4.5" />
              Log in
            </Link>
         </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <SidebarTrigger className="flex items-center gap-1.5 sm:gap-2 text-white hover:text-orange-300 transition-colors">
              <Menu size={20} className="sm:w-6 sm:h-6" />
            </SidebarTrigger>
          </div>
        </nav>
      </div>
    </header>
  );
}
