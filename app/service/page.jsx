'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { services } from '@/app/config/services';
import NavBar from '../components/NavBar';
import { useBooking } from '../context/BookingContext';

// MODAL COMPONENT (unchanged logic)
const SkinModal = ({ isOpen, onConfirm }) => {
  const [tempSkin, setTempSkin] = useState(null);
  if (!isOpen) return null;

  const TYPES = [
    { id: 'normal', label: 'Normal' }, { id: 'dry', label: 'Dry' },
    { id: 'oily', label: 'Oily' }, { id: 'combination', label: 'Combination' },
    { id: 'sensitive', label: 'Sensitive' }, { id: 'unsure', label: 'Not Sure' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" />
      <div className="relative bg-[#FDFCFB] w-full max-w-lg p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
        <header className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B7E74] mb-2">Step 1.5 / Consultation</p>
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-tighter leading-none">
            Your Skin <span className="italic font-serif font-light text-[#8B7E74]">Profile</span>
          </h2>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTempSkin(t.id)}
              className={`py-4 border transition-all duration-300 text-[11px] font-black uppercase tracking-widest
                ${tempSkin === t.id ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' : 'bg-white border-[#F1F1F1] text-[#1A1A1A]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          disabled={!tempSkin}
          onClick={() => onConfirm(tempSkin)}
          className={`w-full py-5 text-[12px] font-black uppercase tracking-[0.3em] transition-all
            ${tempSkin ? 'bg-[#8B7E74] text-white shadow-xl' : 'bg-[#F5F5F5] text-[#BDBDBD]'}`}
        >
          Confirm & See Slots
        </button>
      </div>
    </div>
  );
};

export default function ServicePage() {
  const router = useRouter();
  const { bookingData, setService, setSkinType } = useBooking();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // FOR ENTRANCE ANIMATION

  useEffect(() => {
    setMounted(true); // Trigger animation on load
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

  const handleSkinConfirm = (skin) => {
    setSkinType(skin);
    setIsModalOpen(false);
    router.push('/time');
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] antialiased pb-32">
      <NavBar />

      {/* HEADER WITH ENTRANCE ANIMATION */}
      <header className={`max-w-6xl mx-auto px-6 pt-32 pb-12 transition-all duration-1000 transform 
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F1F1F1] pb-10">
          <div>
            <h1 className="text-[40px] md:text-[72px] font-bold tracking-tighter leading-none mb-4">
              Our <span className="italic font-serif font-light text-[#8B7E74]">Artistry</span>
            </h1>
            <p className="text-[14px] md:text-[18px] text-[#707070] font-medium max-w-md">
              High-performance treatments tailored to your unique beauty profile.
            </p>
          </div>
        </div>
      </header>

      {/* SERVICES GRID WITH STAGGERED ENTRANCE */}
      <section className={`max-w-6xl mx-auto px-6 transition-all duration-1000 delay-300 transform 
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          {activeServices.map((service, index) => {
            const isSelected = bookingData.service?.id === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setService(service)}
                className={`group relative flex flex-col cursor-pointer transition-all duration-700
                  ${isSelected ? 'opacity-100' : 'hover:opacity-90'}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[#F5F5F5]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className={`w-full h-full object-cover transition-transform duration-[2s]
                      ${isSelected ? 'scale-105' : 'group-hover:scale-110'}`}
                  />
                  {/* Selected Overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center animate-in fade-in duration-500">
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                       </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B7E74]">
                        {service.category}
                      </span>
                      <span className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.1em]">
                        {service.duration} MINS
                      </span>
                    </div>
                    <h3 className="text-[24px] md:text-[28px] font-bold tracking-tight group-hover:text-[#8B7E74] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-[16px] font-bold tracking-tighter">
                    {service.priceHint}
                  </p>
                </div>

                <div
                  className={`h-[2px] mt-4 bg-[#1A1A1A] transition-all duration-500
                  ${isSelected ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-12 group-hover:opacity-30'}`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`fixed bottom-0 left-0 w-full px-6 py-8 z-50 transition-all duration-500 transform
        ${bookingData.service ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleContinue}
            className="w-full bg-[#1A1A1A] text-white py-6 flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] group relative overflow-hidden transition-all"
          >
            <span className="text-[12px] font-black uppercase tracking-[0.4em] z-10">Continue to Timing</span>
            <div className="absolute inset-0 bg-[#8B7E74] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </footer>

      <SkinModal isOpen={isModalOpen} onConfirm={handleSkinConfirm} />
    </main>
  );
}