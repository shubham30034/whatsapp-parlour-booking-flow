'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // md:overflow-hidden PC par scroll rokhne ke liye, h-screen viewport fix karne ke liye
    <main className="h-screen md:min-h-screen bg-[#FDFCFB] overflow-hidden relative flex flex-col">
      
      {/* BACKGROUND DETAIL */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B7E74]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Container: justify-center for PC, justify-between for Mobile */}
      <div className="flex-1 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center py-4 md:py-0">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 items-center">
          
          {/* LEFT: IMAGE SECTION - Reduced height on mobile to save space */}
          <div 
            className={`relative transition-all duration-[1000ms] ease-out transform 
              ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`} 
          >
            {/* Mobile h-[35vh] is the key here */}
            <div className="group relative w-full h-[35vh] md:h-[75vh] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out md:group-hover:scale-110"
                style={{ backgroundImage: "url('/hero-salon.png')" }}
              />
              
              <div className="absolute top-4 left-4 backdrop-blur-md bg-white/80 border border-white/20 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-800">Available Today</span>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* Social Proof - Hidden on very small screens if needed, or kept tight */}
            <div className={`flex items-center gap-2 mb-3 md:mb-4 transition-all duration-700 delay-100 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
               <div className="flex -space-x-2">
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-300 shadow-sm" />
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-400 shadow-sm" />
               </div>
               <span className="text-[11px] font-bold text-[#8B7E74]">⭐ 4.9/5 Trust Rating</span>
            </div>

            {/* Headline Group - Responsive font sizes */}
            <div className={`transition-all duration-700 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-[#8B7E74] mb-3 md:mb-6">
                Premium Service
              </span>
              <h1 className="text-[32px] md:text-[64px] leading-[1.1] font-bold text-[#1A1A1A] mb-4 md:mb-6 tracking-tight">
                Beauty, <br className="hidden md:block" />
                Effortlessly <span className="text-[#8B7E74]">Booked.</span>
              </h1>
            </div>

            {/* Subtext & Button */}
            <div className={`transition-all duration-700 delay-500 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="max-w-[320px] md:max-w-[480px] text-[14px] md:text-[19px] text-[#5C5C5C] leading-relaxed mb-6 md:mb-10">
                Select your service and get a direct confirmation via WhatsApp. 
              </p>

              <button
                onClick={() => router.push('/service')}
                className="group relative w-full md:w-auto h-[58px] md:h-[74px] px-10 rounded-2xl bg-[#1A1A1A] text-white text-[16px] font-semibold shadow-xl active:scale-[0.95] transition-all flex items-center justify-center gap-4 overflow-hidden"
              >
                <span className="relative z-10">Check Available Services</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              {/* Minimal Trust Footer - Reduced margin for mobile */}
              <div className="mt-8 md:mt-12 flex flex-wrap justify-center md:justify-start gap-6 opacity-40">
                <div className="text-[9px] font-bold tracking-[0.2em] uppercase">Verified Salon</div>
                <div className="text-[9px] font-bold tracking-[0.2em] uppercase">No Login Needed</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}