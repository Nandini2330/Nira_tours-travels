// NIRA TOURS & TRAVELS - Persistent Data Engine & Storage Service

const DB_KEYS = {
  USERS: 'omj_db_users',
  TRIP_REQUESTS: 'omj_db_trip_requests',
  STATUS_HISTORY: 'omj_db_status_history',
  QUOTATIONS: 'omj_db_quotations',
  ITINERARIES: 'omj_db_itineraries',
  NOTIFICATIONS: 'omj_db_notifications',
  DESTINATIONS: 'omj_db_destinations',
  HERO_SLIDES: 'omj_db_hero_slides',
  CURRENT_SESSION: 'omj_db_current_session',
  RESET_TOKENS: 'omj_db_reset_tokens'
};

// Simple secure hash function simulation
export const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'sha256_' + Math.abs(hash).toString(16) + 'x99';
};

// Initial Seed Data
const INITIAL_USERS = [
  {
    id: 'usr-admin-1',
    name: 'Nira Tours & Travels Admin',
    email: 'admin@omjourneys.com',
    phone: '+91 98765 43210',
    passwordHash: hashPassword('Admin@123'),
    role: 'ADMIN',
    city: 'Mumbai',
    country: 'India',
    createdAt: new Date('2026-01-01').toISOString()
  },
  {
    id: 'usr-cust-1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 98200 12345',
    passwordHash: hashPassword('Customer@123'),
    role: 'CUSTOMER',
    city: 'Mumbai',
    country: 'India',
    createdAt: new Date('2026-02-10').toISOString()
  },
  {
    id: 'usr-cust-2',
    name: 'Priya Patil',
    email: 'priya@example.com',
    phone: '+91 98199 87654',
    passwordHash: hashPassword('Customer@123'),
    role: 'CUSTOMER',
    city: 'Pune',
    country: 'India',
    createdAt: new Date('2026-03-01').toISOString()
  }
];

const INITIAL_HERO_SLIDES = [
  {
    id: 'slide-1',
    destination: 'Kashmir',
    category: 'Subcontinent Exploration',
    heading: 'Snowy Himalayan Valleys',
    subtitle: 'Private Shikara cruises on Dal Lake, Gulmarg cable cars, and alpine luxury chalets.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Plan My Expedition →',
    ctaLink: '/plan-my-trip?destination=kashmir',
    order: 1,
    active: true
  },
  {
    id: 'slide-2',
    destination: 'Maldives',
    category: 'Global Luxury Escapes',
    heading: 'Turquoise Lagoon Bungalows',
    subtitle: 'Overwater sunset suites, private catamaran sailing, and sub-aquatic fine dining.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Explore Maldives →',
    ctaLink: '/plan-my-trip?destination=maldives',
    order: 2,
    active: true
  },
  {
    id: 'slide-3',
    destination: 'Kerala',
    category: 'Emerald Backwaters',
    heading: 'Serene Houseboat Lagoons',
    subtitle: 'Handcrafted teak houseboats in Alleppey and organic tea estate sanctuaries in Munnar.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Discover Kerala →',
    ctaLink: '/plan-my-trip?destination=kerala',
    order: 3,
    active: true
  }
];

const INITIAL_TRIP_REQUESTS = [
  {
    id: 'req-1',
    requestNumber: 'OMJ-1024',
    userId: 'usr-cust-1',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul@example.com',
    customerPhone: '+91 98200 12345',
    destination: 'Kerala',
    travelType: 'india',
    startDate: '2026-11-12',
    endDate: '2026-11-18',
    adults: 2,
    children: 0,
    infants: 0,
    travelStyle: 'Luxury',
    budget: '₹1,00,000 – ₹2,00,000',
    specialRequirements: 'Honeymoon stay, private houseboat in Alleppey, vegetarian meals.',
    status: 'Quote Sent',
    adminNotes: 'Customer prefers 5-star cliffside pool villa in Kovalam and luxury houseboat.',
    createdAt: new Date('2026-10-01').toISOString(),
    updatedAt: new Date('2026-10-05').toISOString()
  },
  {
    id: 'req-2',
    requestNumber: 'OMJ-1023',
    userId: 'usr-cust-2',
    customerName: 'Priya Patil',
    customerEmail: 'priya@example.com',
    customerPhone: '+91 98199 87654',
    destination: 'Maldives',
    travelType: 'international',
    startDate: '2026-12-05',
    endDate: '2026-12-10',
    adults: 2,
    children: 2,
    infants: 0,
    travelStyle: 'Beach',
    budget: '₹2,00,000+',
    specialRequirements: 'Overwater villa with private plunge pool and sea plane transfer.',
    status: 'Planning',
    adminNotes: 'Awaiting sea plane availability response from resort team.',
    createdAt: new Date('2026-10-04').toISOString(),
    updatedAt: new Date('2026-10-06').toISOString()
  }
];

const INITIAL_QUOTATIONS = [
  {
    id: 'quote-1',
    tripRequestId: 'req-1',
    accommodation: 85000,
    transport: 25000,
    activities: 18000,
    meals: 12000,
    taxes: 8000,
    discount: 5000,
    subtotal: 148000,
    totalAmount: 143000,
    status: 'Sent',
    notes: 'Includes private luxury teak houseboat stay, 5-star resort in Kovalam, daily gourmet meals, and airport transfers.',
    createdAt: new Date('2026-10-05').toISOString()
  }
];

const INITIAL_ITINERARIES = [
  {
    id: 'itin-1',
    tripRequestId: 'req-1',
    title: '6-Day Signature Kerala Backwaters & Coast',
    destination: 'Kerala',
    days: [
      {
        day: 1,
        title: 'Arrival in Cochin & Transfer to Munnar',
        morning: 'Private Chauffeur pick up at Cochin International Airport with traditional garland welcome.',
        afternoon: 'Drive through Cheeyappara Waterfalls scenic tea valley.',
        evening: 'Check-in to 5-Star Luxury Resort in Munnar with organic spice garden dinner.'
      },
      {
        day: 2,
        title: 'Munnar Tea Estates & High Altitude Peaks',
        morning: 'Guided walking tour through Kolukkumalai Organic Tea Plantation.',
        afternoon: 'Eravikulam National Park Nilgiri Tahr sanctuary visit.',
        evening: 'Private high-tea overlooking misty tea valley.'
      },
      {
        day: 3,
        title: 'Alleppey Private Teak Houseboat Boarding',
        morning: 'Scenic drive down to Alleppey backwater jetty.',
        afternoon: 'Board private teak houseboat with dedicated chef, captain, and butler.',
        evening: 'Sunset lagoon cruise with fresh Pearlspot fish delicacy dinner.'
      }
    ],
    createdAt: new Date('2026-10-05').toISOString()
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'usr-cust-1',
    title: 'Quotation Ready for Kerala Escape',
    message: 'Your official quotation for trip request OMJ-1024 has been prepared. Review it in your dashboard.',
    read: false,
    createdAt: new Date('2026-10-05').toISOString()
  }
];

// Helper to get from storage or set fallback
const getItem = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    if (!val) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(val);
  } catch (e) {
    return fallback;
  }
};

const setItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
};

export const db = {
  getUsers: () => getItem(DB_KEYS.USERS, INITIAL_USERS),
  setUsers: (users) => setItem(DB_KEYS.USERS, users),

  getRequests: () => getItem(DB_KEYS.TRIP_REQUESTS, INITIAL_TRIP_REQUESTS),
  setRequests: (reqs) => setItem(DB_KEYS.TRIP_REQUESTS, reqs),

  getStatusHistory: () => getItem(DB_KEYS.STATUS_HISTORY, []),
  setStatusHistory: (history) => setItem(DB_KEYS.STATUS_HISTORY, history),

  getQuotations: () => getItem(DB_KEYS.QUOTATIONS, INITIAL_QUOTATIONS),
  setQuotations: (quotes) => setItem(DB_KEYS.QUOTATIONS, quotes),

  getItineraries: () => getItem(DB_KEYS.ITINERARIES, INITIAL_ITINERARIES),
  setItineraries: (itins) => setItem(DB_KEYS.ITINERARIES, itins),

  getNotifications: () => getItem(DB_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS),
  setNotifications: (notifs) => setItem(DB_KEYS.NOTIFICATIONS, notifs),

  getHeroSlides: () => getItem(DB_KEYS.HERO_SLIDES, INITIAL_HERO_SLIDES),
  setHeroSlides: (slides) => setItem(DB_KEYS.HERO_SLIDES, slides),

  getCurrentSession: () => getItem(DB_KEYS.CURRENT_SESSION, null),
  setCurrentSession: (session) => setItem(DB_KEYS.CURRENT_SESSION, session),

  getResetTokens: () => getItem(DB_KEYS.RESET_TOKENS, {}),
  setResetTokens: (tokens) => setItem(DB_KEYS.RESET_TOKENS, tokens)
};
