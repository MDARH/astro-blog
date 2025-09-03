import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog collection for articles and posts
 */
const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

/**
 * Site content collection for global site data (hero, newsletter, footer)
 */
const site = defineCollection({
	loader: glob({ base: './src/content/site', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		primaryButton: z.object({
			text: z.string(),
			link: z.string(),
		}).optional(),
		secondaryButton: z.object({
			text: z.string(),
			link: z.string(),
		}).optional(),
		image: z.string().optional(),
		buttonText: z.string().optional(),
		sections: z.array(z.object({
			title: z.string(),
			links: z.array(z.object({
				text: z.string(),
				url: z.string(),
			})),
		})).optional(),
	}),
});

/**
 * Categories collection for content categorization
 */
const categories = defineCollection({
	loader: glob({ base: './src/content/categories', pattern: '**/*.md' }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		icon: z.string(),
		link: z.string(),
		order: z.number(),
	}),
});

/**
 * Ads collection for advertisement management
 */
const ads = defineCollection({
	loader: glob({ base: './src/content/ads', pattern: '**/*.md' }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		image: z.string(),
		link: z.string(),
		type: z.enum(['banner', 'horizontal', 'square']),
		position: z.enum(['sidebar', 'content', 'footer']),
		order: z.number(),
		active: z.boolean(),
	}),
});

export const collections = { blog, site, categories, ads };
