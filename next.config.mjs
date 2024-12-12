/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.buymeacoffee.com",
      },
    ],
    dangerouslyAllowSVG: true, // Enable this to allow SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  serverRuntimeConfig: {
    runtime: process.env.RUNTIME,
  },
};

export default nextConfig;
