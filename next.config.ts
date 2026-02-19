import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dvla.gov.gh",
      },
    ],
  },
  turbopack: {
    // Force Turbopack to treat this directory as the workspace root
    root: __dirname,
  },
};

export default nextConfig;
