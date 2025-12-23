'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { services } from '@/app/config/services';
import NavBar from '../components/NavBar';
import { useBooking } from '../context/BookingContext';

export default function ServicePage() {
  const router = useRouter();
  const { bookingData, setService, setSkinType } = useBooking();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeServices = services.filter((s) => s.active);

  const handleContinue = () => {
    if (!bookingData.service) return;
    if (bookingData.service.needsSkinType && !bookingData.skinType) {
      setIsModalOpen(true);
      return;
    }
    router.push('/time');
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] antialiased selection:bg-[#8B7E74]/10">
      <NavBar />

      {/* --- HEADER: Space Optimized --- */}
      <header className={`max-w-6xl mx-auto px-6 pt-24 md:pt-40 pb-6 md:pb-10 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-[#8B7E74] mb-3 block">
          Step 01 / Selection
        </span>
        <h1 className="text-[40px] md:text-[84px] font-bold tracking-tight leading-[1] md:leading-[0.9]">
          Our <span className="italic font-serif font-light text-[#8B7E74]">Artistry.</span>
        </h1>
        <p className="mt-3 max-w-[260px] md:max-w-md text-[14px] md:text-lg text-[#707070] leading-relaxed">
          Select a treatment tailored to your profile.
        </p>
      </header>

      {/* --- SERVICES GRID: No top padding gap --- */}
      <section className={`max-w-6xl mx-auto px-5 pb-40 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-16">
          {activeServices.map((service, index) => {
            const isSelected = bookingData.service?.id === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setService(service)}
                className="group flex flex-col cursor-pointer"
              >
                {/* Image Aspect: Balanced for Mobile */}
                <div className={`relative aspect-[16/9] md:aspect-[16/10] overflow-hidden rounded-[20px] md:rounded-[40px] transition-all duration-500
                  ${isSelected ? 'ring-4 ring-[#1A1A1A] ring-offset-2' : 'shadow-sm'}`}>
                  
                  <img
                    src={service.image}
                    alt={service.name}
                    className={`w-full h-full object-cover transition-transform duration-[1.5s] 
                      ${isSelected ? 'scale-100' : 'group-hover:scale-105'}`}
                  />
                  
                  {/* Subtle Price Badge */}
                  <div className="absolute top-3 right-3 md:top-5 md:right-5 backdrop-blur-md bg-white/80 px-3 py-1 md:px-5 md:py-2 rounded-full border border-white/20 shadow-sm">
                    <span className="text-[12px] md:text-[14px] font-bold tracking-tighter">{service.priceHint}</span>
                  </div>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex items-center justify-center animate-in fade-in duration-300">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content: Minimal Gap */}
                <div className="mt-4 px-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#8B7E74]">
                      {service.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      {service.duration} MIN
                    </span>
                  </div>
                  
                  <h3 className="text-[22px] md:text-[34px] font-bold tracking-tight leading-tight group-hover:text-[#8B7E74] transition-colors">
                    {service.name}
                  </h3>
                  
                  <div className={`h-[1.5px] mt-4 bg-[#1A1A1A] transition-all duration-700
                    ${isSelected ? 'w-full opacity-100' : 'w-6 opacity-0 group-hover:opacity-20 group-hover:w-12'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- ACTION FOOTER --- */}
      <div className={`fixed bottom-8 left-0 w-full px-6 z-50 transition-all duration-700 transform
        ${bookingData.service ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className="w-full bg-[#1A1A1A] text-white h-[68px] rounded-full flex items-center justify-between px-8 shadow-2xl active:scale-[0.98] transition-all group overflow-hidden"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B7E74]">Step 02</span>
              <span className="text-[13px] font-bold tracking-widest uppercase">Timing</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#8B7E74] transition-colors">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </button>
        </div>
      </div>

      <SkinModal isOpen={isModalOpen} onConfirm={(skin) => { setSkinType(skin); setIsModalOpen(false); router.push('/time'); }} />
    </main>
  );
}

// Modal function stays clean & professional
function SkinModal({ isOpen, onConfirm }) {
  const [selected, setSelected] = useState(null);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white w-full max-w-sm p-8 md:rounded-[40px] rounded-t-[32px] shadow-2xl animate-in slide-in-from-bottom duration-500">
        <h2 className="text-[26px] font-bold tracking-tight mb-8">Skin <span className="italic font-serif font-light text-[#8B7E74]">Profile</span></h2>
        <div className="grid grid-cols-2 gap-2 mb-10">
          {['Normal', 'Dry', 'Oily', 'Comb.', 'Sensitive', 'Unsure'].map(s => (
            <button key={s} onClick={() => setSelected(s)}
              className={`py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all
                ${selected === s ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400'}`}>
              {s}
            </button>
          ))}
        </div>
        <button disabled={!selected} onClick={() => onConfirm(selected.toLowerCase())}
          className={`w-full py-5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all
            ${selected ? 'bg-[#8B7E74] text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
          Confirm Selection
        </button>
      </div>
    </div>
  );
}