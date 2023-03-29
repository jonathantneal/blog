import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { SITE_TITLE, SITE_DESCRIPTION } from 'src:consts'
import { posts } from 'src:posts'

type NonNullableObject<T> = {
	readonly [P in keyof T]: Exclude<T[P], null | undefined>
}

export async function get(context: NonNullableObject<APIContext>) {
	return await rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site.href,
		items: posts.map(
			({ slug, data }) => ({
				title: data.title,
				description: data.description,
				pubDate: new Date(data.published),
				link: `/blog/${slug}/`,
			})
		),
	})
}
