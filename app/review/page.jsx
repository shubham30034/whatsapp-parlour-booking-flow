'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import { useBooking } from '../context/BookingContext';

const ReviewPage = () => {
  const router = useRouter();
  const { bookingData } = useBooking();
  const [mounted, setMounted] = useState(false);

  const { service, skinType, date, slot } = bookingData;

  useEffect(() => {
    setMounted(true);

    if (!service) {
      router.replace('/service');
      return;
    }

    if (!date || !slot) {
      router.replace('/time');
      return;
    }

    if (service.needsSkinType && !skinType) {
      router.replace('/service');
      return;
    }
  }, [service, date, slot, skinType, router]);

  if (!service || !mounted) return null;

  return (
    <main className="h-screen bg-[#FDFCFB] text-[#1A1A1A] antialiased overflow-hidden flex flex-col">
      <NavBar />

      <div className={`flex-1 flex flex-col justify-center max-w-xl mx-auto px-6 w-full transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'}`}>
        
        {/* HEADER */}
        <header className="mb-6">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8B7E74] mb-1">
            Step 03 / Final
          </p>
          <h1 className="text-[32px] md:text-[42px] font-bold tracking-tighter leading-none">
            Review <span className="italic font-serif font-light text-[#8B7E74]">Order</span>
          </h1>
        </header>

        {/* RECEIPT */}
        <div className="bg-white border border-[#F1F1F1] p-6 md:p-8 shadow-sm relative">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-[#8B7E74]" />

          <div className="space-y-6">
            <div className="border-b border-dashed border-[#F1F1F1] pb-5">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#BDBDBD] block mb-2">
                Service
              </label>
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-[18px] md:text-[22px] font-bold tracking-tight">
                  {service.name}
                </h3>
                <p className="font-bold text-[16px] tracking-tighter">
                  {service.priceHint}
                </p>
              </div>
              <p className="text-[10px] text-[#A1A1A1] mt-1 font-bold uppercase">
                {service.duration} MINS • {service.category}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-dashed border-[#F1F1F1] pb-5">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-[#BDBDBD] block mb-1">
                  Date
                </label>
                <p className="text-[15px] md:text-[17px] font-bold capitalize">
                  {date}
                </p>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-[#BDBDBD] block mb-1">
                  Window
                </label>
                <p className="text-[15px] md:text-[17px] font-bold capitalize">
                  {slot}
                </p>
              </div>
            </div>

            {skinType && (
              <div className="border-b border-dashed border-[#F1F1F1] pb-5">
                <label className="text-[9px] font-black uppercase tracking-widest text-[#BDBDBD] block mb-1">
                  Skin Profile
                </label>
                <p className="text-[15px] md:text-[17px] font-bold capitalize">
                  {skinType} Type
                </p>
              </div>
            )}

            <p className="text-[10px] text-[#707070] italic">
              *Confirming will redirect you to WhatsApp for final timing.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => {
              const message = `Hi Artistry! I'd like to book:%0A- Service: ${service.name}%0A- Date: ${date}%0A- Window: ${slot}${skinType ? `%0A- Skin: ${skinType}` : ''}`;
              window.open(`https://wa.me/918279898128?text=${message}`, '_blank');
            }}
            className="w-full bg-[#1A1A1A] text-white py-5 flex items-center justify-center gap-4 group hover:bg-[#8B7E74] transition-all duration-500 shadow-lg active:scale-[0.98]"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">
              Confirm & WhatsApp
            </span>
          </button>

          <button
            onClick={() => router.back()}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-[#BDBDBD] hover:text-[#1A1A1A] transition-colors py-2"
          >
            ← Back to Edit
          </button>
        </div>
      </div>
    </main>
  );
};

export default ReviewPage;
