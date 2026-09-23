export type Role = "student" | "seller" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  campus: string;
  avatar: string;
  bio: string;
  skills: string[];
  headline: string;
};

export type Listing = {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  type: "product" | "service";
  image: string;
  tags: string[];
  status: "approved" | "pending" | "rejected";
  created_at: string;
};

export type Review = {
  id: string;
  listing_id: string;
  author_id: string;
  rating: number;
  text: string;
  created_at: string;
};

export type Order = {
  id: string;
  buyer_id: string;
  listing_id: string;
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  amount: number;
  created_at: string;
};

export const CATEGORIES = [
  { id: "tech", name: "Tech & Software", icon: "Laptop" },
  { id: "design", name: "Design & Media", icon: "PenTool" },
  { id: "food", name: "Food & Drinks", icon: "Coffee" },
  { id: "fashion", name: "Fashion & Print", icon: "Shirt" },
  { id: "tutoring", name: "Tutoring", icon: "GraduationCap" },
  { id: "events", name: "Events", icon: "PartyPopper" },
] as const;

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=70`;

export const users: User[] = [
  {
    id: "u1",
    name: "Thandi Mokoena",
    email: "thandi@eduvos.ac.za",
    role: "seller",
    campus: "Midrand",
    avatar: "https://i.pravatar.cc/200?img=47",
    bio: "Final-year IT student building small web tools for student societies. I love shipping fast and making tech feel simple.",
    headline: "Web developer • BSc IT (Final year)",
    skills: ["React", "Supabase", "UI Design", "Automation"],
  },
  {
    id: "u2",
    name: "Sipho Dlamini",
    email: "sipho@eduvos.ac.za",
    role: "seller",
    campus: "Pretoria",
    avatar: "https://i.pravatar.cc/200?img=12",
    bio: "Graphic designer and photographer. Branding kits, posters and event shoots for campus clubs.",
    headline: "Brand & visual designer",
    skills: ["Illustrator", "Photography", "Branding"],
  },
  {
    id: "u3",
    name: "Aisha Patel",
    email: "aisha@eduvos.ac.za",
    role: "seller",
    campus: "Bedfordview",
    avatar: "https://i.pravatar.cc/200?img=32",
    bio: "Home baker turning late-night study cravings into a business. Delivery on campus twice a day.",
    headline: "Founder, Aisha's Bake Lab",
    skills: ["Baking", "Packaging", "Logistics"],
  },
  {
    id: "u4",
    name: "Kabelo Nkosi",
    email: "kabelo@eduvos.ac.za",
    role: "seller",
    campus: "Midrand",
    avatar: "https://i.pravatar.cc/200?img=68",
    bio: "Maths and stats tutor with a 92% pass rate across 40+ students.",
    headline: "Tutor • BCom Data Science",
    skills: ["Statistics", "Calculus", "Python"],
  },
  {
    id: "u5",
    name: "Lerato Sithole",
    email: "lerato@eduvos.ac.za",
    role: "admin",
    campus: "Midrand",
    avatar: "https://i.pravatar.cc/200?img=5",
    bio: "Incubation Hub coordinator.",
    headline: "Hub coordinator",
    skills: ["Mentorship"],
  },
];

export const listings: Listing[] = [
  {
    id: "l1",
    seller_id: "u1",
    title: "Student Society Website in 7 Days",
    description:
      "A clean, mobile-friendly website for your society or small business. Includes home, about, events and contact pages, a custom domain setup and one month of free tweaks. Built with React and hosted for free.",
    price: 1850,
    category: "tech",
    type: "service",
    image: img("photo-1517180102446-f3ece451e9d8"),
    tags: ["web", "react", "fast delivery"],
    status: "approved",
    created_at: "2026-08-02",
  },
  {
    id: "l2",
    seller_id: "u2",
    title: "Full Brand Kit for Student Startups",
    description:
      "Logo, colour palette, typography and social templates delivered as a tidy brand guide PDF. Two revision rounds included.",
    price: 950,
    category: "design",
    type: "service",
    image: img("photo-1626785774573-4b799315345d"),
    tags: ["branding", "logo", "social"],
    status: "approved",
    created_at: "2026-08-14",
  },
  {
    id: "l3",
    seller_id: "u3",
    title: "Exam Week Snack Box (12 treats)",
    description:
      "A box of twelve freshly baked treats: brownies, cookies and mini muffins. Delivered to the library or res between 10:00 and 16:00.",
    price: 180,
    category: "food",
    type: "product",
    image: img("photo-1499636136210-6f4ee915583e"),
    tags: ["baked", "delivery", "exam fuel"],
    status: "approved",
    created_at: "2026-08-20",
  },
  {
    id: "l4",
    seller_id: "u4",
    title: "Stats 1 & 2 Small Group Tutoring",
    description:
      "Weekly 90-minute sessions in groups of four. Past paper drills, cheat sheets and a WhatsApp group for quick questions.",
    price: 320,
    category: "tutoring",
    type: "service",
    image: img("photo-1503676260728-1c00da094a0b"),
    tags: ["stats", "group", "past papers"],
    status: "approved",
    created_at: "2026-08-25",
  },
  {
    id: "l5",
    seller_id: "u2",
    title: "Campus Event Photography (3 hours)",
    description:
      "Three hours of coverage, 60+ edited images delivered within 48 hours. Ideal for launches, socials and sports days.",
    price: 1200,
    category: "events",
    type: "service",
    image: img("photo-1492684223066-81342ee5ff30"),
    tags: ["photography", "events"],
    status: "approved",
    created_at: "2026-09-01",
  },
  {
    id: "l6",
    seller_id: "u1",
    title: "Custom Printed Society Hoodies",
    description:
      "Heavyweight cotton hoodies with your society print. Minimum order of ten, sizes XS to 3XL.",
    price: 420,
    category: "fashion",
    type: "product",
    image: img("photo-1556821840-3a63f95609a7"),
    tags: ["apparel", "bulk", "print"],
    status: "approved",
    created_at: "2026-09-04",
  },
  {
    id: "l7",
    seller_id: "u3",
    title: "Cold Brew Coffee Subscription",
    description:
      "Two 500ml bottles of cold brew delivered every week for a month. Pause any time.",
    price: 260,
    category: "food",
    type: "product",
    image: img("photo-1461023058943-07fcbe16d735"),
    tags: ["coffee", "subscription"],
    status: "pending",
    created_at: "2026-09-12",
  },
  {
    id: "l8",
    seller_id: "u4",
    title: "Python Crash Course for Beginners",
    description:
      "A four-week evening course covering the basics through to a small finished project. Recordings included.",
    price: 700,
    category: "tutoring",
    type: "service",
    image: img("photo-1526379095098-d400fd0bf935"),
    tags: ["python", "beginner"],
    status: "pending",
    created_at: "2026-09-15",
  },
  {
    id: "l9",
    seller_id: "u2",
    title: "Instant Poster Design (24h turnaround)",
    description:
      "One A2 event poster, print and social sizes. Send your details in the morning, get it back the same day.",
    price: 250,
    category: "design",
    type: "service",
    image: img("photo-1561070791-2526d30994b5"),
    tags: ["poster", "24h"],
    status: "pending",
    created_at: "2026-09-17",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    listing_id: "l1",
    author_id: "u3",
    rating: 5,
    text: "Thandi rebuilt our society site in under a week and it looks better than anything we could have paid for off campus.",
    created_at: "2026-08-18",
  },
  {
    id: "r2",
    listing_id: "l1",
    author_id: "u4",
    rating: 4,
    text: "Great work and very responsive. Only small delay was waiting on our own content.",
    created_at: "2026-08-29",
  },
  {
    id: "r3",
    listing_id: "l3",
    author_id: "u1",
    rating: 5,
    text: "The snack box got us through three all-nighters. Brownies are unreal.",
    created_at: "2026-09-02",
  },
  {
    id: "r4",
    listing_id: "l4",
    author_id: "u2",
    rating: 5,
    text: "Went from a 48% to a 71% in one term. Kabelo explains things properly.",
    created_at: "2026-09-06",
  },
  {
    id: "r5",
    listing_id: "l2",
    author_id: "u4",
    rating: 4,
    text: "Clean brand kit, delivered on time and the templates are easy to reuse.",
    created_at: "2026-09-09",
  },
];

export const orders: Order[] = [
  { id: "o1", buyer_id: "u3", listing_id: "l1", status: "fulfilled", amount: 1850, created_at: "2026-08-19" },
  { id: "o2", buyer_id: "u4", listing_id: "l1", status: "paid", amount: 1850, created_at: "2026-09-03" },
  { id: "o3", buyer_id: "u1", listing_id: "l3", status: "fulfilled", amount: 180, created_at: "2026-09-05" },
  { id: "o4", buyer_id: "u2", listing_id: "l4", status: "pending", amount: 320, created_at: "2026-09-14" },
  { id: "o5", buyer_id: "u1", listing_id: "l6", status: "paid", amount: 4200, created_at: "2026-09-16" },
];

export const CURRENT_SELLER_ID = "u1";

export const getUser = (id: string) => users.find((u) => u.id === id);
export const getListing = (id: string) => listings.find((l) => l.id === id);
export const listingReviews = (id: string) => reviews.filter((r) => r.listing_id === id);
export const categoryName = (id: string) =>
  CATEGORIES.find((c) => c.id === id)?.name ?? id;

export const ratingFor = (listingId: string) => {
  const rs = listingReviews(listingId);
  if (!rs.length) return { avg: 0, count: 0 };
  return { avg: rs.reduce((a, r) => a + r.rating, 0) / rs.length, count: rs.length };
};

export const sellerRating = (sellerId: string) => {
  const ids = listings.filter((l) => l.seller_id === sellerId).map((l) => l.id);
  const rs = reviews.filter((r) => ids.includes(r.listing_id));
  if (!rs.length) return { avg: 0, count: 0 };
  return { avg: rs.reduce((a, r) => a + r.rating, 0) / rs.length, count: rs.length };
};

export const money = (n: number) =>
  "R" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
