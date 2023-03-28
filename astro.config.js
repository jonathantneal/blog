import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import remarkDirective from 'remark-directive'
import remarkDirectives from './remark-directives.js'
import remarkCodeBlocks from './remark-codeblocks.js'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
	site: 'https://jonneal.dev',
	base: '/blog/',
	trailingSlash: 'always',
	server: {
		port: 8080,
	},
	markdown: {
		remarkPlugins: [
			remarkDirectives(),
			remarkCodeBlocks(),
		],
		syntaxHighlight: 'prism',
	},
	integrations: [
		mdx(),
		sitemap(),
	],
})
