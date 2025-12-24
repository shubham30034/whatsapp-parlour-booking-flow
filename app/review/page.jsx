'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import { useBooking } from '../context/BookingContext';

const ReviewPage = () => {
  const router = useRouter();
  const { bookingData } = useBooking();
  const [mounted, setMounted] = useState(false);

  // Logic: Normalize offer or service
  const service = bookingData.offer
    ? {
        name: bookingData.offer.title,
        priceHint: bookingData.offer.priceHint
      }
    : bookingData.service;

  const { skinType, date, slot } = bookingData;

  useEffect(() => {
    setMounted(true);

    if (!bookingData.service && !bookingData.offer) {
      router.replace('/service');
      return;
    }

    if (!date || !slot) {
      router.replace('/time');
      return;
    }
  }, [bookingData.service, bookingData.offer, date, slot, router]);

  if (!service || !mounted) return null;

  const handleConfirm = () => {
    const message = `Hi Artistry Team! ✨%0AI'm almost done with my booking!%0A%0A🌿 Experience: ${service.name}%0A🗓 Date: ${date}%0A⏰ Window: ${slot}${skinType ? `%0A👤 Skin Profile: ${skinType}` : ''}%0A%0APlease confirm the exact time for me!`;

    window.open(
      `https://wa.me/918279898128?text=${message}`,
      '_blank'
    );
  };

  return (
    <main className="h-screen bg-[#FDFCFB] text-[#1A1A1A] antialiased flex flex-col overflow-hidden">
      <NavBar />

      <div className={`flex-1 flex flex-col max-w-xl mx-auto px-6 w-full pt-24 pb-6 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* HEADER */}
        <header className="mb-6 text-center md:text-left px-2">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="w-8 h-[1px] bg-[#8B7E74]" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B7E74]">
              Step 03 / 03
            </p>
          </div>
          <h1 className="text-[36px] md:text-[52px] font-bold tracking-tighter leading-[0.9] mb-3">
            Almost <span className="italic font-serif font-light text-[#8B7E74]">Done.</span>
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            Everything looks perfect. Secure your artistry session below.
          </p>
        </header>

        {/* LUXURY RECEIPT CARD */}
        <div className="bg-white border border-[#F1F1F1] rounded-[28px] p-6 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] relative overflow-hidden mb-6">
          
          <div className="absolute top-5 right-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
              Reserved
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8B7E74] block mb-2">
                Experience
              </label>
              {/* FIXED: Font consistency and baseline alignment */}
              <div className="flex justify-between items-baseline gap-4">
                <h3 className="text-xl md:text-2xl font-bold tracking-tighter">
                  {service.name}
                </h3>
                <p className="text-base font-semibold tracking-tight text-[#8B7E74] whitespace-nowrap">
                  {service.priceHint}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-4 border-y border-dashed border-[#F1F1F1]">
              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#BDBDBD] block mb-1">
                  Date
                </label>
                <p className="text-md font-bold capitalize">{date}</p>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#BDBDBD] block mb-1">
                  Window
                </label>
                <p className="text-md font-bold capitalize">{slot}</p>
              </div>
            </div>

            <div className="bg-[#8B7E74]/5 p-4 rounded-2xl border border-[#8B7E74]/10">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#8B7E74] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#8B7E74] font-bold uppercase tracking-tight">
                    Final Step on WhatsApp
                  </p>
                  <p className="text-[10px] text-[#8B7E74]/80 leading-relaxed mt-0.5 font-medium">
                    Our team will coordinate with you via WhatsApp to confirm the <span className="font-bold underline">exact appointment time</span> based on availability.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 font-medium italic px-1">
              * No advance payment. Pay after your service.
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-auto space-y-3 pb-4">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#1A1A1A] text-white h-14 rounded-2xl flex items-center justify-center gap-4 group transition-all duration-500 hover:bg-[#8B7E74] shadow-lg active:scale-[0.98]"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">
              Send Booking on WhatsApp
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => router.back()}
            className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-[#BDBDBD] hover:text-[#1A1A1A] transition-colors py-2 text-center"
          >
            ← Back to Edit Details
          </button>
        </div>
      </div>
    </main>
  );
};

export default ReviewPage;