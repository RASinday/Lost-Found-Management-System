"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Phone, Mail, Clock, X, Maximize2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
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
    <div className="min-h-screen bg-[#0a1120] text-white p-6 md:p-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Contact <span className="text-orange-500">Information</span>
          </h1>
          <p className="text-gray-400">For inquiries, verification, or claiming of items, you may contact our dedicated team within school hours.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT COLUMN: STAFF INFO + OFFICE HOURS */}
          <div className="space-y-8">
            <section className="bg-[#1e2b44] rounded-2xl p-8 border border-white/10 shadow-xl">
              <h3 className="mb-6 flex items-center gap-2 text-orange-400 font-semibold">
                 <User size={20}/> Lost and Found Coordinator's Information
              </h3>
              <div className="space-y-6">
                {staff.map((person) => (
                  <div key={person.role} className="group border-b border-white/5 pb-4 last:border-0">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider group-hover:text-orange-500/70 transition-colors">
                      {person.role} NAME
                    </p>
                    <p className="text-lg font-medium group-hover:text-orange-500 transition-colors duration-300">
                      {person.name}
                    </p>
                  </div>
                ))}
                
                <div className="pt-4 space-y-4 border-t border-white/10">
                   <div className="flex gap-3 items-start text-sm text-gray-400 group">
                      <MapPin size={16} className="mt-1 text-orange-500" />
                      <span className="group-hover:text-white transition-colors">OFFICE: [Supreme Secondary Learner Government]</span>
                   </div>
                   <div className="flex gap-3 items-start text-sm text-gray-400 group">
                      <Phone size={16} className="mt-1 text-orange-500" />
                      <span className="group-hover:text-white transition-colors">CONTACT: [0970 689 0304]</span>
                   </div>
                   <div className="flex gap-3 items-start text-sm text-gray-400 group">
                      <Mail size={16} className="mt-1 text-orange-500" />
                      <span className="group-hover:text-white transition-colors">EMAIL: [sslghnvs@gmail.com]</span>
                   </div>
                </div>
              </div>
            </section>

            {/* OFFICE HOURS (Now below Staff Info) */}
            <section className="bg-[#1e2b44] rounded-2xl p-8 border border-white/10 shadow-xl">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="flex items-center gap-2 font-semibold">
                    <Clock className="text-orange-500" size={18}/> Office Hours
                 </h3>
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isOpen ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    {isOpen ? 'Open Now' : 'Currently Closed'}
                 </span>
               </div>
               <div className="bg-[#0a1120] p-5 rounded-xl border border-white/5 flex justify-between items-center">
                  <span className="text-gray-300 font-medium">Monday - Friday</span>
                  <span className="text-orange-500 font-bold text-lg">7:00 AM - 5:00 PM</span>
               </div>
            </section>
          </div>

          {/* RIGHT COLUMN: VISUAL AREAS */}
          <div className="space-y-8">
            <section className="bg-[#1e2b44] rounded-2xl p-8 border border-white/10 shadow-xl">
               <h3 className="mb-6 flex items-center gap-2 font-semibold">
                  <MapPin className="text-orange-500" size={18}/> Designated Drop Off Areas
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["/sslg_main.png", "/guard_jhs.png", "/guard_shs.png"].map((src, idx) => (
                    <div key={idx} className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video bg-black/40 border border-white/10" onClick={() => setSelectedImg(src)}>
                      <img src={src} alt="Drop Off" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                         <Maximize2 className="text-orange-500" size={24} />
                      </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="bg-[#1e2b44] rounded-2xl p-8 border border-white/10 shadow-xl">
               <h3 className="mb-6 flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="text-orange-500" size={18}/> Designated Claiming Areas
               </h3>
               <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video bg-black/40 border border-white/10" onClick={() => setSelectedImg("/sslg_main.png")}>
                  <img src="/sslg_main.png" alt="Claiming" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                     <Maximize2 className="text-orange-500" size={24} />
                  </div>
               </div>
               <p className="text-[11px] text-gray-500 mt-4 italic text-center">Closed on Weekend and Public Holidays</p>
            </section>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={selectedImg} className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}