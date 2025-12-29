import { getBlogPosts } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const posts = await getBlogPosts();
		console.log('Blog posts loaded:', posts.length);
		
		// Validate posts before returning
		const validPosts = posts.filter(post => {
			if (!post.slug || !post.title) {
				console.warn('Invalid post found:', post);
				return false;
			}
			return true;
		});
		
		return {
			posts: validPosts
		};
	} catch (error) {
		console.error('Error in blog page load:', error);
		if (error instanceof Error) {
			console.error('Error details:', error.message, error.stack);
		}
		return {
			posts: []
		};
	}
};


