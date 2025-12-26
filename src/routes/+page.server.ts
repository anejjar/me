import { getBlogPosts } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getBlogPosts();
	
	return {
		posts: posts.slice(0, 5) // Only load recent 5 for home page
	};
};

