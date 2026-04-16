"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import { cities } from "@/data/cities";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <span className="text-base font-semibold text-white tracking-tight">
            MakeMyMoment<span className="text-primary">.in</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            Home
          </Link>

          {/* Cities dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCityOpen(true)}
            onMouseLeave={() => setCityOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <MapPin className="w-3.5 h-3.5" />
              Cities
              <ChevronDown className={`w-3 h-3 transition-transform ${cityOpen ? "rotate-180" : ""}`} />
            </button>
            {cityOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">{city.name}</p>
                      <p className="text-xs text-zinc-500">{city.venue.name}</p>
                    </div>
                  </Link>
                ))}
                <div className="px-4 py-2.5 text-xs text-zinc-600 border-t border-border">
                  20+ cities coming soon
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#services"
            className="px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            Services
          </Link>

          <Link
            href="/#cities"
            className="ml-3 px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="px-5 py-4 flex flex-col gap-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm text-zinc-300 hover:text-white rounded-lg hover:bg-white/5">
              Home
            </Link>
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {city.name}
              </Link>
            ))}
            <Link
              href="/#cities"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
