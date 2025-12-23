import React from 'react'
import { useRouter } from 'next/navigation';

const NavBar = () => {

    const router = useRouter();
  return (
    <div>
         <nav className="fixed top-0 w-full z-50 bg-[#FDFCFB]/80 backdrop-blur-md border-b border-[#F1F1F1] px-6 py-4 flex justify-between items-center">
        <button onClick={() => router.back()} className="text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:opacity-60 transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          Back
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B7E74]">Studio Booking</span>
        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px] font-bold">01</div>
      </nav>

    </div>
  )
}

export default NavBar