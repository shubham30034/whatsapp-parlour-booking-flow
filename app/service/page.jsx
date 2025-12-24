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
        <header className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8B7E74] mb-2">Step 01 / 03</p>
          <h1 className="text-[34px] md:text-[56px] font-bold tracking-tighter leading-[1.1] mb-3">
            Select Your <span className="italic font-serif font-light text-[#8B7E74]">Beauty Offer.</span>
          </h1>
          <p className="text-[10px] md:text-xs font-medium text-gray-400 max-w-md leading-relaxed">
            *Final pricing may vary slightly based on your custom skin profile and total service duration.
          </p>
        </header>

        <section className="max-w-6xl mx-auto px-5 pb-48">
          {/* COMPACT OFFER CARD */}
          {activeOffer && (
            <div 
              onClick={() => setOffer(activeOffer)}
              className={`mb-12 relative overflow-hidden rounded-[24px] transition-all duration-500 cursor-pointer active:scale-[0.98]
              ${bookingData.offer?.id === activeOffer.id ? 'bg-[#8B7E74] shadow-xl' : 'bg-[#1A1A1A] shadow-lg'}`}
            >
              <div className="p-6 md:p-8 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-white/10 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/10">
                        {activeOffer.offerName || "Limited Offer"}
                      </span>
                      <span className="text-[#FDFCFB]/60 text-[8px] font-bold uppercase tracking-widest italic">New Year SPECIAL</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none mb-1">
                      {activeOffer.title}
                    </h2>
                    
                    {/* Validity Text */}
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.1em] mb-4">
                      Valid Until: {activeOffer.validUntil || "Limited Time"}
                    </p>

                    {/* Services Included Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeOffer.servicesIncluded?.map((serviceName, index) => (
                        <div key={index} className="flex items-center gap-2 text-white/90">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span className="text-[10px] font-bold uppercase tracking-tight leading-none">
                            {serviceName}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 text-white/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span className="text-[10px] font-bold uppercase tracking-tight leading-none text-[#FDFCFB]">Save upto ₹300</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center md:flex-col md:items-end justify-between border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Starting at</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none">{activeOffer.priceHint}</span>
                      </div>
                    </div>
                    
                    <div className={`mt-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                      ${bookingData.offer?.id === activeOffer.id ? 'bg-white scale-110 shadow-lg' : 'bg-white/10 opacity-50'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={bookingData.offer?.id === activeOffer.id ? "#8B7E74" : "white"} strokeWidth="4">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {activeServices.map((service) => {
              const isSelected = bookingData.service?.id === service.id;
              const tagText = getSkinBasedTag(service, bookingData.skinType);
              return (
                <div key={service.id} onClick={() => setService(service)} className="group cursor-pointer">
                  <div className={`relative aspect-[16/9] overflow-hidden rounded-[20px] transition-all duration-700 ${isSelected ? 'ring-2 ring-[#1A1A1A] ring-offset-2' : ''}`}>
                    <div className="absolute top-3 left-3 z-20">
                      <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm backdrop-blur-md border border-white/20
                        ${service.isRecommended ? 'bg-[#8B7E74] text-white' : 'bg-white/90 text-[#1A1A1A]'}`}>
                        {tagText}
                      </span>
                    </div>
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                    <div className="absolute top-3 right-3 backdrop-blur-md bg-white/90 px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-[12px] font-bold tracking-tight text-[#1A1A1A]">{service.priceHint}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center animate-in fade-in duration-300">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-xl">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 px-1">
                    <div className="flex items-center gap-2 mb-1.5 text-[8px] font-bold uppercase tracking-widest">
                      <span className="text-[#8B7E74]">{service.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400">{service.duration} MIN</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight group-hover:text-[#8B7E74] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className={`fixed bottom-0 left-0 w-full px-6 pb-6 z-50 pointer-events-none transition-all duration-700 transform 
        ${bookingData.service || bookingData.offer ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="max-w-xl mx-auto pointer-events-auto">
          <button
            onClick={() => (bookingData.service?.needsSkinType && !bookingData.skinType) ? setIsModalOpen(true) : router.push('/time')}
            className="w-full bg-[#1A1A1A] text-white py-4 px-6 flex flex-col items-center justify-center group relative shadow-2xl active:scale-[0.98] overflow-hidden transition-all duration-300 rounded-[20px]"
          >
            <div className="absolute inset-0 bg-[#8B7E74] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="flex flex-col items-center z-10 relative">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] mb-0.5">Continue to Timing</span>
              <span className="text-[8px] font-medium text-white/50 tracking-wider italic">Adjustments can be made on WhatsApp</span>
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

function SkinModal({ isOpen, onConfirm }) {
  const [selected, setSelected] = useState(null);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm transition-opacity duration-500" />
      <div className="relative bg-[#FDFCFB] w-full max-w-sm overflow-hidden rounded-[28px] shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8">
          <header className="mb-6">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B7E74] mb-1">Skin Profile</p>
            <h2 className="text-2xl font-bold tracking-tighter leading-tight">Identify <span className="italic font-serif font-light text-[#8B7E74]">Skin.</span></h2>
          </header>

          <div className="space-y-2.5 mb-8">
            {SKIN_TYPES.map((type) => {
              const isPicked = selected === type.id;
              return (
                <button 
                  key={type.id} 
                  onClick={() => setSelected(type.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left ${isPicked ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-lg' : 'border-[#F1F1F1] bg-white'}`}
                >
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-widest block ${isPicked ? 'text-white' : 'text-[#1A1A1A]'}`}>{type.label}</span>
                    <span className={`text-[8px] font-medium ${isPicked ? 'text-white/60' : 'text-gray-400'}`}>{type.desc}</span>
                  </div>
                  {isPicked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>

          <button 
            disabled={!selected} 
            onClick={() => onConfirm(selected)}
            className={`w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${selected ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-gray-100 text-gray-300'}`}
          >
            Confirm & Proceed
          </button>
        </div>
      </div>
    </div>
  );
}