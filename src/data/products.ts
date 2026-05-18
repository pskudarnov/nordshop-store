import type { Category } from "./categories";

export type ProductBadge = "Best seller" | "New" | "Limited";

export type ProductReview = {
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  longDescription: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
  stockCount: number;
  sku: string;
  etaDays: number;
  imageTheme: string;
  imageThemeAlt: string;
  image: string;
  gallery: string[];
  tags: string[];
  badges: ProductBadge[];
  features: string[];
  specifications: { label: string; value: string }[];
  shippingInfo: string[];
  warrantyInfo: string[];
  reviews: ProductReview[];
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "aura-desk-lamp",
    name: "Aura Desk Lamp",
    category: "Lighting",
    description: "Adaptive desk lamp with warm-to-cool tuning for long focus sessions.",
    longDescription:
      "Aura is tuned for real workdays: morning planning, afternoon calls, evening deep focus. The pivot arm keeps glare off your monitor while maintaining a calm, soft light cone over keyboard and notebook.",
    price: 129,
    oldPrice: 149,
    rating: 4.8,
    reviewCount: 412,
    featured: true,
    inStock: true,
    stockCount: 23,
    sku: "NS-LGT-0142",
    etaDays: 2,
    imageTheme: "from-amber-100 to-stone-200",
    imageThemeAlt: "from-amber-50 to-zinc-100",
    image: "/images/products/aura-desk-lamp-main.webp",
    gallery: [
      "/images/products/aura-desk-lamp-main.webp",
      "/images/products/aura-desk-lamp-angle.webp",
      "/images/products/aura-desk-lamp-setup.webp",
      "/images/products/aura-desk-lamp-detail.webp",
    ],
    tags: ["Focus", "Lighting", "Desk setup"],
    badges: ["Best seller"],
    features: ["Touch dimmer", "Warm/cool presets", "Low-glare lens"],
    specifications: [
      { label: "Material", value: "Anodized aluminum" },
      { label: "Power", value: "USB-C PD 20W" },
      { label: "Color temp", value: "2700K–5000K" },
      { label: "Height", value: "42 cm" },
    ],
    shippingInfo: [
      "Ships same day before 14:00",
      "Delivery 1–2 business days",
      "Carbon-neutral packaging",
    ],
    warrantyInfo: [
      "2-year hardware warranty",
      "30-day return window",
      "Instant replacement for DOA units",
    ],
    reviews: [
      {
        author: "Mila",
        role: "Product Designer",
        rating: 5,
        comment: "Finally a lamp that looks premium and doesn't fatigue my eyes.",
        date: "2 weeks ago",
      },
      {
        author: "Anton",
        role: "Frontend Engineer",
        rating: 4.8,
        comment: "Great diffusion and clean industrial finish.",
        date: "1 month ago",
      },
    ],
  },
  {
    id: "p2",
    slug: "fjord-mech-keyboard",
    name: "Fjord Mechanical Keyboard",
    category: "Accessories",
    description: "Quiet tactile keyboard with compact layout and premium key feel.",
    longDescription:
      "Fjord was built for mixed workloads: coding, writing, and late calls. The acoustic foam stack softens resonance while preserving tactile response for confident typing.",
    price: 189,
    rating: 4.9,
    reviewCount: 537,
    featured: true,
    inStock: true,
    stockCount: 16,
    sku: "NS-ACC-0204",
    etaDays: 1,
    imageTheme: "from-zinc-200 to-stone-300",
    imageThemeAlt: "from-zinc-100 to-stone-200",
    image: "/images/products/fjord-mech-keyboard-main.webp",
    gallery: [
      "/images/products/fjord-mech-keyboard-main.webp",
      "/images/products/fjord-mech-keyboard-angle.webp",
      "/images/products/fjord-mech-keyboard-setup.webp",
      "/images/products/fjord-mech-keyboard-detail.webp",
    ],
    tags: ["Typing", "Developer", "Minimal"],
    badges: ["Best seller", "Limited"],
    features: ["Hot-swappable", "PBT keycaps", "Gasket mount"],
    specifications: [
      { label: "Layout", value: "75% ANSI" },
      { label: "Switches", value: "Linear Silent" },
      { label: "Connectivity", value: "USB-C / 2.4G" },
      { label: "Weight", value: "1.1 kg" },
    ],
    shippingInfo: ["Ships in 24h", "Express available at checkout"],
    warrantyInfo: ["2-year warranty", "Keycap replacement support"],
    reviews: [
      {
        author: "Leo",
        role: "Frontend Lead",
        rating: 5,
        comment: "Sounds refined, feels stable, zero rattle.",
        date: "5 days ago",
      },
      {
        author: "Sara",
        role: "Writer",
        rating: 4.9,
        comment: "Quiet enough for calls, satisfying enough for drafting.",
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: "p3",
    slug: "ridge-monitor-stand",
    name: "Ridge Monitor Stand",
    category: "Furniture",
    description: "Oak monitor riser with hidden cable path and anti-slip feet.",
    longDescription:
      "Ridge lifts your display to eye level and clears the visual noise underneath. It's the small structural change that makes your desk look intentional.",
    price: 98,
    rating: 4.6,
    reviewCount: 184,
    featured: false,
    inStock: true,
    stockCount: 41,
    sku: "NS-FUR-0089",
    etaDays: 3,
    imageTheme: "from-stone-200 to-amber-200",
    imageThemeAlt: "from-stone-100 to-amber-100",
    image: "/images/products/ridge-monitor-stand-main.webp",
    gallery: [
      "/images/products/ridge-monitor-stand-main.webp",
      "/images/products/ridge-monitor-stand-angle.webp",
      "/images/products/ridge-monitor-stand-setup.webp",
      "/images/products/ridge-monitor-stand-detail.webp",
    ],
    tags: ["Ergonomics", "Wood", "Cable management"],
    badges: [],
    features: ["Solid oak", "Cable cutout", "Protective pads"],
    specifications: [
      { label: "Width", value: "58 cm" },
      { label: "Depth", value: "22 cm" },
      { label: "Load", value: "Up to 18 kg" },
    ],
    shippingInfo: ["Packed with edge protection", "Delivery 2–4 business days"],
    warrantyInfo: ["2-year warranty"],
    reviews: [
      {
        author: "Inga",
        role: "Art Director",
        rating: 4.7,
        comment: "Instantly cleaned up my setup.",
        date: "2 months ago",
      },
    ],
  },
  {
    id: "p4",
    slug: "linen-notebook-set",
    name: "Linen Notebook Set",
    category: "Accessories",
    description: "Set of 3 premium notebooks for planning and sketching.",
    longDescription:
      "Thread-bound linen notebooks with dense paper stock and subtle dot grid. Designed for teams that still value pen-first thinking.",
    price: 36,
    rating: 4.5,
    reviewCount: 224,
    featured: false,
    inStock: true,
    stockCount: 68,
    sku: "NS-ACC-0311",
    etaDays: 2,
    imageTheme: "from-neutral-100 to-stone-200",
    imageThemeAlt: "from-neutral-50 to-stone-100",
    image: "/images/products/linen-notebook-set-main.webp",
    gallery: [
      "/images/products/linen-notebook-set-main.webp",
      "/images/products/linen-notebook-set-angle.webp",
      "/images/products/linen-notebook-set-setup.webp",
      "/images/products/linen-notebook-set-detail.webp",
    ],
    tags: ["Planning", "Stationery"],
    badges: ["New"],
    features: ["120gsm paper", "Dot grid", "Thread binding"],
    specifications: [
      { label: "Size", value: "A5" },
      { label: "Pages", value: "192 per notebook" },
    ],
    shippingInfo: ["Ships in recycled envelope"],
    warrantyInfo: ["30-day satisfaction guarantee"],
    reviews: [
      {
        author: "Nora",
        role: "UX Researcher",
        rating: 4.6,
        comment: "Paper quality is excellent for marker notes.",
        date: "1 week ago",
      },
    ],
  },
  {
    id: "p5",
    slug: "nova-headphones",
    name: "Nova Headphones",
    category: "Audio",
    description: "Closed-back wireless headphones tuned for office and travel.",
    longDescription:
      "Nova balances detail and comfort for long sessions. The tuning avoids harsh highs while preserving speech clarity on calls.",
    price: 249,
    oldPrice: 279,
    rating: 4.7,
    reviewCount: 306,
    featured: true,
    inStock: true,
    stockCount: 11,
    sku: "NS-AUD-0103",
    etaDays: 2,
    imageTheme: "from-slate-200 to-zinc-300",
    imageThemeAlt: "from-slate-100 to-zinc-200",
    image: "/images/products/nova-headphones-main.webp",
    gallery: [
      "/images/products/nova-headphones-main.webp",
      "/images/products/nova-headphones-angle.webp",
      "/images/products/nova-headphones-setup.webp",
      "/images/products/nova-headphones-detail.webp",
    ],
    tags: ["Audio", "Remote work"],
    badges: ["Limited"],
    features: ["40h battery", "Low latency", "Dual-device pairing"],
    specifications: [
      { label: "Battery", value: "40h" },
      { label: "Weight", value: "282 g" },
    ],
    shippingInfo: ["Insured shipping", "Delivery 1–3 business days"],
    warrantyInfo: ["2-year warranty", "Battery service program"],
    reviews: [
      {
        author: "Ken",
        role: "Motion Designer",
        rating: 4.8,
        comment: "Comfort is top tier for full-day use.",
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: "p6",
    slug: "lumbar-chair-support",
    name: "Lumbar Chair Support",
    category: "Furniture",
    description: "Memory-foam lumbar support with breathable mesh cover.",
    longDescription:
      "A low-profile support cushion that helps maintain neutral posture during long coding blocks without feeling bulky.",
    price: 59,
    rating: 4.4,
    reviewCount: 148,
    featured: false,
    inStock: false,
    stockCount: 0,
    sku: "NS-FUR-0146",
    etaDays: 6,
    imageTheme: "from-stone-100 to-zinc-200",
    imageThemeAlt: "from-stone-50 to-zinc-100",
    image: "/images/products/lumbar-chair-support-main.webp",
    gallery: [
      "/images/products/lumbar-chair-support-main.webp",
      "/images/products/lumbar-chair-support-angle.webp",
      "/images/products/lumbar-chair-support-setup.webp",
      "/images/products/lumbar-chair-support-detail.webp",
    ],
    tags: ["Ergonomics", "Health"],
    badges: [],
    features: ["Memory foam", "Adjustable strap", "Breathable cover"],
    specifications: [{ label: "Foam density", value: "55D" }],
    shippingInfo: ["Next batch in 6 days"],
    warrantyInfo: ["1-year warranty"],
    reviews: [
      {
        author: "Victor",
        role: "Backend Engineer",
        rating: 4.3,
        comment: "Good support, especially for long meetings.",
        date: "2 months ago",
      },
    ],
  },
  {
    id: "p7",
    slug: "graphite-desk-mat",
    name: "Graphite Desk Mat",
    category: "Accessories",
    description: "Large anti-slip desk mat with stitched edges.",
    longDescription:
      "Graphite anchors your daily setup and adds visual calm. Resistant to spills and built to age well.",
    price: 45,
    rating: 4.6,
    reviewCount: 273,
    featured: true,
    inStock: true,
    stockCount: 33,
    sku: "NS-ACC-0073",
    etaDays: 1,
    imageTheme: "from-zinc-300 to-neutral-400",
    imageThemeAlt: "from-zinc-200 to-neutral-300",
    image: "/images/products/graphite-desk-mat-main.webp",
    gallery: [
      "/images/products/graphite-desk-mat-main.webp",
      "/images/products/graphite-desk-mat-angle.webp",
      "/images/products/graphite-desk-mat-setup.webp",
      "/images/products/graphite-desk-mat-detail.webp",
    ],
    tags: ["Desk setup", "Minimal"],
    badges: ["Best seller"],
    features: ["90x40 cm", "Water-resistant", "Stitched edges"],
    specifications: [{ label: "Thickness", value: "3 mm" }],
    shippingInfo: ["Ships today", "Delivery 1–2 days"],
    warrantyInfo: ["1-year warranty"],
    reviews: [
      {
        author: "Alisa",
        role: "QA Engineer",
        rating: 4.7,
        comment: "Texture is perfect for both trackpad and mouse.",
        date: "1 month ago",
      },
    ],
  },
  {
    id: "p8",
    slug: "cable-organizer-kit",
    name: "Cable Organizer Kit",
    category: "Accessories",
    description: "Magnetic clips and wraps for clean cable routing.",
    longDescription:
      "A practical starter set for eliminating cable clutter around monitor, dock, and charger zones.",
    price: 24,
    rating: 4.3,
    reviewCount: 361,
    featured: false,
    inStock: true,
    stockCount: 79,
    sku: "NS-ACC-0159",
    etaDays: 2,
    imageTheme: "from-amber-50 to-stone-100",
    imageThemeAlt: "from-amber-100 to-stone-200",
    image: "/images/products/cable-organizer-kit-main.webp",
    gallery: [
      "/images/products/cable-organizer-kit-main.webp",
      "/images/products/cable-organizer-kit-angle.webp",
      "/images/products/cable-organizer-kit-setup.webp",
      "/images/products/cable-organizer-kit-detail.webp",
    ],
    tags: ["Cable management"],
    badges: ["New"],
    features: ["8-piece set", "Reusable wraps", "Strong adhesive"],
    specifications: [{ label: "Included", value: "4 clips + 4 wraps" }],
    shippingInfo: ["Ships in 24h"],
    warrantyInfo: ["30-day returns"],
    reviews: [
      {
        author: "Roman",
        role: "CTO",
        rating: 4.4,
        comment: "Small purchase, huge visual payoff.",
        date: "6 days ago",
      },
    ],
  },
];
