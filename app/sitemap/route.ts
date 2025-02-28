import { toolsData } from '@/tools';
import { NextResponse } from 'next/server';

// Replace this with your actual base URL
const BASE_URL = "https://devutils.mudasir.in";

// Static routes (add your static pages here)
const staticRoutes = [
  '/',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-conditions'
];
export const runtime = 'edge'
// Example of dynamic routes
async function getDynamicRoutes() {
    const slugs = toolsData.flatMap((category) => category.tools.map((tool) => tool.slug));

  return slugs;
}

export async function GET() {
  const dynamicRoutes = await getDynamicRoutes();

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Generate the XML structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map((route) => {
        return `
          <url>
            <loc>${BASE_URL}${route}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>
        `;
      })
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
