export interface Package {
  slug: string;
  name: string;
  setupNumber: number;
  description: string;
  price: number;
  image: string;
  galleryImages: string[];
  features: string[];
}

export interface Venue {
  name: string;
  brandSlug: string;
  website: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  mapUrl: string;
  googleRating: number;
  reviewCount: string;
  couplesServed: string;
  tagline: string;
  heroImage: string;
  packages: Package[];
  services: string[];
  highlights: string[];
  timeSlots: string[];
}

export interface City {
  slug: string;
  name: string;
  state: string;
  heroImage: string;
  venue: Venue;
}

function buildGallery(slug: string, files: string[]): string[] {
  return files.map((f) => `/images/packages/${slug}/${f}`);
}

export const services = [
  { name: "Birthday Surprise", icon: "🎂", description: "Create magical birthday celebrations with beautiful decorations, cakes, and intimate private setups." },
  { name: "Anniversary Celebration", icon: "💑", description: "Celebrate your love journey with elegant anniversary dinners featuring special decorations." },
  { name: "Proposal", icon: "💍", description: "Pop the question in the most romantic way with our stunning proposal setups." },
  { name: "Candlelight Dinner", icon: "🕯️", description: "Experience romantic dining with candlelight ambiance, gourmet cuisine, and exclusive settings." },
  { name: "Surprise Date", icon: "🎁", description: "Transform ordinary dates into extraordinary memories with surprise setups and romantic themes." },
  { name: "Pre-Wedding Shoot", icon: "📸", description: "Capture your love story with stunning pre-wedding photoshoots in beautiful settings." },
  { name: "Baby Moments", icon: "👶", description: "Celebrate pregnancy announcements, baby showers, and special baby moments." },
  { name: "Valentine's Week", icon: "💝", description: "Celebrate Valentine's Week with romantic experiences from Rose Day to Valentine's Day." },
];

export const cities: City[] = [
  {
    slug: "vadodara",
    name: "Vadodara",
    state: "Gujarat",
    heroImage: "/images/vadodara-hero.jpg",
    venue: {
      name: "Friends Factory Cafe",
      brandSlug: "friends-factory",
      website: "https://friendsfactorycafe.com",
      phone: "+91 7487888730",
      email: "hello@friendsfactorycafe.com",
      whatsapp: "917487888730",
      address: "424, OneWest, Asopalav W, 4th Floor, Priya Talkies Road, Besides Adventuraa, Sevasi - Canal Rd, Gotri, Vadodara, Gujarat 391101",
      mapUrl: "https://maps.google.com/?q=Friends+Factory+Cafe+Vadodara",
      googleRating: 4.9,
      reviewCount: "1256",
      couplesServed: "3000+",
      tagline: "Where Every Occasion Turns Into a Forever Memory Under the Stars",
      heroImage: "/images/ffc-hero.webp",
      packages: [
        {
          slug: "forever-us-loveframe-rooftop",
          name: "Forever Us LoveFrame Rooftop",
          setupNumber: 1,
          description: "Celebrate love in a space where every glance, laugh, and memory is framed against the stunning skyline",
          price: 6900,
          image: "/images/packages/forever-us-loveframe-rooftop/cover.webp",
          galleryImages: buildGallery("forever-us-loveframe-rooftop", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp"]),
          features: ["3-Hour Private Booking", "Rooftop Setup", "Celebration Cake", "Romantic Music", "Photo-Ready Décor", "Welcome Drink"],
        },
        {
          slug: "eternal-love-rooftop-celebration",
          name: "Eternal Love Rooftop Celebration",
          setupNumber: 2,
          description: "Celebrate moments that matter in a rooftop setting where emotions shine as brightly as the city lights below",
          price: 6500,
          image: "/images/packages/eternal-love-rooftop-celebration/cover.webp",
          galleryImages: buildGallery("eternal-love-rooftop-celebration", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp"]),
          features: ["3-Hour Private Booking", "Rooftop Setup", "Celebration Cake", "Romantic Music", "Photo-Ready Décor", "Welcome Drink"],
        },
        {
          slug: "golden-promise-glass-house",
          name: "Golden Promise Glass House",
          setupNumber: 3,
          description: "Step into a radiant space where every moment glows with love, warmth, and elegance",
          price: 6000,
          image: "/images/packages/golden-promise-glass-house/cover.webp",
          galleryImages: buildGallery("golden-promise-glass-house", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp"]),
          features: ["3-Hour Private Booking", "Glass House Setup", "Celebration Cake", "Romantic Music", "Photo-Ready Décor", "Welcome Drink"],
        },
        {
          slug: "moonlit-romance-experience",
          name: "Moonlit Romance Experience",
          setupNumber: 4,
          description: "Step into a serene night where love unfolds beneath a glowing moon and shimmering city lights",
          price: 5100,
          image: "/images/packages/moonlit-romance-experience/cover.webp",
          galleryImages: buildGallery("moonlit-romance-experience", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp"]),
          features: ["3-Hour Private Booking", "Night Setup", "Celebration Cake", "Romantic Music", "Photo-Ready Décor", "Welcome Drink"],
        },
        {
          slug: "the-promise-creative-area",
          name: "The Promise Creative Area",
          setupNumber: 5,
          description: "Ignite joy under the stars at The Promise Creative Area — a magical rooftop space designed for unforgettable celebrations",
          price: 4700,
          image: "/images/packages/the-promise-creative-area/cover.webp",
          galleryImages: buildGallery("the-promise-creative-area", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "8.webp", "9.webp", "13.webp", "14.webp", "17.webp", "18.webp", "20.webp", "22.webp"]),
          features: ["3-Hour Private Booking", "Creative Area Setup", "Romantic Music", "Photo-Ready Décor", "Welcome Drink"],
        },
        {
          slug: "timeless-bond-glass-house",
          name: "Timeless Bond Glass House",
          setupNumber: 6,
          description: "Step into an elegant glass house where love feels calm, pure, and everlasting",
          price: 5700,
          image: "/images/packages/timeless-bond-glass-house/cover.webp",
          galleryImages: buildGallery("timeless-bond-glass-house", ["cover.webp", "112.webp", "113.webp", "114.webp", "115.webp", "116.webp", "120.webp", "121.webp", "122.webp", "123.webp", "124.webp", "125.webp", "126.webp", "128.webp", "129.webp"]),
          features: ["3-Hour Private Booking", "Glass House Setup", "Romantic Music", "Photo-Ready Décor", "Welcome Drink"],
        },
        {
          slug: "sweet-together-glass-house",
          name: "Sweet Together Glass House",
          setupNumber: 7,
          description: "Step into a charming space where love feels cozy, laughter is shared, and every moment is sweeter than the last",
          price: 5500,
          image: "/images/packages/sweet-together-glass-house/cover.webp",
          galleryImages: buildGallery("sweet-together-glass-house", ["cover.webp", "75.webp", "76.webp", "78.webp", "79.webp", "81.webp", "83.webp", "84.webp", "87.webp", "88.webp", "89.webp", "91.webp", "92.webp", "93.webp"]),
          features: ["3-Hour Private Booking", "Glass House Setup", "Romantic Music", "Photo-Ready Décor", "Welcome Drink"],
        },
        {
          slug: "pure-love-glass-house",
          name: "Pure Love Glass House",
          setupNumber: 8,
          description: "Welcome to a serene glass house where emotions are honest, moments are gentle, and love is beautifully pure",
          price: 4700,
          image: "/images/packages/pure-love-glass-house/cover.webp",
          galleryImages: buildGallery("pure-love-glass-house", ["cover.webp", "95.webp", "96.webp", "98.webp", "99.webp", "100.webp", "105.webp", "106.webp", "107.webp", "108.webp", "110.webp"]),
          features: ["3-Hour Private Booking", "Glass House Setup", "Romantic Music", "Photo-Ready Décor", "Welcome Drink"],
        },
      ],
      services: ["Birthday Surprise", "Anniversary Celebration", "Proposal", "Candlelight Dinner", "Surprise Date", "Pre-Wedding Shoot", "Baby Moments", "Valentine's Week"],
      highlights: ["100% Private", "4.9★ Rated", "3000+ Couples", "Rooftop + Glass House"],
      timeSlots: ["Lunch (12-3 PM)", "Evening (4-7 PM)", "Dinner (7-10 PM)", "Late Night (10 PM-1 AM)"],
    },
  },
  {
    slug: "surat",
    name: "Surat",
    state: "Gujarat",
    heroImage: "/images/surat-hero.jpg",
    venue: {
      name: "HIVY - Place for Celebrations",
      brandSlug: "hivy",
      website: "https://hivy.co.in",
      phone: "+91 9727027278",
      email: "hello@hivy.co.in",
      whatsapp: "919727027278",
      address: "252/253, 2nd Floor, The Boulevard, Near Pratham Circle, Galleria Street, Green City Road, Adajan, Pal Gam, Surat, Gujarat 394510",
      mapUrl: "https://www.google.com/maps/place/HIVY+-+Place+For+Celebration/",
      googleRating: 4.9,
      reviewCount: "150+",
      couplesServed: "3000+",
      tagline: "Where Every Occasion Turns Into a Forever Memory",
      heroImage: "/images/hivy-hero.webp",
      packages: [
        {
          slug: "swing-of-love",
          name: "Swing of LOVE",
          setupNumber: 1,
          description: "Float in love on a dreamy swing setup where romance meets playfulness",
          price: 5100,
          image: "/images/packages/swing-of-love/cover.webp",
          galleryImages: buildGallery("swing-of-love", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp", "19.webp", "20.webp"]),
          features: ["3-Hour Private Booking", "Swing Setup", "Celebration Cake", "Non-Alcoholic Champagne", "Romantic Music", "Photo-Ready Décor"],
        },
        {
          slug: "boho-chic",
          name: "BoHo Chic",
          setupNumber: 2,
          description: "Embrace free-spirited romance in a bohemian paradise filled with warmth and elegance",
          price: 5700,
          image: "/images/packages/boho-chic/cover.webp",
          galleryImages: buildGallery("boho-chic", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp", "19.webp", "20.webp"]),
          features: ["3-Hour Private Booking", "Bohemian Setup", "Celebration Cake", "Non-Alcoholic Champagne", "Romantic Music", "Photo-Ready Décor"],
        },
        {
          slug: "fairy-tale-proposals",
          name: "Fairy Tale Proposals",
          setupNumber: 3,
          description: "Step into a magical fairytale where dreams come true and love stories begin",
          price: 6300,
          image: "/images/packages/fairy-tale-proposals/cover.webp",
          galleryImages: buildGallery("fairy-tale-proposals", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp", "19.webp", "20.webp"]),
          features: ["3-Hour Private Booking", "Fairy Tale Setup", "Celebration Cake", "Non-Alcoholic Champagne", "Romantic Music", "Photo-Ready Décor"],
        },
        {
          slug: "tent-of-romance",
          name: "Tent of Romance",
          setupNumber: 4,
          description: "Step into a cozy romantic tent where love blooms under soft lights and dreamy décor",
          price: 6500,
          image: "/images/packages/tent-of-romance/cover.webp",
          galleryImages: buildGallery("tent-of-romance", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp", "19.webp", "20.webp"]),
          features: ["3-Hour Private Booking", "Tent Setup", "Celebration Cake", "Non-Alcoholic Champagne", "Romantic Music", "Photo-Ready Décor"],
        },
        {
          slug: "the-elite-group-setup",
          name: "Elite Group Setup",
          setupNumber: 5,
          description: "Create a one-of-a-kind proposal experience tailored just for your love story",
          price: 5400,
          image: "/images/packages/the-elite-group-setup/cover.webp",
          galleryImages: buildGallery("the-elite-group-setup", ["cover.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp"]),
          features: ["3-Hour Private Booking", "Elite Setup", "Celebration Cake", "Non-Alcoholic Champagne", "Romantic Music", "Photo-Ready Décor"],
        },
      ],
      services: ["Birthday Surprise", "Anniversary Celebration", "Proposal", "Candlelight Dinner", "Surprise Date", "Pre-Wedding Shoot", "Baby Moments", "Valentine's Week"],
      highlights: ["100% Private", "4.9★ Rated", "3000+ Couples", "Themed Indoor Setups"],
      timeSlots: ["Lunch (12-3 PM)", "Evening (4-7 PM)", "Dinner (7-10 PM)", "Late Night (10 PM-1 AM)"],
    },
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getPackageBySlug(citySlug: string, packageSlug: string): Package | undefined {
  const city = getCityBySlug(citySlug);
  return city?.venue.packages.find((p) => p.slug === packageSlug);
}
