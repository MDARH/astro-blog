#!/usr/bin/env node

/**
 * AI Image Generation CLI Tool
 * Generates topic-related images using AI services and saves them locally
 * Usage: node scripts/generateImages.js [blog-title] [output-filename]
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Configuration for image generation
 */
const CONFIG = {
  outputDir: path.join(__dirname, '..', 'src', 'assets', 'generated'),
  defaultWidth: 800,
  defaultHeight: 600,
  // Using Unsplash as primary source with better keywords
  imageServices: {
    unsplash: 'https://source.unsplash.com',
    picsum: 'https://picsum.photos'
  }
};

/**
 * Create output directory if it doesn't exist
 */
function ensureOutputDirectory() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`✅ Created output directory: ${CONFIG.outputDir}`);
  }
}

/**
 * Extract keywords from blog title for better image generation
 * @param {string} title - Blog post title
 * @returns {string[]} Array of relevant keywords
 */
function extractKeywords(title) {
  const keywords = [];
  const text = title.toLowerCase();
  
  // Technology-related keywords mapping
  const keywordMap = {
    'hosting': ['web-hosting', 'server', 'cloud', 'datacenter'],
    'domain': ['domain-name', 'dns', 'website', 'internet'],
    'react': ['react', 'javascript', 'frontend', 'programming'],
    'digital': ['digital-products', 'saas', 'business', 'technology'],
    'cloud': ['cloud-computing', 'aws', 'server', 'infrastructure'],
    'devops': ['devops', 'deployment', 'automation', 'development'],
    'tutorial': ['programming', 'coding', 'development', 'learning'],
    'web': ['web-development', 'frontend', 'backend', 'programming'],
    'javascript': ['javascript', 'programming', 'web-development', 'coding'],
    'css': ['css', 'styling', 'web-design', 'frontend'],
    'html': ['html', 'markup', 'web-development', 'frontend'],
    'api': ['api', 'programming', 'backend', 'development'],
    'database': ['database', 'sql', 'data', 'backend'],
    'security': ['cybersecurity', 'security', 'protection', 'technology']
  };
  
  // Check title for keywords
  Object.entries(keywordMap).forEach(([key, values]) => {
    if (text.includes(key)) {
      keywords.push(...values);
    }
  });
  
  // Add generic tech keywords if no specific ones found
  if (keywords.length === 0) {
    keywords.push('technology', 'programming', 'development', 'computer');
  }
  
  // Remove duplicates and limit to 4 keywords
  return [...new Set(keywords)].slice(0, 4);
}

/**
 * Generate image URL based on title and keywords
 * @param {string} title - Blog post title
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} Generated image URL
 */
function generateImageUrl(title, width = CONFIG.defaultWidth, height = CONFIG.defaultHeight) {
  const keywords = extractKeywords(title);
  const keywordString = keywords.join(',');
  
  // Use Unsplash with specific keywords for better results
  // Add fallback to picsum if unsplash fails
  return `${CONFIG.imageServices.unsplash}/${width}x${height}/?${keywordString}`;
}

/**
 * Generate fallback image URL using Picsum
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} Fallback image URL
 */
function generateFallbackUrl(width, height) {
  return `${CONFIG.imageServices.picsum}/${width}/${height}?random=${Date.now()}`;
}

/**
 * Download image from URL and save to local directory
 * @param {string} url - Image URL
 * @param {string} filename - Output filename
 * @returns {Promise<string>} Path to saved file
 */
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(CONFIG.outputDir, filename);
    const file = fs.createWriteStream(outputPath);
    
    const protocol = url.startsWith('https') ? https : http;
    
    console.log(`📥 Downloading image from: ${url}`);
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Image saved: ${outputPath}`);
        resolve(outputPath);
      });
      
      file.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', reject);
  });
}

/**
 * Generate filename from title
 * @param {string} title - Blog post title
 * @param {string} extension - File extension (default: jpg)
 * @returns {string} Generated filename
 */
function generateFilename(title, extension = 'jpg') {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  return `${slug}.${extension}`;
}

/**
 * Generate multiple images with different sizes
 * @param {string} title - Blog post title
 * @param {string} baseFilename - Base filename without extension
 */
async function generateMultipleSizes(title, baseFilename) {
  const sizes = [
    { width: 800, height: 600, suffix: 'hero' },
    { width: 400, height: 250, suffix: 'featured' },
    { width: 300, height: 200, suffix: 'thumbnail' }
  ];
  
  const results = [];
  
  for (const size of sizes) {
    try {
      let url = generateImageUrl(title, size.width, size.height);
      const filename = `${baseFilename}-${size.suffix}.jpg`;
      
      try {
        const savedPath = await downloadImage(url, filename);
        results.push({ size: size.suffix, path: savedPath });
        console.log(`✅ Generated ${size.suffix} image successfully`);
      } catch (primaryError) {
        console.log(`⚠️  Primary source failed for ${size.suffix}, trying fallback...`);
        
        // Try fallback URL
        url = generateFallbackUrl(size.width, size.height);
        try {
          const savedPath = await downloadImage(url, filename);
          results.push({ size: size.suffix, path: savedPath });
          console.log(`✅ Generated ${size.suffix} image using fallback`);
        } catch (fallbackError) {
          console.error(`❌ Failed to generate ${size.suffix} image:`, fallbackError.message);
        }
      }
    } catch (error) {
      console.error(`❌ Failed to generate ${size.suffix} image:`, error.message);
    }
  }
  
  return results;
}

/**
 * Main CLI function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🎨 AI Image Generation CLI Tool
`);
    console.log('Usage:');
    console.log('  node scripts/generateImages.js "Blog Title" [output-filename]');
    console.log('  node scripts/generateImages.js "React Hooks Complete Guide"');
    console.log('  node scripts/generateImages.js "Web Hosting Guide" hosting-guide');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/generateImages.js "Choosing Right Web Hosting"');
    console.log('  node scripts/generateImages.js "React Development Tutorial"');
    console.log('  node scripts/generateImages.js "Domain Management Best Practices"');
    console.log('');
    process.exit(0);
  }
  
  const title = args[0];
  const customFilename = args[1];
  
  console.log(`\n🎨 Generating images for: "${title}"\n`);
  
  try {
    // Ensure output directory exists
    ensureOutputDirectory();
    
    // Generate filename
    const baseFilename = customFilename || generateFilename(title).replace('.jpg', '');
    
    // Generate multiple sizes
    const results = await generateMultipleSizes(title, baseFilename);
    
    if (results.length > 0) {
      console.log('\n✅ Image generation completed!');
      console.log('\nGenerated files:');
      results.forEach(result => {
        console.log(`  📁 ${result.size}: ${result.path}`);
      });
      
      console.log('\n📝 Usage in your blog post:');
      console.log(`heroImage: '../../assets/generated/${baseFilename}-hero.jpg'`);
      console.log('');
      console.log('💡 Tip: You can now use these images in your blog posts by updating the frontmatter.');
    } else {
      console.log('❌ No images were generated successfully.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error generating images:', error.message);
    process.exit(1);
  }
}

// Run the CLI tool
if (import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.includes(process.argv[1].replace(/\\/g, '/'))) {
  main();
}

export {
  generateImageUrl,
  downloadImage,
  extractKeywords,
  generateFilename
};