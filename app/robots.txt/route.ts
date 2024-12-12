import { NextResponse } from 'next/server';

const BASE_URL = "https://devutils.mudasir.in";
 export const runtime = "edge"
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
