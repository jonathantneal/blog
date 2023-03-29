import type { Post } from 'src:consts'
import { getCollection } from 'astro:content'

export const posts: Post[] = await getCollection('blog').then(
	collection => collection.sort(
		// sort posts from newest to oldest
		(postA: Post, postB: Post) => Number(
			new Date(postB.data.published)
		) - Number(
			new Date(postA.data.published)
		)
	).filter(
		// filter posts by those up to the current year
		(post: Post) => Boolean(
			new Date(post.data.published).getFullYear() <= new Date().getFullYear()
		)
	)
)

export default posts
