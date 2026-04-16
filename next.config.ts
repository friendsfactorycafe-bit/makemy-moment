import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "friendsfactorycafe.com" },
      { protocol: "https", hostname: "hivy.co.in" },
    ],
  },
};

export default nextConfig;
