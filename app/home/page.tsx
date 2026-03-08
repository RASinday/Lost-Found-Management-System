import Image from "next/image";
import Link from "next/link";
import PurposeCard from "@/components/PurposeCard";
import { Waypoints, Speech, MonitorCog, Handshake } from "lucide-react";

const purposeItems = [
  {
    title: "Improved Information Dissemination",
    description: "Allow users to view update information anytime and anywhere.",
    icon: <Waypoints className="text-amber-400 text-xl" />,
  },
  {
    title: "Better Finder-Owner Communication",
    description:
      "As a channel for their transaction where they discuss item descriptions.",
    icon: <Speech className="text-amber-400 text-xl" />,
  },
  {
    title: "Systematic Process",
    description:
      "Provides an organized and structured process in reporting, documenting, and claiming lost and found items.",
    icon: <MonitorCog className="text-amber-400 text-xl" />,
  },
  {
    title: "Promote Cooperation",
    description:
      "HNSians will unite together and help in finding and returning lost item to their rightful owner.",
    icon: <Handshake className="text-amber-400 text-xl" />,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ================= HERO / HOME SECTION ================= */}
      <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white">
        <Image
          src="/HNVS1.png"
          alt="HNVS campus background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <main className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-6xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-semibold leading-none tracking-wide">
              <span className="text-white">HNV</span>
              <span className="text-amber-400">Search</span>
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[30px] leading-snug text-white/85 px-2 sm:px-4">
              Welcome to HNVS' first ever Web-based Lost-and-found
              <br className="hidden sm:block" />
              Management System
            </p>

            <div className="mt-10 sm:mt-12 md:mt-15 flex justify-center">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 sm:gap-3 md:gap-5 rounded-lg sm:rounded-xl bg-[#3d5e93] px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg lg:text-[18px] font-semibold shadow-lg shadow-black/30 transition hover:bg-[#4a6daa]"
              >
                Get Started <span className="text-base sm:text-lg md:text-xl lg:text-[22px]">→</span>
              </Link>
            </div>

            <p className="mt-16 sm:mt-32 md:mt-40 lg:mt-55 text-xs sm:text-sm md:text-base lg:text-lg xl:text-[22px] 2xl:text-[25px] leading-5 sm:leading-6 md:leading-7 lg:leading-8 text-white/75 px-2 sm:px-4">
              HNVSearch is designed to help students, teachers, and staff easily
              <br className="hidden md:block" />
              report, search, and recover lost or found items within the school premises.
              <br className="hidden md:block" />
              The system promotes honesty, accountability, and faster item
              <br className="hidden md:block" />
              retrieval through a centralized digital platform.
            </p>
          </div>
        </main>
      </div>

      {/* ================= OUR PURPOSE SECTION ================= */}
      <section className="w-full bg-[#2f4b78] py-8 sm:py-10 md:py-12 text-white">
        <div className="mx-auto w-full max-w-500 px-4 sm:px-6 md:px-8 lg:px-10">
          <h2 className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-semibold">
            OUR PURPOSE
          </h2>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-4 lg:gap-10">
            {purposeItems.map((item) => (
              <PurposeCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
