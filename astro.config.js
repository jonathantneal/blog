import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import remarkDirective from 'remark-directive'
import remarkDirectives from './remark-directives.js'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
	site: 'https://jonneal.dev',
	base: '/blog/',
	trailingSlash: 'always',
	markdown: {
		remarkPlugins: [
			remarkDirectives()
		],
		syntaxHighlight: 'prism'
	},
	integrations: [mdx(), sitemap()],
})
