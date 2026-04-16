"use client";

import { useState } from "react";
import { User, Phone, Heart, Gift, Calendar, Clock, MessageCircle } from "lucide-react";

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
  packageName: string;
  packagePrice: number;
  venueName: string;
  whatsappNumber: string;
  cityName: string;
}

export default function PackageBookingForm({
  packageName,
  packagePrice,
  venueName,
  whatsappNumber,
  cityName,
}: Props) {
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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
      `📍 *City:* ${cityName}`,
      `🏛️ *Venue:* ${venueName}`,
      `📦 *Package:* ${packageName}`,
      `💰 *Price:* ₹${packagePrice.toLocaleString("en-IN")}`,
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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass rounded-3xl p-6 space-y-4">
        {/* Header */}
        <div className="text-center pb-2">
          <div className="inline-flex items-center gap-2 text-primary mb-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Reserve Your Event
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Fill in details &amp; we&apos;ll contact you on WhatsApp
          </p>
        </div>

        {/* Package info */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <Gift className="w-4 h-4 text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-sm text-white font-medium truncate">{packageName}</p>
            <p className="text-xs text-primary font-bold">
              ₹{packagePrice.toLocaleString("en-IN")}
            </p>
          </div>
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
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
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
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
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
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
          />
        </div>

        {/* Occasion */}
        <div className="relative">
          <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <select
            required
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors [&>option]:bg-surface [&>option]:text-white"
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
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors [color-scheme:dark]"
          />
        </div>

        {/* Time Slot */}
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <select
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-border rounded-xl text-sm text-white appearance-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors [&>option]:bg-surface [&>option]:text-white"
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
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors text-sm"
        >
          <MessageCircle className="w-5 h-5" />
          Lock Your Date - Message on WhatsApp
        </button>
      </div>
    </form>
  );
}
