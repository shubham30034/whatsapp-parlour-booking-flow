// 1. Skin Types Config
   export const SKIN_TYPES = [
    { id: 'normal', label: 'Normal', desc: 'Balanced & Clear' },
    { id: 'dry', label: 'Dry', desc: 'Needs Hydration' },
    { id: 'oily', label: 'Oily', desc: 'Shiny & Active' },
    { id: 'sensitive', label: 'Sensitive', desc: 'Fragile & Delicate' },
    {id:'i dont know', label:'Not Sure', desc:'Help Me Decide'}
  ];

// 2. Time Slots Config
export const TIME_SLOTS = [
  { id: 'morning', title: 'Morning', hint: '09:00 AM – 12:00 PM' },
  { id: 'afternoon', title: 'Afternoon', hint: '12:00 PM – 04:00 PM' },
  { id: 'evening', title: 'Evening', hint: '04:00 PM – 08:00 PM' },
];

// 3. Main Services Config (Updated with Local Public Paths)
export const services = [
  {
    id: "haircut",
    name: "Precision Haircut",
    duration: 45,
    priceHint: "Starts ₹499",
    category: "hair",
    image: "/Haircut.png", // Public folder reference
    needsSkinType: false,
    active: true,
  },
  {
    id: "facial",
    name: "Hydra-Facial Luxe",
    duration: 60,
    priceHint: "Starts ₹999",
    category: "skin",
    image: "/facial.png", // Public folder reference
    needsSkinType: true,
    active: true,
  },
  {
    id: "cleanup",
    name: "Deep Pore Cleanup",
    duration: 40,
    priceHint: "Starts ₹699",
    category: "skin",
    image: "/Poreclean.png", // Public folder reference
    needsSkinType: true,
    active: true,
  },
  {
    id: "waxing",
    name: "Organic Waxing",
    duration: 30,
    priceHint: "Starts ₹399",
    category: "body",
    image: "/Waxing.png", // Public folder reference
    needsSkinType: false,
    active: true,
  },
  {
    id: "bridal",
    name: "Bridal Artistry",
    duration: 180,
    priceHint: "Starts ₹15,000",
    category: "bridal",
    image: "/Bridalmakeup.png", // Public folder reference
    needsSkinType: true,
    active: true,
  },
  {
    id: "pedicure",
    name: "Luxury Pedicure",
    duration: 50,
    priceHint: "Starts ₹799",
    category: "body",
    image: "/pedicure.png", // Public folder reference
    needsSkinType: false,
    active: true,
  },
];