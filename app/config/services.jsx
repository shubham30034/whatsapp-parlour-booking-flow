// 1. Skin Types Config
export const SKIN_TYPES = [
  { id: 'normal', label: 'Normal' },
  { id: 'dry', label: 'Dry' },
  { id: 'oily', label: 'Oily' },
  { id: 'combination', label: 'Comb.' },
  { id: 'sensitive', label: 'Sens.' },
];

// 2. Time Slots Config
export const TIME_SLOTS = [
  { id: 'morning', title: 'Morning', hint: '09:00 AM – 12:00 PM' },
  { id: 'afternoon', title: 'Afternoon', hint: '12:00 PM – 04:00 PM' },
  { id: 'evening', title: 'Evening', hint: '04:00 PM – 08:00 PM' },
];

// 3. Main Services Config
export const services = [
  {
    id: "haircut",
    name: "Precision Haircut",
    duration: 45,
    priceHint: "Starts ₹499",
    category: "hair",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop",
    needsSkinType: false, // Isme skin ki zaroorat nahi
    active: true,
  },
  {
    id: "facial",
    name: "Hydra-Facial Luxe",
    duration: 60,
    priceHint: "Starts ₹999",
    category: "skin",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop",
    needsSkinType: true, // Isme skin selection dikhega
    active: true,
  },
  {
    id: "cleanup",
    name: "Deep Pore Cleanup",
    duration: 40,
    priceHint: "Starts ₹699",
    category: "skin",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000&auto=format&fit=crop",
    needsSkinType: true,
    active: true,
  },
  {
    id: "waxing",
    name: "Organic Waxing",
    duration: 30,
    priceHint: "Starts ₹399",
    category: "body",
    image: "https://images.unsplash.com/photo-1544161515-4ae6ce6e8584?q=80&w=1000&auto=format&fit=crop",
    needsSkinType: false,
    active: true,
  },
  {
    id: "bridal",
    name: "Bridal Artistry",
    duration: 180,
    priceHint: "Starts ₹15,000",
    category: "bridal",
    image: "https://images.unsplash.com/photo-1595152434305-16729f39a05b?q=80&w=1000&auto=format&fit=crop",
    needsSkinType: true, // Makeup products skin ke hisaab se hote hain
    active: true,
  },
  {
    id: "pedicure",
    name: "Luxury Pedicure",
    duration: 50,
    priceHint: "Starts ₹799",
    category: "body",
    image: "https://images.unsplash.com/photo-1519415510236-855906a1b558?q=80&w=1000&auto=format&fit=crop",
    needsSkinType: false,
    active: true,
  },
];