import type { NextConfig } from "next";

/**
 * Static export: the whole site builds to plain HTML/CSS/JS in `out/`
 * and can be hosted on any static host (Netlify, Vercel, GitHub Pages, cPanel…).
 * No backend is needed — appointment requests are handed to WhatsApp.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
