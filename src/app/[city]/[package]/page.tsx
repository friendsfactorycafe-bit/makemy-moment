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
  return {
    title: `${pkg.name} — ₹${pkg.price.toLocaleString("en-IN")} | ${city.venue.name}, ${city.name} | BookMyMoment.in`,
    description: `${pkg.description}. Book the ${pkg.name} package at ${city.venue.name} in ${city.name}. Starting at ₹${pkg.price.toLocaleString("en-IN")}.`,
  };
}

export default async function PackagePage({ params }: PageProps) {
  const { city: citySlug, package: pkgSlug } = await params;
  const city = getCityBySlug(citySlug);
  const pkg = getPackageBySlug(citySlug, pkgSlug);
  if (!city || !pkg) notFound();
  return <PackagePageClient city={city} pkg={pkg} />;
}
