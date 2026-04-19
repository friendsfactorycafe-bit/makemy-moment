import { cities, getCityBySlug, getPackageBySlug } from "@/data/cities";
import {
  allKeywordPages,
  getKeywordPage,
  generateMetaTitle,
  generateMetaDescription,
  getRelatedKeywords,
} from "@/data/keywords";
import { notFound } from "next/navigation";
import PackagePageClient from "./PackagePageClient";
import KeywordPageClient from "./KeywordPageClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ city: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { city: string; slug: string }[] = [];

  // Package pages
  for (const city of cities) {
    for (const pkg of city.venue.packages) {
      params.push({ city: city.slug, slug: pkg.slug });
    }
  }

  // Keyword pages
  for (const kp of allKeywordPages) {
    params.push({ city: kp.citySlug, slug: kp.slug });
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  // Check package first
  const pkg = getPackageBySlug(citySlug, slug);
  if (pkg) {
    const url = `https://bookmymoment.in/${city.slug}/${pkg.slug}`;
    const title = `${pkg.name} — ₹${pkg.price.toLocaleString("en-IN")} | ${city.venue.name}, ${city.name}`;
    const description = `${pkg.description}. Book the ${pkg.name} package at ${city.venue.name} in ${city.name}. Starting at ₹${pkg.price.toLocaleString("en-IN")}.`;
    return {
      title,
      description,
      openGraph: { title, description, url, images: [{ url: pkg.image, alt: `${pkg.name} at ${city.venue.name}` }] },
      twitter: { card: "summary_large_image", title, description, images: [pkg.image] },
      alternates: { canonical: url },
    };
  }

  // Check keyword page
  const kp = getKeywordPage(citySlug, slug);
  if (kp) {
    const title = generateMetaTitle(kp.keyword, city.name, kp.category);
    const description = generateMetaDescription(kp.keyword, city, kp.category);
    const url = `https://bookmymoment.in/${city.slug}/${kp.slug}`;
    return {
      title,
      description,
      openGraph: { title, description, url, siteName: "BookMyMoment", type: "website", images: [{ url: city.venue.heroImage, alt: kp.keyword, width: 1200, height: 630 }] },
      twitter: { card: "summary_large_image", title, description, images: [city.venue.heroImage] },
      alternates: { canonical: url },
    };
  }

  return {};
}

export default async function SlugPage({ params }: PageProps) {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  // ─── Package page ───────────────────────────────────────────────
  const pkg = getPackageBySlug(citySlug, slug);
  if (pkg) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: pkg.name,
      description: pkg.description,
      url: `https://bookmymoment.in/${city.slug}/${pkg.slug}`,
      image: `https://bookmymoment.in${pkg.image}`,
      brand: { "@type": "Brand", name: city.venue.name },
      offers: {
        "@type": "Offer",
        price: pkg.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: city.venue.name },
      },
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PackagePageClient city={city} pkg={pkg} />
      </>
    );
  }

  // ─── Keyword page ──────────────────────────────────────────────
  const kp = getKeywordPage(citySlug, slug);
  if (!kp) notFound();

  const minPrice = Math.min(...city.venue.packages.map((p) => p.price));
  const maxPrice = Math.max(...city.venue.packages.map((p) => p.price));

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bookmymoment.in" },
      { "@type": "ListItem", position: 2, name: city.name, item: `https://bookmymoment.in/${city.slug}` },
      { "@type": "ListItem", position: 3, name: kp.keyword, item: `https://bookmymoment.in/${city.slug}/${kp.slug}` },
    ],
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: city.venue.name,
    url: `https://bookmymoment.in/${city.slug}`,
    telephone: city.venue.phone,
    email: city.venue.email,
    address: { "@type": "PostalAddress", streetAddress: city.venue.address, addressLocality: city.name, addressRegion: city.state, addressCountry: "IN" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: city.venue.googleRating, reviewCount: city.venue.reviewCount.replace(/[^0-9]/g, "") },
    priceRange: `₹${minPrice.toLocaleString("en-IN")} - ₹${maxPrice.toLocaleString("en-IN")}`,
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: kp.keyword,
    description: generateMetaDescription(kp.keyword, city, kp.category),
    provider: { "@type": "LocalBusiness", name: city.venue.name },
    areaServed: { "@type": "City", name: city.name },
    offers: { "@type": "AggregateOffer", lowPrice: minPrice, highPrice: maxPrice, priceCurrency: "INR", offerCount: city.venue.packages.length },
  };

  const faqItems = [
    { q: `What is the price for ${kp.keyword}?`, a: `Our packages start from ₹${minPrice.toLocaleString("en-IN")} and go up to ₹${maxPrice.toLocaleString("en-IN")}.` },
    { q: `How do I book ${kp.keyword}?`, a: `Book instantly on our website or via WhatsApp at ${city.venue.phone}.` },
    { q: `Is the celebration completely private?`, a: `Yes, every booking is 100% private with a 3-hour exclusive reservation.` },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <KeywordPageClient city={city} keywordPage={kp} relatedKeywords={getRelatedKeywords(kp, allKeywordPages, 12)} />
    </>
  );
}

export const revalidate = 86400;
