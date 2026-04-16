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
  return {
    title: `${city.venue.name} — Romantic Celebrations in ${city.name} | MakeMyMoment.in`,
    description: `Book private romantic celebrations at ${city.venue.name} in ${city.name}. ${city.venue.packages.length} exclusive packages starting from ₹${Math.min(...city.venue.packages.map((p) => p.price)).toLocaleString("en-IN")}`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  return <CityPageClient city={city} />;
}
