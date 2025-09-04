/**
 * AI Image Generation Utility
 * Generates topic-related images using AI services
 */

/**
 * Generate AI image URL based on topic and keywords
 * Uses DeepAI's free API for image generation
 * @param topic - Main topic for the image
 * @param keywords - Additional keywords for better context
 * @param width - Image width (default: 400)
 * @param height - Image height (default: 250)
 * @returns Promise<string> - Generated image URL or fallback
 */
export async function generateTopicImage(
  topic: string,
  keywords: string[] = [],
  width: number = 400,
  height: number = 250
): Promise<string> {
  try {
    // Create a descriptive prompt for AI image generation
    const prompt = createImagePrompt(topic, keywords);
    
    // For now, use a local image as fallback
    // This provides consistent images without external dependencies
    const localImageUrl = generateLocalImageUrl(topic, keywords, width, height);
    
    return localImageUrl;
  } catch (error) {
    console.error('Error generating topic image:', error);
    // Fallback to local image
    return generateLocalImageUrl(topic, keywords, width, height);
  }
}

/**
 * Create AI image prompt based on topic and keywords
 * @param topic - Main topic
 * @param keywords - Additional context keywords
 * @returns Formatted prompt string
 */
function createImagePrompt(topic: string, keywords: string[]): string {
  const basePrompt = `Professional, modern illustration of ${topic}`;
  const keywordString = keywords.length > 0 ? `, ${keywords.join(', ')}` : '';
  const stylePrompt = ', clean design, technology theme, high quality, digital art';
  
  return `${basePrompt}${keywordString}${stylePrompt}`;
}

/**
 * Generate Unsplash URL with topic-specific search
 * Provides better topic relevance than random images
 * @param topic - Main topic
 * @param keywords - Additional keywords
 * @param width - Image width
 * @param height - Image height
 * @returns Unsplash URL with topic search
 */
function generateLocalImageUrl(
  topic: string,
  keywords: string[],
  width: number,
  height: number
): string {
  // Return a local placeholder image instead of external Unsplash
  return '/src/assets/piclumen-1756945094910.png';
}

/**
 * Get topic-specific image for blog posts
 * @param slug - Blog post slug
 * @param title - Blog post title
 * @param width - Image width
 * @param height - Image height
 * @returns Generated image URL
 */
export async function getBlogImage(
  slug: string,
  title: string,
  width: number = 400,
  height: number = 250
): Promise<string> {
  // Extract keywords from title and slug
  const keywords = extractKeywords(title, slug);
  const topic = extractMainTopic(title, slug);
  
  return generateTopicImage(topic, keywords, width, height);
}

/**
 * Extract keywords from blog title and slug
 * @param title - Blog post title
 * @param slug - Blog post slug
 * @returns Array of relevant keywords
 */
function extractKeywords(title: string, slug: string): string[] {
  const keywords: string[] = [];
  
  // Technology-related keywords mapping
  const keywordMap: Record<string, string[]> = {
    'hosting': ['web hosting', 'server', 'cloud', 'website'],
    'domain': ['domain name', 'DNS', 'website', 'internet'],
    'react': ['React', 'JavaScript', 'frontend', 'web development'],
    'digital': ['digital products', 'SaaS', 'business', 'technology'],
    'cloud': ['cloud computing', 'AWS', 'server', 'infrastructure'],
    'devops': ['DevOps', 'deployment', 'automation', 'development'],
    'tutorial': ['programming', 'coding', 'development', 'learning'],
    'web': ['web development', 'frontend', 'backend', 'programming'],
    'javascript': ['JavaScript', 'programming', 'web development', 'coding'],
    'css': ['CSS', 'styling', 'web design', 'frontend'],
    'html': ['HTML', 'markup', 'web development', 'frontend']
  };
  
  // Check title and slug for keywords
  const text = `${title} ${slug}`.toLowerCase();
  
  Object.entries(keywordMap).forEach(([key, values]) => {
    if (text.includes(key)) {
      keywords.push(...values);
    }
  });
  
  // Add generic tech keywords if no specific ones found
  if (keywords.length === 0) {
    keywords.push('technology', 'programming', 'development', 'computer');
  }
  
  // Remove duplicates and limit to 5 keywords
  return [...new Set(keywords)].slice(0, 5);
}

/**
 * Extract main topic from title and slug
 * @param title - Blog post title
 * @param slug - Blog post slug
 * @returns Main topic string
 */
function extractMainTopic(title: string, slug: string): string {
  const text = `${title} ${slug}`.toLowerCase();
  
  // Priority topics
  if (text.includes('hosting')) return 'web hosting';
  if (text.includes('domain')) return 'domain management';
  if (text.includes('react')) return 'React development';
  if (text.includes('digital')) return 'digital products';
  if (text.includes('cloud')) return 'cloud computing';
  if (text.includes('devops')) return 'DevOps';
  if (text.includes('javascript')) return 'JavaScript programming';
  if (text.includes('css')) return 'CSS styling';
  if (text.includes('html')) return 'HTML development';
  
  // Default to technology
  return 'technology';
}

/**
 * Generate hero image for site sections
 * @param section - Site section (hero, category, etc.)
 * @param width - Image width
 * @param height - Image height
 * @returns Generated image URL
 */
export async function getHeroImage(
  section: string = 'hero',
  width: number = 600,
  height: number = 400
): Promise<string> {
  const keywords = ['technology', 'innovation', 'digital', 'modern', 'professional'];
  return generateTopicImage('technology hub', keywords, width, height);
}

/**
 * Generate advertisement images based on ad content
 * @param adTitle - Advertisement title
 * @param adType - Type of advertisement
 * @param width - Image width
 * @param height - Image height
 * @returns Generated image URL
 */
export async function getAdImage(
  adTitle: string,
  adType: string,
  width: number = 300,
  height: number = 200
): Promise<string> {
  const keywords = extractAdKeywords(adTitle, adType);
  const topic = extractAdTopic(adTitle);
  
  return generateTopicImage(topic, keywords, width, height);
}

/**
 * Extract keywords from advertisement content
 * @param title - Ad title
 * @param type - Ad type
 * @returns Array of relevant keywords
 */
function extractAdKeywords(title: string, type: string): string[] {
  const keywords: string[] = [];
  const text = title.toLowerCase();
  
  if (text.includes('hosting')) keywords.push('server', 'cloud', 'website', 'hosting');
  if (text.includes('react')) keywords.push('programming', 'development', 'coding', 'React');
  if (text.includes('domain')) keywords.push('website', 'internet', 'domain', 'DNS');
  if (text.includes('cloud')) keywords.push('cloud computing', 'infrastructure', 'server', 'technology');
  
  // Add type-specific keywords
  keywords.push('professional', 'business', 'service', 'technology');
  
  return [...new Set(keywords)].slice(0, 4);
}

/**
 * Extract main topic from advertisement title
 * @param title - Ad title
 * @returns Main topic string
 */
function extractAdTopic(title: string): string {
  const text = title.toLowerCase();
  
  if (text.includes('hosting')) return 'web hosting service';
  if (text.includes('react')) return 'React development course';
  if (text.includes('domain')) return 'domain registration';
  if (text.includes('cloud')) return 'cloud solutions';
  
  return 'technology service';
}