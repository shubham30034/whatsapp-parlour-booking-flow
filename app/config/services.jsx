// ==================================================
// 1. SKIN TYPES CONFIG
// ==================================================
export const SKIN_TYPES = [
  { id: "normal", label: "Normal", desc: "Balanced & Clear" },
  { id: "dry", label: "Dry", desc: "Needs Hydration" },
  { id: "oily", label: "Oily", desc: "Shiny & Active" },
  { id: "sensitive", label: "Sensitive", desc: "Fragile & Delicate" },
  { id: "unknown", label: "Not Sure", desc: "Help Me Decide" },
];


// ==================================================
// 2. TIME SLOTS CONFIG
// ==================================================
export const TIME_SLOTS = [
  { id: "morning", title: "Morning", hint: "09:00 AM – 12:00 PM" },
  { id: "afternoon", title: "Afternoon", hint: "12:00 PM – 04:00 PM" },
  { id: "evening", title: "Evening", hint: "04:00 PM – 08:00 PM" },
];


// ==================================================
// 3. SERVICES CONFIG (PURE, NO OFFERS)
// ==================================================
export const SERVICES = [
  {
    id: "haircut",
    name: "Precision Haircut",
    category: "hair",
    duration: 45,
    priceHint: "Starts ₹499",
    image: "/Haircut.png",
    needsSkinType: false,
    active: true,
    psychologyTag: "Quick & Hassle-Free",
    isRecommended: false,
  },

  {
    id: "facial",
    name: "Hydra-Facial Luxe",
    category: "skin",
    duration: 60,
    priceHint: "Starts ₹999",
    image: "/facial.png",
    needsSkinType: true,
    active: true,
    psychologyTag: "Recommended for Your Skin",
    isRecommended: true, // ONLY ONE HERO
  },

  {
    id: "cleanup",
    name: "Deep Pore Cleanup",
    category: "skin",
    duration: 40,
    priceHint: "Starts ₹699",
    image: "/Poreclean.png",
    needsSkinType: true,
    active: true,
    psychologyTag: "First-Time Friendly",
    isRecommended: false,
  },

  {
    id: "waxing",
    name: "Organic Waxing",
    category: "body",
    duration: 30,
    priceHint: "Starts ₹399",
    image: "/Waxing.png",
    needsSkinType: false,
    active: true,
    psychologyTag: "Most Chosen",
    isRecommended: false,
  },

  {
    id: "pedicure",
    name: "Luxury Pedicure",
    category: "body",
    duration: 50,
    priceHint: "Starts ₹799",
    image: "/pedicure.png",
    needsSkinType: false,
    active: true,
    psychologyTag: "Relax & Refresh",
    isRecommended: false,
  },

  {
    id: "bridal",
    name: "Bridal Artistry",
    category: "bridal",
    duration: 180,
    priceHint: "Starts ₹15,000",
    image: "/Bridalmakeup.png",
    needsSkinType: true,
    active: true,
    psychologyTag: "Limited Daily Slots",
    isRecommended: false,
  },
];


// ==================================================
// 4. OFFERS CONFIG (EVERGREEN + SPECIAL)
// ==================================================
// RULES:
// - Only ONE offer active at a time
// - Special overrides evergreen
// - Manual ON/OFF (no date automation)
// - Text only
// - Uses SERVICE IDs, not names
// - Price is always "Starting at"

export const OFFERS = {
  evergreen: {
    id: "evergreen_glow_combo",
    enabled: true,

    type: "combo",

    title: "Glow Combo",

    servicesIncluded: ["facial", "cleanup"],

    priceHint: "Starting at ₹1,499",

    tag: "Value Combo",

    note: "Final price & timing confirmed on WhatsApp",
  },

  special: {
    id: "new_year_luxe_combo",
    enabled: true, // 👉 New Year pe true karna

    type: "combo",

    title: "New Year Luxe Combo",

    servicesIncluded: ["facial", "cleanup"],

    priceHint: "Starting at ₹1,299",

    tag: "Limited Time • New Year",

    note: "New Year special offer. Details confirmed on WhatsApp",
  },
};


// ==================================================
// 5. HELPER FUNCTIONS
// ==================================================

// Active services only
export const getActiveServices = () =>
  SERVICES.filter(service => service.active);


// Only ONE recommended (hero) service
export const getRecommendedService = () =>
  SERVICES.find(service => service.isRecommended);


// Skin-based psychology text
export const getSkinBasedTag = (service, skinType) => {
  if (!service.needsSkinType || !skinType) {
    return service.psychologyTag;
  }

  switch (skinType) {
    case "dry":
      return "Recommended for Dry Skin";
    case "oily":
      return "Great for Oily Skin";
    case "sensitive":
      return "Gentle for Sensitive Skin";
    default:
      return service.psychologyTag;
  }
};


// Pick ACTIVE OFFER (special > evergreen)
export const getActiveOffer = () => {
  if (OFFERS.special.enabled) return OFFERS.special;
  if (OFFERS.evergreen.enabled) return OFFERS.evergreen;
  return null;
};


// Check if service is part of active combo
export const isServiceInOffer = (serviceId) => {
  const offer = getActiveOffer();
  if (!offer) return false;
  if (offer.type !== "combo") return false;

  return offer.servicesIncluded.includes(serviceId);
};
