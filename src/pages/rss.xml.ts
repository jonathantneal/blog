import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from 'src:consts'

export async function get(context) {
	const posts = await getCollection('blog')

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map(({ id, slug, body, collection, data }) => ({
			title: data.title,
			pubDate: new Date(data.published),
			link: `/blog/${slug}/`,
		})),
	})
}