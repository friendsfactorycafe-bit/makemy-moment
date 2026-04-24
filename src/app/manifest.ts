import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BookMyMoment.in",
    short_name: "BookMyMoment",
    description:
      "Premium romantic celebrations — candlelight dinners, birthday surprises, proposals & more across India.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#e11d48",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
