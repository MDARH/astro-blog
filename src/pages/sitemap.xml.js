import { getCollection } from 'astro:content';
import { SITE_URL } from '../consts';

export async function GET() {
  // Get all blog posts
  const posts = await getCollection('blog');
  
  // Static pages
  const staticPages = [
    '',
    'blog',
    'about',
    'subscribe'
  ];
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page ? `/${page}` : ''}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : page === 'blog' ? 'daily' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page === 'blog' ? '0.9' : '0.8'}</priority>
  </url>`).join('')}
  ${posts.map(post => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.data.updatedDate ? post.data.updatedDate.toISOString() : post.data.pubDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}