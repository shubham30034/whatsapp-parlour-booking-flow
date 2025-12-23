'use client';
import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    service: null,
    skinType: null,
    date: null,
    slot: null
  });

  const setService = (service) => {
    setBookingData(prev => ({ 
      ...prev, 
      service, 
      skinType: null // Reset skin if service changes
    }));
  };

  const setSkinType = (type) => {
    setBookingData(prev => ({ ...prev, skinType: type }));
  };

  const setSchedule = (date, slot) => {
    setBookingData(prev => ({ ...prev, date, slot }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, setService, setSkinType, setSchedule }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);