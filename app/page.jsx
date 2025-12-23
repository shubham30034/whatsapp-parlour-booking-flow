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
    <main className="h-[100dvh] md:min-h-screen bg-[#FDFCFB] overflow-hidden relative flex flex-col font-sans selection:bg-[#8B7E74]/20">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#8B7E74]/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

      <div className="flex-1 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center z-10 py-4 md:py-0">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-center">
          
          {/* LEFT: IMAGE SECTION (Optimized Height for Mobile) */}
          <div 
            className={`relative transition-all duration-1000 ease-out transform 
              ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} 
          >
            <div className="group relative w-full h-[28vh] md:h-[80vh] rounded-[24px] md:rounded-[60px] overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
              <div 
                className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[2s] ease-out group-hover:scale-100"
                style={{ backgroundImage: "url('/hero-salon.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
              
              {/* Live Badge - Slightly smaller on mobile */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 backdrop-blur-xl bg-white/70 border border-white/40 px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-3 z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-900">Live Booking Open</span>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* Social Proof - Hidden on very small screens to save space if needed, or kept tight */}
            <div className={`flex items-center gap-3 mb-4 md:mb-6 transition-all duration-700 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex -space-x-2 md:-space-x-3">
                   {[1,2,3].map((i) => (
                     <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-[#FDFCFB] bg-gradient-to-tr from-[#8B7E74] to-[#C2B8B0] shadow-md" />
                   ))}
                </div>
                <span className="text-[10px] md:text-[12px] font-semibold text-[#8B7E74] tracking-tight">Loved by 2,000+ Clients</span>
            </div>

            {/* Headline - Adjusted for Mobile Viewport */}
            <div className={`transition-all duration-1000 delay-500 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block text-[9px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#8B7E74]/80 mb-2 md:mb-4">
                The Luxury Experience
              </span>
              <h1 className="text-[34px] md:text-[82px] leading-[1] md:leading-[0.95] font-bold text-[#1A1A1A] mb-4 md:mb-8 tracking-tighter">
                Elevate Your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B7E74] to-[#5C5C5C]">Natural Glow.</span>
              </h1>
            </div>

            {/* Subtext - Compact on mobile */}
            <div className={`transition-all duration-1000 delay-700 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="max-w-[320px] md:max-w-[440px] text-[14px] md:text-[20px] text-[#5C5C5C]/90 font-medium leading-relaxed mb-6 md:mb-10">
                Skip the wait. Book top-tier beauty experts in seconds with instant WhatsApp confirmation.
              </p>

              {/* ACTION BUTTON - Elevated & Visible */}
              <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
                <button
                  onClick={() => router.push('/service')}
                  className="group relative w-full md:w-auto h-[60px] md:h-[70px] px-10 md:px-12 rounded-full bg-[#1A1A1A] text-white text-[15px] md:text-[17px] font-bold shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                >
                  <span>Explore Services</span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </button>
              </div>

              {/* Trust Badges - Smaller and cleaner on mobile */}
              <div className="mt-8 md:mt-12 flex items-center justify-center md:justify-start gap-6 md:gap-8 opacity-60 scale-90 md:scale-100 origin-center md:origin-left">
                <div className="flex flex-col">
                    <span className="text-[12px] md:text-[14px] font-bold text-[#1A1A1A]">100%</span>
                    <span className="text-[8px] uppercase tracking-widest font-bold">Secure</span>
                </div>
                <div className="w-[1px] h-6 md:h-8 bg-black/10" />
                <div className="flex flex-col">
                    <span className="text-[12px] md:text-[14px] font-bold text-[#1A1A1A]">No Login</span>
                    <span className="text-[8px] uppercase tracking-widest font-bold">Required</span>
                </div>
                <div className="w-[1px] h-6 md:h-8 bg-black/10" />
                <div className="flex flex-col">
                    <span className="text-[12px] md:text-[14px] font-bold text-[#1A1A1A]">Instant</span>
                    <span className="text-[8px] uppercase tracking-widest font-bold">WhatsApp</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}