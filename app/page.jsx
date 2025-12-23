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
    <main className="min-h-screen bg-[#FDFCFB] overflow-x-hidden relative">
      
      {/* BACKGROUND DETAIL: Subtle Ambient Glow (Does not affect spacing) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B7E74]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-center pt-6 md:pt-20 pb-16">
          
          {/* LEFT: IMAGE SECTION */}
          <div 
            className={`relative transition-all duration-[1000ms] ease-out transform 
              ${mounted 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95 md:translate-y-0 md:scale-100' 
              }`} 
          >
            <div className="group relative w-full h-[45vh] md:h-[80vh] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl">
              
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out md:group-hover:scale-110"
                style={{ backgroundImage: "url('/hero-salon.png')" }}
              />
              
              {/* Floating Badge 1: Availability */}
              <div className="absolute top-4 left-4 backdrop-blur-md bg-white/80 border border-white/20 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-800">Available Today</span>
              </div>

              {/* NEW TRUST BADGE ON IMAGE: (Bottom right corner of image) */}
              <div className="absolute bottom-4 right-4 backdrop-blur-md bg-black/20 border border-white/10 px-3 py-1 rounded-lg z-10 hidden md:flex items-center gap-2">
                 <span className="text-[10px] text-white font-medium italic">5-Star Studio</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* NEW SOCIAL PROOF: Compact avatars above the headline */}
            <div className={`flex items-center gap-2 mb-4 transition-all duration-700 delay-100 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
               <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300 shadow-sm" />
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-400 shadow-sm" />
               </div>
               <span className="text-[12px] font-bold text-[#8B7E74]">⭐ 4.9/5 Trust Rating</span>
            </div>

            {/* Headline Group */}
            <div className={`transition-all duration-700 delay-300 transform 
              ${mounted 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4 md:translate-y-0' 
              }`}
            >
              <span className="inline-block text-[11px] font-bold tracking-[0.4em] uppercase text-[#8B7E74] mb-6">
                Premium Service
              </span>
              
              <h1 className="text-[36px] md:text-[64px] leading-[1.1] font-bold text-[#1A1A1A] mb-6 tracking-tight">
                Beauty, <br className="hidden md:block" />
                Effortlessly <span className="text-[#8B7E74]">Booked.</span>
              </h1>
            </div>

            {/* Subtext & Button */}
            <div className={`transition-all duration-700 delay-500 transform 
              ${mounted 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4 md:translate-y-0' 
              }`}
            >
              <p className="max-w-[360px] md:max-w-[480px] text-[16px] md:text-[19px] text-[#5C5C5C] leading-relaxed mb-10">
                Forget the phone calls. Select your service and get a direct confirmation via WhatsApp. 
              </p>

              <button
                onClick={() => router.push('/service')}
                className="
                  group relative
                  w-full md:w-auto
                  h-[64px] md:h-[74px]
                  px-12
                  rounded-2xl
                  bg-[#1A1A1A] 
                  text-white
                  text-[17px] font-semibold
                  shadow-xl
                  transition-all duration-300
                  active:scale-[0.95]
                  md:hover:-translate-y-1
                  flex items-center justify-center gap-4
                  overflow-hidden
                "
              >
                <span className="relative z-10">Book on WhatsApp</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              {/* Minimal Trust Footer */}
              <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-8 opacity-40">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase">Verified Salon</div>
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase">No Login Needed</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}