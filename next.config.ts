import type { NextConfig } from "next";

/**
 * Static export: the whole site builds to plain HTML/CSS/JS in `out/`
 * and can be hosted on any static host (Netlify, Vercel, GitHub Pages, cPanel…).
 * No backend is needed — appointment requests are handed to WhatsApp.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  // Set NEXT_PUBLIC_BASE_PATH="/Dental-Care" when hosting under a sub-folder (GitHub Pages).
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
