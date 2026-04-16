"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cities, services } from "@/data/cities";
import {
  MapPin,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Heart,
  Shield,
  Clock,
  Camera,
} from "lucide-react";
import BookingForm from "@/components/BookingForm";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/ffc-hero.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left — Text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
                <span className="text-xs text-white/70 font-medium tracking-wide">
                  Now live in {cities.length} cities — Expanding to 20+
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
              >
                <span className="text-white">Book My</span>
                <br />
                <span className="gradient-text">Moment</span>{" "}
                <span className="text-white">Perfectly</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-5 text-base sm:text-lg text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                India&apos;s premium platform for private romantic celebrations.
                Candlelight dinners, birthday surprises, proposals &amp; more — all in
                stunning, exclusive venues.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              >
                {[
                  { label: "Couples Served", value: "6,000+" },
                  { label: "Google Rating", value: "4.9 ★" },
                  { label: "Private Setups", value: "13+" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center lg:items-start">
                    <span className="text-xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs text-zinc-500">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-auto lg:min-w-[400px]"
            >
              <BookingForm />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm text-primary font-medium uppercase tracking-wider mb-3">
              Simple &amp; Seamless
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              How It Works
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                icon: MapPin,
                title: "Choose Your City",
                desc: "Select from our growing list of cities across India. Each city has a curated premium venue.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Pick a Package",
                desc: "Browse stunning celebration setups — from rooftop dinners to glass house experiences.",
              },
              {
                step: "03",
                icon: Heart,
                title: "Celebrate & Cherish",
                desc: "Show up and create unforgettable memories. We handle every detail for you.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="relative group"
              >
                <div className="glass rounded-3xl p-8 h-full card-hover">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-white/5 group-hover:text-primary/10 transition-colors">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CITIES ============ */}
      <section id="cities" className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm text-primary font-medium uppercase tracking-wider mb-3">
              Explore Venues
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Choose Your City
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-muted max-w-xl mx-auto">
              Each city features a handpicked premium venue with exclusive
              romantic celebration setups
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {cities.map((city) => (
              <motion.div key={city.slug} variants={fadeUp}>
                <Link href={`/${city.slug}`} className="group block">
                  <div className="relative rounded-3xl overflow-hidden bg-surface-light border border-white/10 card-hover shadow-lg shadow-black/30 hover:border-primary/30 transition-colors duration-300">
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={city.venue.heroImage}
                        alt={`${city.venue.name} - ${city.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-surface-light/60 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white font-medium">
                        <MapPin className="w-3 h-3 text-primary" />
                        {city.name}, {city.state}
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur text-xs text-white">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        {city.venue.googleRating} ({city.venue.reviewCount} reviews)
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {city.venue.name}
                      </h3>
                      <p className="text-sm text-muted mb-4">
                        {city.venue.tagline}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {city.venue.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/70 border border-white/5"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted mb-1">
                            {city.venue.packages.length} packages starting from
                          </p>
                          <p className="text-xl font-bold text-white">
                            ₹{Math.min(...city.venue.packages.map((p) => p.price)).toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                          View Packages
                          <ArrowRight className="w-4 h-4" />
                        </div>
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
      <section id="services" className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm text-primary font-medium uppercase tracking-wider mb-3">
              What We Offer
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Every Occasion, Perfected
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {services.map((service) => (
              <motion.div
                key={service.name}
                variants={fadeUp}
                className="glass rounded-2xl p-6 card-hover group cursor-default"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm text-primary font-medium uppercase tracking-wider mb-3">
              Why BookMyMoment
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Built for Unforgettable Moments
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Shield,
                title: "100% Private",
                desc: "Every celebration is exclusively yours. No other guests, no sharing.",
              },
              {
                icon: Camera,
                title: "Instagram-Worthy",
                desc: "Professional decor with fairy lights, balloons, and photo-ready setups.",
              },
              {
                icon: Clock,
                title: "3-Hour Experience",
                desc: "Unhurried celebrations — linger, laugh, and live the moment fully.",
              },
              {
                icon: Users,
                title: "6,000+ Couples",
                desc: "Trusted by thousands across Gujarat. 4.9 stars on Google.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="text-center group"
              >
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/25 group-hover:to-primary/10 transition-all">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-accent/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

            <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Create Magic?
              </h2>
              <p className="text-lg text-muted max-w-xl mx-auto mb-8">
                Choose your city, pick a package, and let us create an
                unforgettable celebration for you and your loved one.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <MapPin className="w-4 h-4" />
                    Explore {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
