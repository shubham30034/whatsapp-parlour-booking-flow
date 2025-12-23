'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';


const DAYS = [
  { id: 'today', title: 'Today', sub: 'Dec 24' },
  { id: 'tomorrow', title: 'Tomorrow', sub: 'Dec 25' },
];

const SLOTS = [
  { id: 'morning', title: 'Morning', hint: '09:00 AM – 12:00 PM' },
  { id: 'afternoon', title: 'Afternoon', hint: '12:00 PM – 04:00 PM' },
  { id: 'evening', title: 'Evening', hint: '04:00 PM – 08:00 PM' },
];

const TimePage = () => {
  const router = useRouter();
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canContinue = day && slot;

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] antialiased lg:h-screen lg:overflow-hidden">
      <NavBar />

      <div className={`max-w-6xl mx-auto px-6 pt-24 md:pt-32 lg:pt-40 pb-10 transition-all duration-1000 h-full ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 h-full items-start">
          
          {/* LEFT COLUMN: HEADER & DATES */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <header className="mb-8 md:mb-12">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8B7E74] mb-2">Step 02 / 03</p>
              <h1 className="text-[32px] md:text-[56px] lg:text-[64px] font-bold tracking-tighter leading-none mb-4">
                The <span className="italic font-serif font-light text-[#8B7E74]">Schedule</span>
              </h1>
              <p className="text-[14px] md:text-[16px] text-[#707070] font-medium max-w-xs leading-relaxed">
                Choose a window. We will finalize exact timing via WhatsApp.
              </p>
            </header>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BDBDBD] mb-4">Select Date</p>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {DAYS.map((d) => {
                  const active = day === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDay(d.id)}
                      className={`relative px-5 py-5 md:px-7 md:py-6 text-left transition-all duration-500 rounded-[2px] border
                        ${active 
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-xl lg:translate-x-2' 
                          : 'bg-white border-[#F1F1F1] text-[#1A1A1A] hover:border-[#8B7E74]/40'
                        }`}
                    >
                      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${active ? 'text-[#8B7E74]' : 'text-[#BDBDBD]'}`}>
                        {d.sub}
                      </p>
                      <h3 className="text-[18px] md:text-[22px] font-bold tracking-tight">{d.title}</h3>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TIME SLOTS */}
          <div className="lg:col-span-7 lg:border-l lg:border-[#F1F1F1] lg:pl-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BDBDBD] mb-10">Preferred Window</p>
            <div className="relative space-y-4 md:space-y-8 before:absolute before:left-[23px] md:before:left-[31px] before:top-0 before:bottom-0 before:w-px before:bg-[#F1F1F1]">
              {SLOTS.map((s, index) => {
                const active = slot === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSlot(s.id)}
                    className="w-full group relative flex items-start gap-6 md:gap-10 text-left outline-none"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`z-10 w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full border-[3px] md:border-4 border-[#FDFCFB] flex items-center justify-center transition-all duration-500
                      ${active ? 'bg-[#1A1A1A] scale-105 shadow-lg' : 'bg-[#F5F5F5] group-hover:bg-[#8B7E74]/10'}`}
                    >
                      <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${active ? 'bg-[#8B7E74]' : 'bg-[#D1D1D1]'}`} />
                    </div>

                    <div className={`flex-1 pb-4 md:pb-6 border-b border-[#F1F1F1] transition-all duration-500 ${active ? 'translate-x-1 md:translate-x-2' : ''}`}>
                      <h4 className={`text-[18px] md:text-[22px] lg:text-[24px] font-bold tracking-tight mb-0.5 transition-colors ${active ? 'text-[#8B7E74]' : 'text-[#1A1A1A]'}`}>
                        {s.title}
                      </h4>
                      <p className="text-[11px] md:text-[13px] font-medium text-[#707070] uppercase tracking-wider">
                        {s.hint}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      {/* FOOTER - Refined for Mobile */}
<footer className={`fixed bottom-0 left-0 w-full px-4 md:px-6 py-6 md:py-8 z-50 transition-all duration-700 transform 
  ${canContinue ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
  
  <div className="max-w-2xl mx-auto">
    <button
      onClick={() => router.push('/review')}
      className="w-full bg-[#1A1A1A] text-white py-5 md:py-6 rounded-none flex items-center justify-center gap-4 group relative shadow-2xl active:scale-[0.97] transition-all duration-300 overflow-hidden"
    >
      {/* 1. MOBILE ACCENT: Ek patli Khaki line jo hamesha dikhegi mobile pe top par */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#8B7E74] md:hidden" />

      {/* 2. TEXT & ICON */}
      <span className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] z-10 relative">
        Confirm Schedule
      </span>
      
      <svg 
        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" 
        className="z-10 group-hover:translate-x-2 transition-transform duration-300"
      >
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>

      {/* 3. DESKTOP HOVER: Sirf desktop (md) par hi Khaki fill upar aayega */}
      <div className="absolute inset-0 bg-[#8B7E74] translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-out hidden md:block" />

      {/* 4. MOBILE CLICK FEEDBACK: Jab user touch karega toh halka sa chamkega */}
      <div className="absolute inset-0 bg-white/10 opacity-0 active:opacity-100 transition-opacity md:hidden" />
    </button>
  </div>
   </footer> 
    </main>
  );
};

export default TimePage;