import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		published: z.string(),
		updated: z.string().optional(),
		image: z.string().optional(),
	}),
})

export const collections = { blog }
