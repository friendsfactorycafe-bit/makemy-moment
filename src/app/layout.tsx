import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://bookmymoment.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BookMyMoment.in — Premium Romantic Celebrations Across India",
    template: "%s | BookMyMoment.in",
  },
  description:
    "Book private romantic celebrations, candlelight dinners, birthday surprises, proposals & anniversary setups in Vadodara, Surat & more cities across India.",
  keywords: [
    "romantic celebration",
    "candlelight dinner",
    "birthday surprise",
    "proposal setup",
    "anniversary celebration",
    "private dining",
    "couple celebration",
    "Vadodara",
    "Surat",
    "BookMyMoment",
  ],
  authors: [{ name: "BookMyMoment.in" }],
  creator: "BookMyMoment.in",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "BookMyMoment.in",
    title: "BookMyMoment.in — Premium Romantic Celebrations Across India",
    description:
      "India's premium platform for private romantic celebrations. Candlelight dinners, birthday surprises, proposals & more in stunning exclusive venues.",
    images: [
      {
        url: "/images/ffc-hero.webp",
        width: 1920,
        height: 1080,
        alt: "BookMyMoment.in — Romantic Celebrations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BookMyMoment.in — Premium Romantic Celebrations",
    description:
      "Book private romantic celebrations across India. Candlelight dinners, surprises & more.",
    images: ["/images/ffc-hero.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/icon.svg", color: "#e11d48" },
    ],
  },
  appleWebApp: {
    title: "BookMyMoment",
    statusBarStyle: "black-translucent",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BookMyMoment.in",
              url: "https://bookmymoment.in",
              logo: "https://bookmymoment.in/icon.svg",
              description:
                "India's premium platform for private romantic celebrations across multiple cities.",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-7487888730",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi", "Gujarati"],
                },
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
