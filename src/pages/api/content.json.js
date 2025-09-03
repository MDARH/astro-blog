import contentData from '../../data/content.json';

/**
 * API endpoint to serve content data
 * Returns all site content in JSON format
 */
export async function GET() {
  return new Response(JSON.stringify(contentData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      'Access-Control-Allow-Origin': '*', // Allow CORS for external access
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

/**
 * API endpoint to serve specific content sections
 * Usage: /api/content.json?section=hero or /api/content.json?section=categories
 */
export async function GET({ url }) {
  const searchParams = new URL(url).searchParams;
  const section = searchParams.get('section');
  
  if (section && contentData[section]) {
    return new Response(JSON.stringify(contentData[section]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
  
  // Return all content if no specific section requested
  return new Response(JSON.stringify(contentData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}