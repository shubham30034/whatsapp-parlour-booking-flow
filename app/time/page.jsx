'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useBooking } from '../context/BookingContext';

const DAYS = [
  { id: 'today', title: 'Today', sub: 'Dec 24' },
  { id: 'tomorrow', title: 'Tomorrow', sub: 'Dec 25' },
];

const SLOTS = [
  { id: 'morning', title: 'Morning', hint: '09:00 AM – 12:00 PM' },
  { id: 'afternoon', title: 'Afternoon', hint: '12:00 PM – 04:00 PM' },
  { id: 'evening', title: 'Evening', hint: '04:00 PM – 08:00 PM' },
];

const TimePage = () => {
  const router = useRouter();
  const { bookingData, setSchedule } = useBooking();
  const [mounted, setMounted] = useState(false);

  const day = bookingData.date;
  const slot = bookingData.slot;

  useEffect(() => {
    // ✅ LOGIC FIX: service OR offer
    if (!bookingData.service && !bookingData.offer) {
      router.replace('/service');
    }
    setMounted(true);
  }, [bookingData.service, bookingData.offer, router]);

  const canContinue = day && slot;

  const steps = [
    { name: 'Service', path: '/service' },
    { name: 'Time', path: '/time' },
    { name: 'Review', path: '/review' }
  ];

  // ✅ LOGIC FIX: null guard updated
  if (!bookingData.service && !bookingData.offer) return null;

  return (
    <main className="h-screen bg-[#FDFCFB] text-[#1A1A1A] antialiased flex flex-col overflow-hidden relative">
      <NavBar />

      {/* --- PROGRESS INDICATOR --- */}
      <div className={`w-full max-w-6xl mx-auto px-6 mt-24 md:mt-32 transition-all duration-1000 delay-100 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-xs flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E0E0E0] -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => {
            const isActive = index === 1;
            const isCompleted = index < 1;

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

      <div
        className={`flex-1 overflow-y-auto md:overflow-hidden transition-all duration-1000 transform ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-32 md:py-0 md:h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start md:items-center">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-5">
              <header className="mb-8">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8B7E74] mb-2">
                  Step 02 / 03
                </p>
                <h1 className="text-[36px] md:text-[56px] lg:text-[64px] font-bold tracking-tighter leading-none mb-4">
                  The <span className="italic font-serif font-light text-[#8B7E74]">Schedule</span>
                </h1>
                <p className="text-[13px] md:text-[15px] text-[#707070] font-medium max-w-xs leading-relaxed">
                  Choose a window. We will finalize exact timing via WhatsApp.
                </p>
              </header>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BDBDBD] mb-2">
                  Select Date
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  {DAYS.map((d) => {
                    const active = day === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSchedule(d.id, slot)}
                        className={`px-5 py-4 md:py-6 text-left transition-all duration-500 border rounded-xl md:rounded-none
                          ${active 
                            ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-xl lg:translate-x-2' 
                            : 'bg-white border-[#F1F1F1] text-[#1A1A1A] hover:border-[#8B7E74]'}`}
                      >
                        <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${active ? 'text-[#8B7E74]' : 'text-[#BDBDBD]'}`}>
                          {d.sub}
                        </p>
                        <h3 className="text-[18px] md:text-[22px] font-bold tracking-tight">
                          {d.title}
                        </h3>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-7 lg:border-l lg:border-[#F1F1F1] lg:pl-16">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BDBDBD] mb-8 md:mb-10">
                Preferred Window
              </p>

              <div className="relative space-y-4 md:space-y-6 before:absolute before:left-[23px] md:before:left-[31px] before:top-0 before:bottom-0 before:w-px before:bg-[#F1F1F1]">
                {SLOTS.map((s) => {
                  const active = slot === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSchedule(day, s.id)}
                      className="w-full group relative flex items-start gap-6 md:gap-10 text-left outline-none"
                    >
                      <div className={`z-10 w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full border-[3px] md:border-4 border-[#FDFCFB] flex items-center justify-center transition-all duration-500
                        ${active ? 'bg-[#1A1A1A] scale-105 shadow-lg' : 'bg-[#F5F5F5] group-hover:bg-[#8B7E74]/10'}`}>
                        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${active ? 'bg-[#8B7E74]' : 'bg-[#D1D1D1]'}`} />
                      </div>

                      <div className={`flex-1 pb-4 border-b border-[#F1F1F1] transition-all duration-500 ${active ? 'translate-x-2' : ''}`}>
                        <h4 className={`text-[18px] md:text-[22px] lg:text-[24px] font-bold tracking-tight mb-0.5 transition-colors ${active ? 'text-[#8B7E74]' : 'text-[#1A1A1A]'}`}>
                          {s.title}
                        </h4>
                        <p className="text-[11px] md:text-[13px] font-medium text-[#707070] uppercase tracking-wider">
                          {s.hint}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className={`fixed bottom-0 left-0 w-full px-6 pb-8 md:pb-12 z-50 pointer-events-none transition-all duration-700 transform 
        ${canContinue ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button
            onClick={() => router.push('/review')}
            className="w-full bg-[#1A1A1A] text-white h-[64px] md:h-[74px] flex items-center justify-center gap-4 group relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-[0.98] overflow-hidden transition-all duration-300 rounded-2xl md:rounded-none"
          >
            <div className="absolute inset-0 bg-[#8B7E74] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="text-[12px] font-black uppercase tracking-[0.4em] z-10 relative">
              Confirm Schedule
            </span>
          </button>
        </div>
      </footer>
    </main>
  );
};

export default TimePage;
