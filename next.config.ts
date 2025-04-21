// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
    // serverActions: true,
  },
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
