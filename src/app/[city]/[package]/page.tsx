import { cities, getCityBySlug, getPackageBySlug } from "@/data/cities";
import { notFound } from "next/navigation";
import PackagePageClient from "./PackagePageClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ city: string; package: string }>;
}

export async function generateStaticParams() {
  const params: { city: string; package: string }[] = [];
  for (const city of cities) {
    for (const pkg of city.venue.packages) {
      params.push({ city: city.slug, package: pkg.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, package: pkgSlug } = await params;
  const city = getCityBySlug(citySlug);
  const pkg = getPackageBySlug(citySlug, pkgSlug);
  if (!city || !pkg) return {};
  const url = `https://bookmymoment.in/${city.slug}/${pkg.slug}`;
  const title = `${pkg.name} — ₹${pkg.price.toLocaleString("en-IN")} | ${city.venue.name}, ${city.name}`;
  const description = `${pkg.description}. Book the ${pkg.name} package at ${city.venue.name} in ${city.name}. Starting at ₹${pkg.price.toLocaleString("en-IN")}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: pkg.image, alt: `${pkg.name} at ${city.venue.name}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [pkg.image] },
    alternates: { canonical: url },
  };
}

export default async function PackagePage({ params }: PageProps) {
  const { city: citySlug, package: pkgSlug } = await params;
  const city = getCityBySlug(citySlug);
  const pkg = getPackageBySlug(citySlug, pkgSlug);
  if (!city || !pkg) notFound();

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PackagePageClient city={city} pkg={pkg} />
    </>
  );
}
