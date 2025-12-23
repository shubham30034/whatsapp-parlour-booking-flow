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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) setIsVisible(false);
      else setIsVisible(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const activeServices = services.filter((s) => s.active);

  // YOUR SHARED INDICATOR CONFIGURATION
  const steps = [
    { name: 'Service', path: '/service' },
    { name: 'Time', path: '/time' },
    { name: 'Review', path: '/review' }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] antialiased flex flex-col">
      <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <NavBar />
      </div>

      {/* --- YOUR SAME-TO-SAME INDICATOR --- */}
      <div className={`sticky z-40 w-full bg-[#FDFCFB]/90 backdrop-blur-md border-b border-[#F1F1F1]/50 py-4 transition-all duration-500 ${isVisible ? 'top-[64px]' : 'top-0 shadow-sm'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xs flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E0E0E0] -translate-y-[10px] z-0" />
            
            {steps.map((step, index) => {
              const isActive = index === 0; // Service is Step 01
              const isCompleted = index < 0; // Nothing before service

              return (
                <div key={step.name} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border-2 ${
                      isActive 
                        ? 'bg-[#8B7E74] border-[#8B7E74] scale-125' 
                        : isCompleted
                          ? 'bg-[#1A1A1A] border-[#1A1A1A]'
                          : 'bg-white border-[#E0E0E0]'
                    }`} 
                  />
                  <span className={`text-[8px] font-black uppercase tracking-tighter mt-2 ${
                    isActive ? 'text-[#1A1A1A]' : 'text-[#BDBDBD]'
                  }`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`flex-1 transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* HEADER */}
        <header className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8B7E74] mb-2">Step 01 / 03</p>
          <h1 className="text-[36px] md:text-[56px] lg:text-[72px] font-bold tracking-tighter leading-none">
            Choose <span className="italic font-serif font-light text-[#8B7E74]">Artistry.</span>
          </h1>
        </header>

        {/* SERVICE GRID */}
        <section className="max-w-6xl mx-auto px-5 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
            {activeServices.map((service) => {
              const isSelected = bookingData.service?.id === service.id;
              return (
                <div key={service.id} onClick={() => setService(service)} className="group cursor-pointer">
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-[24px] transition-all duration-700 ${isSelected ? 'ring-2 ring-[#1A1A1A] ring-offset-4' : ''}`}>
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                    
                    {/* PRICE BADGE */}
                    <div className="absolute top-5 right-5 backdrop-blur-xl bg-white/95 px-4 py-2 rounded-full shadow-md border border-white/20">
                      <span className="text-[14px] font-bold tracking-tight text-[#1A1A1A]">{service.priceHint}</span>
                    </div>

                    {isSelected && (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center animate-in fade-in duration-500">
                         <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-2xl">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 px-1 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#8B7E74]">{service.category}</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{service.duration} MIN</span>
                    </div>
                    <h3 className="text-[26px] md:text-[32px] font-bold tracking-tight leading-tight transition-colors group-hover:text-[#8B7E74]">
                      {service.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FLOATING FOOTER */}
      <footer className={`fixed bottom-0 left-0 w-full px-6 pb-8 md:pb-12 z-50 pointer-events-none transition-all duration-700 transform 
          ${bookingData.service ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button
            onClick={() => (bookingData.service.needsSkinType && !bookingData.skinType) ? setIsModalOpen(true) : router.push('/time')}
            className="w-full bg-[#1A1A1A] text-white h-[64px] md:h-[74px] flex items-center justify-center gap-4 group relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-[0.98] overflow-hidden transition-all duration-300 rounded-2xl md:rounded-none"
          >
            <div className="absolute inset-0 bg-[#8B7E74] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="text-[12px] font-black uppercase tracking-[0.4em] z-10 relative">Continue to Timing</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="z-10 relative transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </footer>

      <SkinModal isOpen={isModalOpen} onConfirm={(skin) => { setSkinType(skin); setIsModalOpen(false); router.push('/time'); }} />
    </main>
  );
}

// Modal component same as before...
function SkinModal({ isOpen, onConfirm }) {
  const [selected, setSelected] = useState(null);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div className="relative bg-white w-full max-w-sm p-8 rounded-[32px] shadow-2xl animate-in slide-in-from-bottom duration-500">
        <h2 className="text-[24px] font-bold tracking-tight mb-6">Skin Profile</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {['Normal', 'Dry', 'Oily', 'Sensitive'].map(s => (
            <button key={s} onClick={() => setSelected(s)} className={`py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all ${selected === s ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' : 'bg-white border-[#F1F1F1] text-gray-400'}`}>{s}</button>
          ))}
        </div>
        <button disabled={!selected} onClick={() => onConfirm(selected.toLowerCase())} className={`w-full py-4 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all ${selected ? 'bg-[#8B7E74] text-white' : 'bg-gray-100 text-gray-400'}`}>Confirm</button>
      </div>
    </div>
  );
}