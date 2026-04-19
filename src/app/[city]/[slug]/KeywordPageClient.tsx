"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { City } from "@/data/cities";
import type { KeywordPage } from "@/data/keywords-utils";
import {
  titleCase,
  getCategoryIntro,
  getWhyChoosePoints,
  getHowItWorks,
  getFaqItems,
} from "@/data/keywords-utils";
import {
  MapPin,
  Star,
  ArrowRight,
  Phone,
  Clock,
  Check,
  MessageCircle,
  ChevronDown,
  Shield,
  Heart,
  Sparkles,
  Users,
  Camera,
  Music,
  Cake,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="glass rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="text-white font-medium pr-4">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-96 pb-5 px-5" : "max-h-0"
            }`}
          >
            <p className="text-muted leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function KeywordPageClient({
  city,
  keywordPage: kp,
  relatedKeywords,
}: {
  city: City;
  keywordPage: KeywordPage;
  relatedKeywords: KeywordPage[];
}) {
  const { venue } = city;
  const minPrice = Math.min(...venue.packages.map((p) => p.price));
  const maxPrice = Math.max(...venue.packages.map((p) => p.price));
  const kw = titleCase(kp.keyword);
  const related = relatedKeywords;
  const whyPoints = getWhyChoosePoints(city);
  const howItWorks = getHowItWorks();
  const faqItems = getFaqItems(kp.keyword, city);
  const introText = getCategoryIntro(kp.category, kp.keyword.length);

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in ${kp.keyword}. Please share the details and availability.`
  );

  return (
    <div className="relative">
      {/* ============ HERO ============ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={venue.heroImage}
            alt={kw}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-40 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
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
              <span className="text-white/80 line-clamp-1">{kw}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light mb-4">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm text-white/80">
                {city.name}, {city.state}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl leading-tight">
              {kw}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mb-6">
              {venue.packages.length} exclusive private setups starting from ₹
              {minPrice.toLocaleString("en-IN")}. Rated {venue.googleRating}★ by{" "}
              {venue.reviewCount} couples.
            </p>

            {/* Stats */}
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
                From{" "}
                <span className="text-white font-semibold">
                  ₹{minPrice.toLocaleString("en-IN")}
                </span>{" "}
                to{" "}
                <span className="text-white font-semibold">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${venue.whatsapp}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Book on WhatsApp
              </a>
              <a
                href={`tel:${venue.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 text-white font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                {venue.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ ALL PACKAGES ============ */}
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
              Choose Your Celebration Package
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg text-muted max-w-xl mx-auto"
            >
              {venue.packages.length} exclusive private setups — each with its own
              theme, décor, and personality
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

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                        {pkg.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pkg.features.slice(0, 4).map((f) => (
                          <span
                            key={f}
                            className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-primary font-medium text-sm">
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

      {/* ============ LONG-FORM CONTENT (800+ words) ============ */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {kw} — Your Complete Guide
            </h2>

            <p className="text-muted leading-relaxed text-base">
              {introText}
            </p>

            <p className="text-muted leading-relaxed text-base">
              In {city.name}, the search for the perfect {kp.category} experience ends here.
              Whether you are planning a special evening for two, a milestone celebration with close
              friends, or a surprise that will leave your loved one speechless — we have created
              {" "}{venue.packages.length} exclusive private setups, each designed to deliver a unique,
              unforgettable experience. With prices starting from just ₹{minPrice.toLocaleString("en-IN")}
              {" "}and going up to ₹{maxPrice.toLocaleString("en-IN")}, there is a perfect package for
              every budget and every occasion.
            </p>

            <h3 className="text-xl font-bold text-white mt-10 mb-4">
              What Makes Our {titleCase(kp.category)} Setups Special?
            </h3>

            <p className="text-muted leading-relaxed text-base">
              Every celebration we host is designed from the ground up to be extraordinary. We do not
              believe in cookie-cutter setups or generic decorations. Each of our {venue.packages.length}
              {" "}packages has its own personality, its own colour palette, and its own emotional
              signature. When you walk into your private celebration space, you will feel the
              difference immediately — because every candle placement, every floral arrangement, and
              every piece of décor has been thoughtfully positioned to create a cohesive, breathtaking
              experience.
            </p>

            <p className="text-muted leading-relaxed text-base">
              Our venue in {city.name} has earned a remarkable {venue.googleRating}-star rating on
              Google, backed by {venue.reviewCount} genuine reviews from couples who have celebrated
              their most cherished moments with us. Over {venue.couplesServed} couples have walked
              through our doors and left with memories that last a lifetime. That kind of trust is not
              built overnight — it is earned through consistent excellence, genuine care, and an
              unwavering commitment to making every celebration perfect.
            </p>

            <h3 className="text-xl font-bold text-white mt-10 mb-4">
              The Perfect {city.name} Experience
            </h3>

            <p className="text-muted leading-relaxed text-base">
              {city.name}, {city.state} is a city that understands celebration. From its vibrant
              culture to its warm-hearted people, everything about this city lends itself to creating
              beautiful moments. And when you combine that spirit of celebration with a venue that is
              specifically designed for intimate, private experiences — you get something truly
              special. Our {venue.packages.length} setups include{" "}
              {venue.highlights.join(", ").toLowerCase()} — each one crafted to transport you into a
              world where only your celebration exists.
            </p>

            <p className="text-muted leading-relaxed text-base">
              Every booking includes a generous 3-hour private reservation, ensuring you never feel
              rushed. Your time slot is exclusively yours — no other guests, no interruptions, no
              distractions. Just you, your loved ones, and a space that has been transformed into
              something magical. Choose from our four convenient time slots — Lunch (12–3 PM),
              Evening (4–7 PM), Dinner (7–10 PM), or Late Night (10 PM–1 AM) — and we will take care
              of everything else.
            </p>

            <h3 className="text-xl font-bold text-white mt-10 mb-4">
              What Is Included in Every Package?
            </h3>

            <p className="text-muted leading-relaxed text-base">
              When you book {kp.keyword}, you are not just reserving a space — you are investing in a
              complete experience. Most of our packages include professional themed decorations that
              are set up before you arrive, a celebration cake to mark the occasion, romantic music to
              set the mood, and photo-ready décor that ensures every photo you take is worthy of your
              Instagram feed. Some packages also include welcome drinks, non-alcoholic champagne, and
              other special touches that elevate the experience even further.
            </p>

            <p className="text-muted leading-relaxed text-base">
              But what truly sets us apart is the intangible — the feeling you get when you walk into
              a space that has been prepared with genuine care and attention. Our team puts their
              heart into every setup because we understand that these are not just events — they are
              milestones. Birthdays, anniversaries, proposals, date nights — these are the moments
              that define relationships, and we take that responsibility seriously.
            </p>

            <h3 className="text-xl font-bold text-white mt-10 mb-4">
              Pricing & Value
            </h3>

            <p className="text-muted leading-relaxed text-base">
              We believe that extraordinary celebrations should not require extraordinary budgets.
              That is why our packages start from just ₹{minPrice.toLocaleString("en-IN")} — a
              price that includes everything from decorations to cake to a 3-hour private booking.
              Our premium packages, priced up to ₹{maxPrice.toLocaleString("en-IN")}, offer
              additional features and more elaborate setups for those who want to go all out. Every
              rupee you spend goes directly into creating an experience that exceeds your expectations.
            </p>

            <p className="text-muted leading-relaxed text-base">
              Compare that to the cost of booking a restaurant, ordering decorations separately,
              arranging for a cake, and hoping everything comes together — and you will see why
              {" "}{venue.couplesServed} couples have chosen us. We handle every detail, so you can
              focus on what matters most — the person you are celebrating with.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm text-primary font-medium uppercase tracking-wider mb-3"
            >
              Why Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Why Couples Love Celebrating Here
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {whyPoints.map((point, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass rounded-2xl p-5 flex items-start gap-3"
              >
                <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <p className="text-sm text-muted leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm text-primary font-medium uppercase tracking-wider mb-3"
            >
              Simple Process
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              How It Works
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {howItWorks.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-black text-primary/20 mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURES GRID ============ */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm text-primary font-medium uppercase tracking-wider mb-3"
            >
              What You Get
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Included in Every Celebration
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {[
              { icon: Clock, label: "3-Hour Private Booking" },
              { icon: Sparkles, label: "Themed Decorations" },
              { icon: Cake, label: "Celebration Cake" },
              { icon: Music, label: "Romantic Music" },
              { icon: Camera, label: "Photo-Ready Décor" },
              { icon: Shield, label: "100% Private Space" },
            ].map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="glass rounded-2xl p-5 text-center"
              >
                <Icon className="w-7 h-7 text-primary mx-auto mb-3" />
                <p className="text-sm text-white font-medium">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaqAccordion items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
            <div className="relative z-10">
              <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to Create Your Perfect Moment?
              </h2>
              <p className="text-muted max-w-xl mx-auto mb-8">
                Book your {kp.category} celebration today. {venue.packages.length}{" "}
                exclusive setups, 3-hour private booking, starting from just ₹
                {minPrice.toLocaleString("en-IN")}.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/${venue.whatsapp}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Book on WhatsApp
                </a>
                <a
                  href={`tel:${venue.phone}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass hover:bg-white/10 text-white font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ RELATED KEYWORDS ============ */}
      {related.length > 0 && (
        <section className="py-16 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <p className="text-sm text-primary font-medium uppercase tracking-wider mb-3">
                Explore More
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Related Celebrations in {city.name}
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap justify-center gap-3"
            >
              {related.map((r) => (
                <motion.div key={r.slug} variants={fadeUp}>
                  <Link
                    href={`/${r.citySlug}/${r.slug}`}
                    className="inline-block px-4 py-2 rounded-full glass hover:bg-white/10 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {titleCase(r.keyword)}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
