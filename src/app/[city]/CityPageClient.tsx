"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { City } from "@/data/cities";
import { services } from "@/data/cities";
import {
  MapPin,
  Star,
  ArrowRight,
  Phone,
  Clock,
  Check,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function CityPageClient({ city }: { city: City }) {
  const { venue } = city;
  const minPrice = Math.min(...venue.packages.map((p) => p.price));

  return (
    <div className="relative">
      {/* ============ HERO ============ */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0">
          <img
            src={venue.heroImage}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-40 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/80">{city.name}</span>
            </div>

            {/* City badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light mb-4">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm text-white/80">
                {city.name}, {city.state}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
              {venue.name}
            </h1>
            <p className="text-lg text-white/60 max-w-xl mb-6">
              {venue.tagline}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-white font-semibold">
                  {venue.googleRating}
                </span>
                <span className="text-white/50 text-sm">
                  ({venue.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {venue.couplesServed} couples served
              </div>
              <div className="text-white/60 text-sm">
                {venue.packages.length} packages from{" "}
                <span className="text-white font-semibold">
                  ₹{minPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${venue.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in booking a romantic celebration at ${venue.name}. Please share the details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a
                href={`tel:${venue.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 text-white font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                {venue.phone}
              </a>
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 text-white/70 font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Visit Website
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ PACKAGES ============ */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm text-primary font-medium uppercase tracking-wider mb-3"
            >
              Our Setups
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Celebration Packages
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-muted max-w-xl mx-auto">
              Each package includes a private 3-hour celebration with
              professional decorations, food, and more
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {venue.packages.map((pkg) => (
              <motion.div key={pkg.slug} variants={fadeUp}>
                <Link
                  href={`/${city.slug}/${pkg.slug}`}
                  className="group block h-full"
                >
                  <div className="glass rounded-3xl overflow-hidden h-full card-hover flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-xs text-white/80 font-medium">
                        Setup {pkg.setupNumber}
                      </div>
                      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur text-sm text-white font-bold">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                        {pkg.description}
                      </p>

                      {/* Features preview */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pkg.features.slice(0, 3).map((f) => (
                          <span
                            key={f}
                            className="flex items-center gap-1 text-xs text-white/50"
                          >
                            <Check className="w-3 h-3 text-primary/60" />
                            {f}
                          </span>
                        ))}
                        {pkg.features.length > 3 && (
                          <span className="text-xs text-primary/60">
                            +{pkg.features.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-primary text-sm font-medium">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm text-primary font-medium uppercase tracking-wider mb-3"
            >
              Perfect For
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Every Special Occasion
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {services.map((s) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                className="glass rounded-2xl p-5 text-center card-hover cursor-default"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="text-sm font-medium text-white">{s.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ TIME SLOTS ============ */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 sm:p-12"
          >
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <p className="text-sm text-primary font-medium uppercase tracking-wider mb-3">
                  Flexible Scheduling
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Choose Your Time Slot
                </h3>
                <p className="text-muted mb-6">
                  Four daily slots to match your schedule. Each slot gives you 3
                  uninterrupted hours of celebration.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {venue.timeSlots.map((slot) => (
                    <div
                      key={slot}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm text-white">{slot}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="flex-1 w-full">
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Venue Location
                      </p>
                      <p className="text-xs text-muted leading-relaxed">
                        {venue.address}
                      </p>
                    </div>
                  </div>
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-accent/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Book Your Celebration at {venue.name}
              </h2>
              <p className="text-lg text-muted max-w-xl mx-auto mb-8">
                Connect with us on WhatsApp for instant booking, customization
                requests, and date availability.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${venue.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in booking a romantic celebration at ${venue.name}. Please share the details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book on WhatsApp
                </a>
                <a
                  href={`tel:${venue.phone}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-semibold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call {venue.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
