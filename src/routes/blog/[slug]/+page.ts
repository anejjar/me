import { error } from '@sveltejs/kit';
import { getBlogPost, getBlogPosts } from '$lib/utils/blog';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await getBlogPost(params.slug);
	
	if (!post) {
		throw error(404, 'Post not found');
	}
	
	// Get all posts for related posts
	const allPosts = await getBlogPosts();
	
	// Find related posts based on tags
	const relatedPosts = allPosts
		.filter((p) => {
			if (p.slug === post.slug) return false;
			if (!post.tags || post.tags.length === 0) return false;
			if (!p.tags || p.tags.length === 0) return false;
			// Check if posts share any tags
			return post.tags.some((tag) => p.tags?.includes(tag));
		})
		.slice(0, 3);
	
	return {
		post,
		relatedPosts
	};
};

