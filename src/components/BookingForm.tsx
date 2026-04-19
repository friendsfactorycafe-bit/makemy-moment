"use client";

import { useState } from "react";
import { cities, services } from "@/data/cities";
import { MessageCircle, User, Phone, MapPin, Gift, Calendar, Clock, Heart } from "lucide-react";

const occasions = [
  "Birthday Surprise",
  "Anniversary Celebration",
  "Proposal",
  "Candlelight Dinner",
  "Surprise Date",
  "Pre-Wedding Shoot",
  "Baby Moments",
  "Valentine's Week",
];

const timeSlots = [
  "Lunch (12–3 PM)",
  "Evening (4–7 PM)",
  "Dinner (7–10 PM)",
  "Late Night (10 PM–1 AM)",
];

interface Props {
  defaultCity?: string;
  defaultPackage?: string;
}

export default function BookingForm({ defaultCity, defaultPackage }: Props) {
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCity, setSelectedCity] = useState(defaultCity || "");
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage || "");
  const [occasion, setOccasion] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const city = cities.find((c) => c.slug === selectedCity);
  const whatsappNumber = city?.venue.whatsapp || "917487888730";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `✨ *New Booking Enquiry* ✨`,
      `━━━━━━━━━━━━━━━━━━`,
      ``,
      `👤 *Name:* ${name}`,
      `💑 *Partner:* ${partnerName}`,
      `📞 *Phone:* ${phone}`,
      ``,
      `📍 *City:* ${city?.name || selectedCity}`,
      `🏛️ *Venue:* ${city?.venue.name || ""}`,
      selectedPackage ? `📦 *Package:* ${selectedPackage}` : "",
      ``,
      `🎉 *Occasion:* ${occasion}`,
      `📅 *Date:* ${date}`,
      `⏰ *Time Slot:* ${time}`,
      ``,
      `━━━━━━━━━━━━━━━━━━`,
      `_via BookMyMoment.in_`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto overflow-hidden">
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 space-y-4 overflow-hidden">
        {/* Header */}
        <div className="text-center pb-2">
          <div className="inline-flex items-center gap-2 text-primary mb-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-widest">Reserve Your Event</span>
          </div>
          <p className="text-xs text-zinc-500">Fill in details &amp; we&apos;ll contact you on WhatsApp</p>
        </div>

        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            required
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full min-w-0 max-w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
          />
        </div>

        {/* Partner Name */}
        <div className="relative">
          <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            required
            placeholder="Partner's Name *"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full min-w-0 max-w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="tel"
            required
            placeholder="Phone Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full min-w-0 max-w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
          />
        </div>

        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <select
            required
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedPackage("");
            }}
            className="w-full min-w-0 max-w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors [&>option]:bg-surface [&>option]:text-white"
          >
            <option value="" disabled>
              City *
            </option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Package */}
        <div className="relative">
          <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="w-full min-w-0 max-w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors [&>option]:bg-surface [&>option]:text-white"
          >
            <option value="">Select Package</option>
            {city?.venue.packages.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name} — ₹{p.price.toLocaleString("en-IN")}
              </option>
            ))}
          </select>
        </div>

        {/* Occasion */}
        <div className="relative">
          <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <select
            required
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full min-w-0 max-w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors [&>option]:bg-surface [&>option]:text-white"
          >
            <option value="" disabled>
              Your Event *
            </option>
            {occasions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full min-w-0 max-w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>

        {/* Time Slot */}
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <select
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full min-w-0 max-w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors [&>option]:bg-surface [&>option]:text-white"
          >
            <option value="" disabled>
              Preferred Time *
            </option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Lock Your Date — Message on WhatsApp
        </button>

        {/* Quick links */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-500 hover:text-green-400 transition-colors"
          >
            WhatsApp
          </a>
          <span className="text-zinc-700">•</span>
          <a
            href={`tel:${city?.venue.phone || "+917487888730"}`}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Call Now
          </a>
        </div>
      </div>
    </form>
  );
}
