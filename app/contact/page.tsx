"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Phone, Mail, Clock, X, Maximize2, CheckCircle2 } from 'lucide-react';

type AreaData = {
  src: string;
  title: string;
  description: string;
  tag: string;
  school: string;
};

export default function ContactPage() {
  const [selectedArea, setSelectedArea] = useState<AreaData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Office Hours Logic: 7:00 AM - 5:00 PM, Mon-Fri
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); 
      const hour = now.getHours();
      const isWeekday = day >= 1 && day <= 5;
      const isWorkingHours = hour >= 7 && hour < 17;
      setIsOpen(isWeekday && isWorkingHours);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const staff = [
    { role: "PRESIDENT", name: "Arwen Yan" },
    { role: "V-PRESIDENT (SHS)", name: "John Ivan Urgel" },
    { role: "V-PRESIDENT (JHS)", name: "Allen Mae Labides" },
    { role: "SSLG ADVISER", name: "Richie Benlot" },
  ];

  return (
    <div className="min-h-screen bg-[#0a1120] text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* HEADER */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Contact <span className="text-orange-500">Information</span>
          </h1>
          <p className="text-[15px] text-gray-400 max-w-2xl">For inquiries, verification, or claiming of items, you may contact our dedicated team within school hours.</p>
        </header>

        {/* STAFF & OFFICE HOURS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-13 items-stretch">
          
          {/* LEFT: STAFF INFO */}
          <section className="h-full bg-linear-to-br from-[#1e2b44] to-[#151f2e] rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col justify-start">
            <h3 className="mb-6 text-[20px] flex items-center gap-5 text-orange-400 font-bold">
              <User size={30}/>
              <span className="flex flex-col">
                <span>Lost and Found Coordinator</span>
                <span className="opacity-75">S.Y. 2025 - 2026</span>
              </span>
            </h3>
            <div className="space-y-3">
              {staff.map((person) => (
                <div key={person.role} className="group border-b border-white/5 pb-5 last:border-0">
                  <p className="text-[13px] text-gray-500 uppercase tracking-widest group-hover:text-orange-400/70 transition-colors font-semibold">
                    {person.role}
                  </p>
                  <p className="text-[20px] font-bold group-hover:text-orange-400 transition-colors duration-300 mt-1">
                    {person.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: OFFICE HOURS */}
          <section className="h-full bg-linear-to-br from-[#1e2b44] to-[#151f2e] rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col justify-start">
             <div className="mb-13 flex flex-wrap items-center justify-between gap-4">
               <h3 className="flex items-center gap-2 text-[24px] text-orange-400 font-bold">
                  <Clock className="text-orange-500" size={24}/> Office Hours
               </h3>

               <span
                 className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                   isOpen
                     ? "bg-green-500/20 text-green-400 border border-green-500/30"
                     : "bg-red-500/20 text-red-400 border border-red-500/30"
                 }`}
               >
                  <span className={`h-2 w-2 rounded-full animate-pulse ${isOpen ? "bg-green-400" : "bg-red-400"}`}></span>
                  {isOpen ? "Open Now" : "Currently Closed"}
               </span>
             </div>

             <div className="space-y-3">
               {/* Mon–Fri */}
               <div className="bg-[#0a1120] p-4 rounded-2xl border border-white/5 group hover:border-orange-500/30 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-gray-500 text-[15px] uppercase tracking-widest">
                      Monday - Friday
                    </p>
                    <p className="text-orange-400 font-bold text-[13px] whitespace-nowrap">
                      7:00 AM - 5:00 PM
                    </p>
                  </div>
               </div>

               {/* Weekend & Holidays */}
               <div className="bg-[#0a1120] p-4 rounded-2xl border border-white/5 group hover:border-orange-500/30 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-gray-500 text-[15px] uppercase tracking-widest">
                      Weekend & Holidays
                    </p>
                    <p className="text-gray-400 font-semibold text-[13px] whitespace-nowrap">
                      Closed
                    </p>
                  </div>
               </div>
             </div>

             <div className="mt-8 space-y-4">
               <div className="flex gap-4 items-start text-[15px] text-gray-400 group hover:text-white transition-colors cursor-pointer">
                  <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-[15px] text-gray-500 uppercase tracking-wider mb-1">Office Location</p>
                    <p className="text-white text-[14px]">Supreme Secondary Learner Government</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start text-[15px] text-gray-400 group hover:text-white transition-colors cursor-pointer">
                  <Phone size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[15px] text-gray-500 uppercase tracking-wider mb-1">Contact Number</p>
                    <p className="text-white text-[14px]">0970 689 0304</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start text-[15px] text-gray-400 group hover:text-white transition-colors cursor-pointer">
                  <Mail size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[15px] text-gray-500 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white text-[14px]">sslghnvs@gmail.com</p>
                  </div>
               </div>
             </div>
          </section>
        </div>

        {/* DESIGNATED AREAS SECTION */}
        <div className="space-y-12">
          {/* DROP OFF AREAS */}
          <section className="bg-linear-to-br from-[#1e2b44] to-[#151f2e] rounded-3xl p-8 border border-white/10 shadow-2xl">
             <h3 className="mb-8 flex items-center gap-3 text-[24px] text-orange-400 font-bold">
                <MapPin className="text-orange-500" size={28}/> Designated Drop Off Areas
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { src: "/sslg_office.png", title: "Supreme Secondary Learner Government SSLG", description: "Main drop-off point for lost and found items. Located in the administrative area of the school.", tag: "DROP OFF AREA", school: "Hilongos National Vocational School" },
                  { src: "/guard_jhs.png", title: "Guard House - Junior High School", description: "Secondary drop-off location for items found in the Junior High School section.", tag: "DROP OFF AREA", school: "Hilongos National Vocational School" },
                  { src: "/guard_shs.png", title: "Guard House - Senior High School", description: "Designated drop-off area for items found in the Senior High School section of the campus.", tag: "DROP OFF AREA", school: "Hilongos National Vocational School" }
                ].map((area, idx) => (
                  <div key={idx} className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/20" onClick={() => setSelectedArea(area)}>
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img src={area.src} alt={area.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <Maximize2 className="text-orange-500" size={28} />
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                      <div className="space-y-3">
                        <h4 className="text-[14px] font-bold text-white leading-tight">{area.title}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-orange-500 text-black text-[9px] font-bold px-2.5 py-1 rounded uppercase">
                            Drop Off Area
                          </span>
                          <span className="text-[11px] text-gray-300">{area.school}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* CLAIMING AREA */}
          <section className="bg-linear-to-br from-[#1e2b44] to-[#151f2e] rounded-3xl p-8 border border-white/10 shadow-2xl">
             <h3 className="mb-8 flex items-center gap-3 text-[24px] text-orange-400 font-bold">
                <CheckCircle2 className="text-orange-500" size={28}/> Designated Claiming Area
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/20"
                  onClick={() =>
                    setSelectedArea({
                      src: "/sslg_adviser.png",
                      title: "SSLG Adviser Room - Richie Benlot",
                      description:
                        "Main claiming area for verified and approved lost and found items. Items can be claimed during office hours.",
                      tag: "CLAIMING AREA",
                      school: "Hilongos National Vocational School",
                    })
                  }
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src="/sslg_adviser.png"
                      alt="SSLG Adviser Room - Richie Benlot"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Maximize2 className="text-orange-500" size={32} />
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <div>
                      <h4 className="text-[15px] font-bold text-white mb-3">
                        SSLG Adviser - Richie Benlot - JHS
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-500 text-black text-[11px] font-bold px-3 py-1.5 rounded uppercase">
                          Claiming Area
                        </span>
                        <span className="text-[15px] text-gray-300">
                          Hilongos National Vocational School
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/20"
                  onClick={() =>
                    setSelectedArea({
                      src: "/sslg_ass_adviser.png",
                      title: "SSLG Asst. Adviser - Mary Jean Glamayo - SHS",
                      description:
                        "Alternate claiming point for verified and approved lost and found items. Items can be claimed during office hours.",
                      tag: "CLAIMING AREA",
                      school: "Hilongos National Vocational School",
                    })
                  }
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src="/sslg_ass_adviser.png"
                      alt="SSLG Asst. Adviser - Mary Jean Glamayo - SHS"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Maximize2 className="text-orange-500" size={32} />
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <div>
                      <h4 className="text-[15px] font-bold text-white mb-3">
                        SSLG Asst. Adviser - Mary Jean Glamayo - SHS
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-500 text-black text-[11px] font-bold px-3 py-1.5 rounded uppercase">
                          Claiming Area
                        </span>
                        <span className="text-[15px] text-gray-300">
                          Hilongos National Vocational School
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
             <p className="text-[14px] text-gray-500 mt-6 italic text-center font-semibold">
               Closed on Weekends and Public Holidays
             </p>
          </section>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArea(null)} className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#1e2b44] rounded-2xl shadow-2xl border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden">
                <img src={selectedArea.src} alt={selectedArea.title} className="object-cover w-full h-full" />
                <button onClick={() => setSelectedArea(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-[25px] font-bold text-white mb-2">{selectedArea.title}</h2>
                  <div className="flex items-center gap-3">
                    <span className="bg-orange-500 text-black text-[10px] font-bold px-3 py-1 rounded uppercase">{selectedArea.tag}</span>
                    <span className="text-[14px] text-gray-400">{selectedArea.school}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-[15px] text-gray-300 leading-relaxed">{selectedArea.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}