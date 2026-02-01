"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {Search} from "lucide-react";
const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Report", href: "/report" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="h-18 bg-[#294372]">
        <nav className="mx-auto flex h-full w-full max-w-550 items-center justify-between px-10">
          {/* Brand */}
          <Link href="/home" className="text-[26px] font-medium tracking-wide">
            <Search className="h-15 inline-block mr-3 text-orange-300" />
            <span className="text-white">HNV</span>
            <span className="text-orange-300">Search</span>
          </Link>

          {/* Navigation */}
          <ul className="hidden items-center gap-20 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "relative text-[16px] font-medium transition-colors",
                      isActive
                        ? "text-orange-300"
                        : "text-white/90 hover:text-white",
                    ].join(" ")}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 h-0.75 w-full bg-orange-300" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Login */}
          <Link
            href="/login"
            className="text-[16px] font-medium text-white/90 hover:text-white"
          >
            Log in
          </Link>
        </nav>
      </div>
    </header>
  );
}
