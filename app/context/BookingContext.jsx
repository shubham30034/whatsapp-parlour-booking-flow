'use client';
import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    service: null,
    offer: null,     // ✅ ADD
    skinType: null,
    date: null,
    slot: null
  });

  const setService = (service) => {
    setBookingData(prev => ({
      ...prev,
      service,
      offer: null,        // ✅ service select = offer reset
      skinType: null
    }));
  };

  const setOffer = (offer) => {
    setBookingData(prev => ({
      ...prev,
      offer,
      service: null,      // ✅ offer select = service reset
      skinType: null
    }));
  };

  const setSkinType = (type) => {
    setBookingData(prev => ({ ...prev, skinType: type }));
  };

  const setSchedule = (date, slot) => {
    setBookingData(prev => ({ ...prev, date, slot }));
  };

  return (
    <BookingContext.Provider
      value={{ bookingData, setService, setOffer, setSkinType, setSchedule }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
