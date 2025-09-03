import { SITE_URL } from '../consts';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Disallow admin or private areas (if any)
# Disallow: /admin/
# Disallow: /private/

# Allow all crawlers to access CSS and JS files
Allow: /assets/
Allow: /_astro/

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay (optional, in seconds)
Crawl-delay: 1

# Specific rules for different bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Block AI training bots (optional)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}