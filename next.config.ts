import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses this project as the workspace root
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
