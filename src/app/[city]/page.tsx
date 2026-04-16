import { cities, getCityBySlug } from "@/data/cities";
import { notFound } from "next/navigation";
import CityPageClient from "./CityPageClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const url = `https://bookmymoment.in/${city.slug}`;
  const title = `${city.venue.name} — Romantic Celebrations in ${city.name}`;
  const description = `Book private romantic celebrations at ${city.venue.name} in ${city.name}. ${city.venue.packages.length} exclusive packages starting from ₹${Math.min(...city.venue.packages.map((p) => p.price)).toLocaleString("en-IN")}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: city.venue.heroImage, alt: `${city.venue.name} - ${city.name}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [city.venue.heroImage] },
    alternates: { canonical: url },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: city.venue.name,
    url: `https://bookmymoment.in/${city.slug}`,
    telephone: city.venue.phone,
    email: city.venue.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: city.venue.address,
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: city.venue.googleRating,
      reviewCount: city.venue.reviewCount.replace(/[^0-9]/g, ""),
    },
    priceRange: `₹${Math.min(...city.venue.packages.map((p) => p.price)).toLocaleString("en-IN")} - ₹${Math.max(...city.venue.packages.map((p) => p.price)).toLocaleString("en-IN")}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityPageClient city={city} />
    </>
  );
}
