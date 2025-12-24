'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SERVICES, SKIN_TYPES, getSkinBasedTag, getActiveOffer } from '@/app/config/services';
import NavBar from '../components/NavBar';
import { useBooking } from '../context/BookingContext';

export default function ServicePage() {
  const router = useRouter();
  const { bookingData, setService, setOffer, setSkinType } = useBooking();

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

  const activeServices = SERVICES.filter((s) => s.active);
  const activeOffer = getActiveOffer();

  const steps = [
    { name: 'Service', path: '/service' },
    { name: 'Time', path: '/time' },
    { name: 'Review', path: '/review' }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] antialiased flex flex-col">
      {/* NAVIGATION */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <NavBar />
      </div>

      {/* STEP INDICATOR */}
      <div className={`sticky z-40 w-full bg-[#FDFCFB]/90 backdrop-blur-md border-b border-[#F1F1F1]/50 py-4 transition-all duration-500 ${isVisible ? 'top-[64px]' : 'top-0 shadow-sm'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xs flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E0E0E0] -translate-y-[10px] z-0" />
            {steps.map((step, index) => {
              const isActive = index === 0;
              return (
                <div key={step.name} className="relative z-10 flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border-2 ${isActive ? 'bg-[#8B7E74] border-[#8B7E74] scale-125' : 'bg-white border-[#E0E0E0]'}`} />
                  <span className={`text-[8px] font-black uppercase tracking-tighter mt-2 ${isActive ? 'text-[#1A1A1A]' : 'text-[#BDBDBD]'}`}>{step.name}</span>
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

        {/* SERVICE GRID SECTION */}
        <section className="max-w-6xl mx-auto px-5 pb-48">
          {activeOffer && (
            <div 
              onClick={() => setOffer(activeOffer)}
              className={`mb-16 relative overflow-hidden rounded-[28px] transition-all duration-500 cursor-pointer active:scale-[0.98]
              ${bookingData.offer?.id === activeOffer.id ? 'bg-[#8B7E74] shadow-2xl translate-y-[-4px]' : 'bg-[#1A1A1A] shadow-lg'}`}
            >
              <div className="p-7 md:p-10 relative overflow-hidden">
                {bookingData.offer?.id === activeOffer.id && (
                  <div className="absolute top-5 right-5 w-7 h-7 bg-white rounded-full flex items-center justify-center animate-in zoom-in duration-300 shadow-xl z-20">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7E74" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
                <div className="relative z-10">
                  <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border text-[8px] font-black uppercase tracking-widest mb-4 transition-all
                    ${bookingData.offer?.id === activeOffer.id ? 'bg-white/20 border-white/30 text-white' : 'bg-[#8B7E74]/10 border-[#8B7E74]/30 text-[#8B7E74]'}`}>
                    <span className={`w-1 h-1 rounded-full ${bookingData.offer?.id === activeOffer.id ? 'bg-white' : 'bg-[#8B7E74] animate-pulse'}`} />
                    {activeOffer.tag}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-2 leading-none">
                    {activeOffer.title}
                  </h2>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6">
                    {activeOffer.servicesIncluded.map((s, i) => (
                      <span key={i} className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${bookingData.offer?.id === activeOffer.id ? 'text-white/80' : 'text-white/40'}`}>
                        {s} {i !== activeOffer.servicesIncluded.length - 1 && <span className="opacity-30">•</span>}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2 pt-4 border-t border-white/10">
                    <span className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none">{activeOffer.priceHint}</span>
                    <span className={`text-[9px] font-medium uppercase tracking-[0.2em] italic ${bookingData.offer?.id === activeOffer.id ? 'text-white/60' : 'text-white/20'}`}>{activeOffer.note}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
            {activeServices.map((service) => {
              const isSelected = bookingData.service?.id === service.id;
              const tagText = getSkinBasedTag(service, bookingData.skinType);
              return (
                <div key={service.id} onClick={() => setService(service)} className="group cursor-pointer">
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-[24px] transition-all duration-700 ${isSelected ? 'ring-2 ring-[#1A1A1A] ring-offset-4' : ''}`}>
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm backdrop-blur-md border border-white/20 transition-all duration-500
                        ${service.isRecommended ? 'bg-[#8B7E74] text-white' : 'bg-white/90 text-[#1A1A1A]'}`}>
                        {tagText}
                      </span>
                    </div>
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                    <div className="absolute top-4 right-4 backdrop-blur-xl bg-white/95 px-4 py-2 rounded-full shadow-md border border-white/20">
                      <span className="text-[14px] font-bold tracking-tight text-[#1A1A1A]">{service.priceHint}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center animate-in fade-in duration-500">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-2xl">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
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

      {/* FOOTER - WITH UPDATED HINT TEXT */}
      <footer className={`fixed bottom-0 left-0 w-full px-6 pb-8 md:pb-12 z-50 pointer-events-none transition-all duration-700 transform 
        ${bookingData.service || bookingData.offer ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button
            onClick={() => (bookingData.service?.needsSkinType && !bookingData.skinType) ? setIsModalOpen(true) : router.push('/time')}
            className="w-full bg-[#1A1A1A] text-white py-5 px-6 flex flex-col items-center justify-center group relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-[0.98] overflow-hidden transition-all duration-300 rounded-[24px] md:rounded-[32px]"
          >
            <div className="absolute inset-0 bg-[#8B7E74] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            <div className="flex flex-col items-center z-10 relative">
              <span className="text-[12px] font-black uppercase tracking-[0.4em] mb-0.5">
                Choose Time Window
              </span>
              {/* ✨ ADDED HINT TEXT BELOW */}
              <span className="text-[9px] font-medium text-white/60 tracking-wider">
                You can adjust services later on WhatsApp
              </span>
            </div>
          </button>
        </div>
      </footer>

      <SkinModal 
        isOpen={isModalOpen} 
        onConfirm={(skin) => { 
          setSkinType(skin); 
          setIsModalOpen(false); 
          router.push('/time'); 
        }} 
      />
    </main>
  );
}

// SkinModal code remains exactly the same as provided
function SkinModal({ isOpen, onConfirm }) {
  const [selected, setSelected] = useState(null);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-md transition-opacity duration-500" />
      <div className="relative bg-[#FDFCFB] w-full max-w-lg overflow-hidden rounded-[32px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.35)] animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#8B7E74]/10">
           <div className="h-full bg-[#8B7E74] transition-all duration-700 ease-out" style={{ width: selected ? '100%' : '15%' }} />
        </div>
        <div className="p-8 md:p-10">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
               <div className="h-[1px] w-8 bg-[#8B7E74]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B7E74]">Profile</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-tighter leading-tight">
              Skin <span className="italic font-serif font-light text-[#8B7E74]">Analysis.</span>
            </h2>
          </header>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {SKIN_TYPES.map((type) => {
              const isPicked = selected === type.id;
              return (
                <button 
                  key={type.id} 
                  onClick={() => setSelected(type.id)}
                  className={`relative flex flex-col items-start p-5 rounded-2xl border transition-all duration-500 text-left ${isPicked ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-xl translate-y-[-2px]' : 'border-[#F1F1F1] bg-white hover:border-[#8B7E74]/50'}`}
                >
                  <span className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isPicked ? 'text-white' : 'text-[#1A1A1A]'}`}>{type.label}</span>
                  <span className={`text-[9px] leading-tight font-medium ${isPicked ? 'text-gray-400' : 'text-gray-500'}`}>{type.desc}</span>
                </button>
              );
            })}
          </div>

          <button 
            disabled={!selected} 
            onClick={() => onConfirm(selected)}
            className={`w-full h-14 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 ${selected ? 'bg-[#1A1A1A] text-white shadow-lg hover:bg-[#8B7E74]' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
          >
            Confirm Selection
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}