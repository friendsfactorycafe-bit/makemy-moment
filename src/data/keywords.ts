import "server-only";
import { readFileSync } from "fs";
import { join } from "path";
import type { KeywordPage } from "./keywords-utils";
import { toSlug } from "./keywords-utils";
import type { City } from "./cities";

// Re-export utils that server components need
export type { KeywordPage } from "./keywords-utils";
export {
  toSlug,
  titleCase,
  getCategoryIntro,
  getWhyChoosePoints,
  getHowItWorks,
  getFaqItems,
  getRelatedKeywords,
} from "./keywords-utils";

// ─── CSV parsing (server-only) ────────────────────────────────────

function parseCSV(filePath: string): [string, string, string][] {
  try {
    const content = readFileSync(filePath, "utf-8");
    const lines = content.trim().split("\n").slice(1);
    return lines
      .map((line) => {
        const parts = line.split(",").map((s) => s.trim());
        if (parts.length >= 3) return [parts[0], parts[1], parts[2]] as [string, string, string];
        return null;
      })
      .filter(Boolean) as [string, string, string][];
  } catch {
    return [];
  }
}

const keywordsDir = join(process.cwd(), "seo-keywords");
const vadodaraRaw = parseCSV(join(keywordsDir, "vadodara-keywords.csv"));
const suratRaw = parseCSV(join(keywordsDir, "surat-keywords.csv"));

function buildKeywordPages(
  rawKeywords: [string, string, string][],
  citySlug: string,
  cityName: string
): KeywordPage[] {
  return rawKeywords.map(([keyword, category, type]) => ({
    keyword,
    slug: toSlug(keyword),
    category,
    type,
    citySlug,
    cityName,
  }));
}

const vadodaraPages = buildKeywordPages(vadodaraRaw, "vadodara", "Vadodara");
const suratPages = buildKeywordPages(suratRaw, "surat", "Surat");

export const allKeywordPages: KeywordPage[] = [...vadodaraPages, ...suratPages];

// Lookup map
const keywordMap = new Map<string, KeywordPage>();
for (const kp of allKeywordPages) {
  keywordMap.set(`${kp.citySlug}/${kp.slug}`, kp);
}

export function getKeywordPage(citySlug: string, kwSlug: string): KeywordPage | undefined {
  return keywordMap.get(`${citySlug}/${kwSlug}`);
}

export function getKeywordPagesByCitySlug(citySlug: string): KeywordPage[] {
  return allKeywordPages.filter((kp) => kp.citySlug === citySlug);
}

// ─── Meta generation helpers ──────────────────────────────────────

function tc(str: string): string {
  return str.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function generateMetaTitle(keyword: string, cityName: string, category: string): string {
  const kw = tc(keyword);
  const variants: Record<string, string[]> = {
    "candlelight dinner": [`${kw} — Private Romantic Setup ✨`, `${kw} — Book Your Perfect Evening`, `${kw} — Stunning Private Dining`],
    "birthday surprise": [`${kw} — Create Magical Moments 🎂`, `${kw} — Unforgettable Celebration`, `${kw} — Plan the Perfect Surprise`],
    "anniversary": [`${kw} — Celebrate Your Love Story 💑`, `${kw} — Private & Romantic Setup`, `${kw} — Make It Unforgettable`],
    "proposal": [`${kw} — She Will Say Yes 💍`, `${kw} — Dream Proposal Setup`, `${kw} — Perfect Romantic Setting`],
    "surprise date": [`${kw} — Rewrite the Ordinary ✨`, `${kw} — Extraordinary Date Setup`, `${kw} — Private Romantic Experience`],
    "pre-wedding shoot": [`${kw} — Capture Your Love Story 📸`, `${kw} — Stunning Photo Locations`, `${kw} — Beautiful Couple Shoot`],
    "baby moments": [`${kw} — Celebrate New Beginnings 👶`, `${kw} — Beautiful Venue & Setup`, `${kw} — Private Celebration Space`],
    "valentine": [`${kw} — Most Romantic Celebration 💝`, `${kw} — Perfect Valentine Setup`, `${kw} — Intimate & Beautiful`],
  };
  const options = variants[category] || [`${kw} — Book Private Celebration`, `${kw} — Premium Setup from ₹4,700`, `${kw} — Create Lasting Memories`];
  return options[keyword.length % options.length];
}

export function generateMetaDescription(keyword: string, city: City, category: string): string {
  const minPrice = Math.min(...city.venue.packages.map((p) => p.price));
  const kw = tc(keyword);
  const variants = [
    `Book ${kw}. ${city.venue.packages.length} private setups starting ₹${minPrice.toLocaleString("en-IN")}. ${city.venue.googleRating}★ rated, ${city.venue.couplesServed} couples served. Cake, décor & music included.`,
    `Looking for ${kw}? ${city.venue.packages.length} stunning packages from ₹${minPrice.toLocaleString("en-IN")}. 100% private, ${city.venue.googleRating}★ rated. Book your slot today!`,
    `${kw} — ${city.venue.packages.length} exclusive setups, 3-hour private booking, professional décor. Starting ₹${minPrice.toLocaleString("en-IN")}. Rated ${city.venue.googleRating}★ by ${city.venue.reviewCount} couples.`,
  ];
  return variants[keyword.length % variants.length];
}
