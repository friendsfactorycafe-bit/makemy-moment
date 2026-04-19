import Link from "next/link";
import { cities, services } from "@/data/cities";
import { Heart, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                B
              </div>
              <span className="text-lg font-bold text-white">
                BookMyMoment<span className="text-primary">.in</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-6">
              India&apos;s premium romantic celebration platform. Private venues,
              stunning setups, unforgettable memories across multiple cities.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Heart className="w-3 h-3 text-primary" />
              Made with love in Gujarat
            </div>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Our Cities
            </h3>
            <ul className="space-y-3">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-primary/60" />
                    {city.name} — {city.venue.name}
                  </Link>
                </li>
              ))}
              <li className="text-xs text-muted/50 pt-2">
                20+ cities launching soon
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.name}>
                  <span className="text-sm text-muted hover:text-white transition-colors cursor-default">
                    {s.icon} {s.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-4">
              {cities.map((city) => (
                <li key={city.slug} className="space-y-1">
                  <p className="text-xs text-primary font-medium uppercase tracking-wider">
                    {city.name}
                  </p>
                  <a
                    href={`tel:${city.venue.phone}`}
                    className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    {city.venue.phone}
                  </a>
                  <a
                    href={`mailto:${city.venue.email}`}
                    className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    {city.venue.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO Keywords — Vadodara */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
            Popular Searches in Vadodara
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Candlelight Dinner Vadodara",
              "Birthday Surprise Vadodara",
              "Anniversary Celebration Vadodara",
              "Proposal Setup Vadodara",
              "Surprise Date Vadodara",
              "Romantic Dinner Vadodara",
              "Private Dinner Vadodara",
              "Couple Dinner Vadodara",
              "Dinner Date Vadodara",
              "Rooftop Dinner Vadodara",
              "Glass House Dinner Vadodara",
              "Valentine Dinner Vadodara",
              "Pre Wedding Shoot Vadodara",
              "Baby Shower Vadodara",
              "Date Night Vadodara",
              "Birthday Decoration Vadodara",
              "Anniversary Decoration Vadodara",
              "Proposal Decoration Vadodara",
              "Romantic Setup Vadodara",
              "Surprise Setup Vadodara",
              "Candle Light Dinner Vadodara",
              "Private Dining Vadodara",
              "Romantic Places Vadodara",
              "Couple Places Vadodara",
              "Birthday Venue Vadodara",
              "Anniversary Venue Vadodara",
              "Proposal Venue Vadodara",
              "Romantic Cafe Vadodara",
              "Rooftop Cafe Vadodara",
              "Glass House Cafe Vadodara",
              "Friends Factory Cafe Vadodara",
              "Midnight Birthday Surprise Vadodara",
              "Midnight Celebration Vadodara",
              "Romantic Experience Vadodara",
              "Couple Date Ideas Vadodara",
              "Birthday Party Vadodara",
              "Anniversary Party Vadodara",
              "Private Celebration Vadodara",
              "Romantic Surprise Vadodara",
              "Surprise Decoration Vadodara",
              "Balloon Decoration Vadodara",
              "Flower Decoration Vadodara",
              "Engagement Setup Vadodara",
              "Couple Photoshoot Vadodara",
              "Valentine Celebration Vadodara",
              "Wedding Anniversary Vadodara",
              "Marriage Anniversary Vadodara",
              "BookMyMoment Vadodara",
              "Celebration Place Vadodara",
              "Date Ideas Vadodara",
            ].map((kw) => (
              <Link
                key={kw}
                href={`/vadodara`}
                className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
              >
                {kw}
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Keywords — Surat */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
            Popular Searches in Surat
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Candlelight Dinner Surat",
              "Birthday Surprise Surat",
              "Anniversary Celebration Surat",
              "Proposal Setup Surat",
              "Surprise Date Surat",
              "Romantic Dinner Surat",
              "Private Dinner Surat",
              "Couple Dinner Surat",
              "Dinner Date Surat",
              "Themed Celebration Surat",
              "Indoor Celebration Surat",
              "Valentine Dinner Surat",
              "Pre Wedding Shoot Surat",
              "Baby Shower Surat",
              "Date Night Surat",
              "Birthday Decoration Surat",
              "Anniversary Decoration Surat",
              "Proposal Decoration Surat",
              "Romantic Setup Surat",
              "Surprise Setup Surat",
              "Candle Light Dinner Surat",
              "Private Dining Surat",
              "Romantic Places Surat",
              "Couple Places Surat",
              "Birthday Venue Surat",
              "Anniversary Venue Surat",
              "Proposal Venue Surat",
              "Romantic Cafe Surat",
              "Swing Setup Surat",
              "Boho Celebration Surat",
              "HIVY Surat",
              "Fairy Tale Proposal Surat",
              "Tent of Romance Surat",
              "Midnight Birthday Surprise Surat",
              "Midnight Celebration Surat",
              "Romantic Experience Surat",
              "Couple Date Ideas Surat",
              "Birthday Party Surat",
              "Anniversary Party Surat",
              "Private Celebration Surat",
              "Romantic Surprise Surat",
              "Surprise Decoration Surat",
              "Balloon Decoration Surat",
              "Flower Decoration Surat",
              "Engagement Setup Surat",
              "Couple Photoshoot Surat",
              "Valentine Celebration Surat",
              "Wedding Anniversary Surat",
              "BookMyMoment Surat",
              "Celebration Place Surat",
            ].map((kw) => (
              <Link
                key={kw}
                href={`/surat`}
                className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
              >
                {kw}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} BookMyMoment.in — All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
