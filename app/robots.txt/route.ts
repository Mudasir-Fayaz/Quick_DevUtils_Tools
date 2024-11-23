import { NextResponse } from 'next/server';

const BASE_URL = "https://quick-devutils.vercel.app";

export async function GET() {
  const robots = `
    User-agent: *
    Allow: /
    Sitemap: ${BASE_URL}/sitemap
  `;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
