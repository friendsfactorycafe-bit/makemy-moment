"use client";
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { City, Package } from "@/data/cities";
import {
  MapPin,
  Star,
  ArrowLeft,
  Phone,
  Clock,
  Check,
  MessageCircle,
  Shield,
  Music,
  Camera,
  Cake,
  Heart,
} from "lucide-react";
import PackageGallery from "@/components/PackageGallery";
import PackageBookingForm from "@/components/PackageBookingForm";

const featureIcons: Record<string, typeof Clock> = {
  "3-Hour Private Booking": Clock,
  "Celebration Cake": Cake,
  "Romantic Music": Music,
  "Photo-Ready Décor": Camera,
  "Non-Alcoholic Champagne": Heart,
  "Welcome Drink": Heart,
};

export default function PackagePageClient({
  city,
  pkg,
}: {
  city: City;
  pkg: Package;
}) {
  const { venue } = city;

  return (
    <div className="relative">
      {/* ============ HERO / GALLERY + FORM ============ */}
      <section className="pt-28 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/${city.slug}`}
                className="hover:text-white transition-colors"
              >
                {city.name}
              </Link>
              <span>/</span>
              <span className="text-white/80">{pkg.name}</span>
            </div>

            <Link
              href={`/${city.slug}`}
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all packages
            </Link>
          </motion.div>

          {/* Two-column: Gallery + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <PackageGallery images={pkg.galleryImages} name={pkg.name} />
            </motion.div>

            {/* Right: Package Info + Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Package Info */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/70 font-medium">
                      Setup {pkg.setupNumber}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-white/60">
                      <MapPin className="w-3 h-3" />
                      {city.name}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    {pkg.name}
                  </h1>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-white">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-white/50">
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                      {venue.googleRating} • {venue.couplesServed} couples
                    </div>
                  </div>

                  {/* Perfect For badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Birthday", "Anniversary", "Proposal", "Candlelight Dinner", "Date Night"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Form */}
                <PackageBookingForm
                  packageName={pkg.name}
                  packagePrice={pkg.price}
                  venueName={venue.name}
                  whatsappNumber={venue.whatsapp}
                  cityName={city.name}
                />

                {/* Quick CTA */}
                <div className="flex gap-3">
                  <a
                    href={`tel:${venue.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full glass hover:bg-white/10 text-white/70 font-medium transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call {venue.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED ============ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              What&apos;s Included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pkg.features.map((feature) => {
                const Icon = featureIcons[feature] || Check;
                return (
                  <div
                    key={feature}
                    className="glass rounded-2xl p-5 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-white font-medium">
                      {feature}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* The Experience */}
            <div className="mt-10 glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                The Experience
              </h3>
              <div className="space-y-3 text-sm text-muted leading-relaxed">
                <p>
                  Enjoy a completely private 3-hour celebration at{" "}
                  {venue.name}. Our team prepares your setup 3 hours in
                  advance, ensuring every balloon is placed, every candle is
                  lit, and every detail is perfect.
                </p>
                <p>
                  Walk into a fully realized romantic setting with soft music
                  playing and welcome drinks ready. The next 3 hours are yours
                  — delicious food, meaningful conversations, and
                  photograph-worthy moments.
                </p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "100% Private Venue" },
                { icon: Clock, label: "3-Hour Private Session" },
                { icon: Camera, label: "Instagram-Worthy Setup" },
                { icon: Star, label: `${venue.googleRating}★ Google Rated` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass rounded-xl p-4 flex flex-col items-center text-center gap-2"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ AVAILABLE TIME SLOTS ============ */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Available Time Slots
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {venue.timeSlots.map((slot) => (
                <div
                  key={slot}
                  className="glass rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <span className="text-sm text-white/80">{slot}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ VENUE INFO ============ */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Venue</h3>
            <p className="text-sm text-white font-medium">{venue.name}</p>
            <p className="text-xs text-muted mt-1">{venue.address}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70 hover:bg-white/10 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                View on Map
              </a>
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70 hover:bg-white/10 transition-colors"
              >
                Visit Website
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ OTHER PACKAGES ============ */}
      <section className="py-16 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Other Packages in {city.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venue.packages
              .filter((p) => p.slug !== pkg.slug)
              .slice(0, 6)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/${city.slug}/${p.slug}`}
                  className="group block"
                >
                  <div className="glass rounded-2xl overflow-hidden card-hover">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-xs text-white/80 font-medium">
                        Setup {p.setupNumber}
                      </div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-primary/90 text-sm text-white font-bold">
                        ₹{p.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-muted mt-1 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ============ STICKY MOBILE CTA ============ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-sm border-t border-white/5 p-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{pkg.name}</p>
            <p className="text-xs text-primary font-bold">
              ₹{pkg.price.toLocaleString("en-IN")}
            </p>
          </div>
          <a
            href={`https://wa.me/${venue.whatsapp}?text=${encodeURIComponent(
              `Hi! I'd like to book the "${pkg.name}" package (₹${pkg.price.toLocaleString("en-IN")}) at ${venue.name}. Please share available dates and details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
