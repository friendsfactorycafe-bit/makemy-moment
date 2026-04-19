import type { City } from "./cities";

export interface KeywordPage {
  keyword: string;
  slug: string;
  category: string;
  type: string;
  citySlug: string;
  cityName: string;
}

export function toSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const categoryIntros: Record<string, string[]> = {
  "candlelight dinner": [
    "There is something undeniably magical about dining by candlelight — the warm glow, the intimate atmosphere, and the feeling that the entire world fades away, leaving just you and the person you love.",
    "A candlelight dinner is more than just a meal. It is an experience that transforms an ordinary evening into a memory you carry forever. The flicker of candles, the aroma of carefully prepared cuisine, and the presence of someone special create a moment that words can barely capture.",
    "When was the last time you truly disconnected from the noise of everyday life and sat across from someone you love, with nothing but soft candlelight between you? In a world that moves fast, a candlelight dinner brings you back to what matters most.",
  ],
  "birthday surprise": [
    "Birthdays mark the celebration of life, love, and the beautiful journey of another year gone by. But a birthday becomes truly unforgettable when it is wrapped in surprise — when the person you love walks into a space designed entirely to make them feel special.",
    "Everyone deserves to feel like the centre of the universe on their birthday. A surprise birthday celebration takes that feeling and amplifies it tenfold — with stunning decorations, intimate settings, and moments that bring genuine tears of joy.",
    "Planning a birthday surprise is an act of love. It says, 'I thought about you. I planned for you. I wanted today to be perfect for you.' And when you pair that intention with a beautifully decorated private venue, the result is pure magic.",
  ],
  "anniversary": [
    "An anniversary is not just a date on the calendar — it is a testament to love that has endured, grown, and deepened over time. Every anniversary deserves a celebration that honours the journey two people have shared together.",
    "Whether it is your first anniversary or your fiftieth, the feeling of celebrating another year of love never gets old. An anniversary celebration in a private, beautifully decorated space turns a simple date into a cherished chapter of your love story.",
    "Love grows stronger with every passing year. An anniversary is your chance to pause, reflect, and celebrate the beautiful relationship you have built — and what better way to do that than in a stunning private setup designed for romance?",
  ],
  "proposal": [
    "The moment you decide to propose is the moment your love story takes its most exciting turn. A proposal is not just a question — it is a promise, a commitment, and the beginning of forever. That moment deserves a setting as extraordinary as the love behind it.",
    "A proposal should take your partner's breath away. It should be a moment so beautifully orchestrated that every detail — the lighting, the décor, the atmosphere — speaks the language of love before you even say a word.",
    "Behind every great love story is a proposal that set the tone for everything that followed. Whether you are planning a dramatic surprise or an intimate, heartfelt moment, the right setting makes all the difference.",
  ],
  "surprise date": [
    "The best dates are the ones that catch you off guard — the ones where every detail has been thoughtfully planned to create wonder, excitement, and genuine connection. A surprise date is your chance to rewrite the ordinary.",
    "In a world of routine dinner plans and predictable outings, a surprise date stands out. It is something different, something intentional, something that tells the person you are with that they are worth going the extra mile for.",
    "A surprise date transforms a regular evening into an adventure. When your partner walks into a space filled with candles, flowers, music, and a setup designed just for the two of you — that is when the ordinary becomes extraordinary.",
  ],
  "pre-wedding shoot": [
    "Your love story deserves to be captured in a setting that matches its beauty. A pre-wedding photoshoot is more than just photos — it is a visual diary of the connection, chemistry, and joy you share as a couple before you say your vows.",
    "Before the wedding bells ring and the ceremonies begin, there is a quiet, intimate moment that belongs just to you two. A pre-wedding shoot captures that moment — the laughter, the stolen glances, the excitement of what is about to come.",
    "Every couple has a unique story, and your pre-wedding photos should reflect that. With the right setting, the right lighting, and the right backdrop, your love story transforms into art.",
  ],
  "baby moments": [
    "Welcoming a new life is one of the most beautiful chapters in any family's journey. Whether it is a baby shower, a gender reveal, or a pregnancy announcement — these moments deserve to be celebrated in a space that is as special as the occasion itself.",
    "There is a unique kind of joy that comes with celebrating a new arrival. Baby showers and gender reveals are not just parties — they are milestones that mark the beginning of a beautiful new chapter filled with love, laughter, and tiny footsteps.",
    "From the first heartbeat to the first kick, every moment of this journey is precious. A baby celebration gives you the chance to share that joy with your loved ones in a stunning, intimate setting.",
  ],
  "valentine": [
    "Valentine's is not just a day — it is a celebration of everything love represents. From Rose Day to Valentine's Day, the entire week is an opportunity to express your feelings in the most romantic way possible.",
    "Love does not need a reason, but Valentine's Week gives you the perfect excuse to go all out. Each day of the week — from Teddy Day to Promise Day — offers a new way to show your partner how much they mean to you.",
    "Valentine's Week is that magical time when love is in the air everywhere you look. Make it count with a celebration that goes beyond the usual — in a private, beautifully decorated space designed for romance.",
  ],
};

const defaultIntros = [
  "Creating the perfect celebration requires the right venue, the right atmosphere, and meticulous attention to every detail. When all these elements come together, something extraordinary happens — ordinary moments transform into lifelong memories.",
  "There are moments in life that deserve more than the ordinary. Moments that call for stunning décor, intimate settings, and an atmosphere that makes you forget the world outside. This is what a truly special celebration looks like.",
  "Every celebration tells a story. The best ones are those where every detail — from the lighting to the music to the décor — has been carefully crafted to create an experience that stays with you long after the evening ends.",
];

export function getCategoryIntro(category: string, seed: number): string {
  const intros = categoryIntros[category] || defaultIntros;
  return intros[seed % intros.length];
}

export function getWhyChoosePoints(city: City): string[] {
  return [
    `100% private space — no strangers, no distractions, just you and your loved ones`,
    `${city.venue.googleRating}★ Google rated with ${city.venue.reviewCount} genuine reviews from happy couples`,
    `${city.venue.couplesServed} couples have already celebrated their most precious moments here`,
    `Professional photo-ready décor that makes every corner Instagram-worthy`,
    `Flexible time slots — from afternoon lunch to late-night midnight celebrations`,
    `Celebration cake, romantic music, and welcome drinks included in most packages`,
    `Dedicated team to handle every detail so you can focus on enjoying the moment`,
    `Located in ${city.name}, ${city.state} with easy accessibility and parking`,
  ];
}

export function getHowItWorks(): { step: string; title: string; desc: string }[] {
  return [
    { step: "01", title: "Choose Your Package", desc: "Browse our stunning celebration setups and pick the one that speaks to your heart. Each setup is uniquely designed to create a different mood and experience." },
    { step: "02", title: "Book Your Slot", desc: "Select your preferred date, time slot, and let us know if there are any special requests. We will take care of everything from decorations to music to cake." },
    { step: "03", title: "Show Up & Celebrate", desc: "Walk in to a space that has been transformed just for you. Every candle, every petal, every detail is in place. All you have to do is create memories." },
  ];
}

export function getFaqItems(keyword: string, city: City): { q: string; a: string }[] {
  const minPrice = Math.min(...city.venue.packages.map((p) => p.price));
  const maxPrice = Math.max(...city.venue.packages.map((p) => p.price));
  return [
    { q: `What is the price for ${keyword}?`, a: `Our packages for ${keyword} start from ₹${minPrice.toLocaleString("en-IN")} and go up to ₹${maxPrice.toLocaleString("en-IN")} depending on the setup you choose. Each package includes private booking, decorations, music, and more.` },
    { q: `How do I book ${keyword}?`, a: `You can book instantly through our website or reach us on WhatsApp at ${city.venue.phone}. Select your city, choose a package, pick your date and time slot — and you are all set.` },
    { q: `Is the celebration completely private?`, a: `Yes, absolutely. Every celebration is 100% private. The entire setup is exclusively reserved for you and your guests for 3 hours. No other bookings overlap with yours.` },
    { q: `What is included in the package?`, a: `Most packages include a 3-hour private booking, professional themed decorations, celebration cake, romantic music, photo-ready décor, and welcome drinks. Specific inclusions vary by package.` },
    { q: `What are the available time slots?`, a: `We offer four time slots: Lunch (12–3 PM), Evening (4–7 PM), Dinner (7–10 PM), and Late Night (10 PM–1 AM). Midnight celebrations are perfect for birthdays.` },
    { q: `Can I customise the celebration?`, a: `Yes! You can request custom decorations, specific themes, additional cakes, flower arrangements, or any special touches. Just let us know your requirements when booking.` },
  ];
}

export function getRelatedKeywords(kp: KeywordPage, allPages: KeywordPage[], limit = 12): KeywordPage[] {
  const sameCategory = allPages.filter(
    (p) => p.citySlug === kp.citySlug && p.category === kp.category && p.slug !== kp.slug
  );
  const sameCity = allPages.filter(
    (p) => p.citySlug === kp.citySlug && p.category !== kp.category && p.slug !== kp.slug
  );
  return [...sameCategory, ...sameCity].slice(0, limit);
}
