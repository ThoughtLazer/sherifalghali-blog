import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Static export configuration for Azure Static Web Apps
  distDir: 'out',
};

export default nextConfig;
