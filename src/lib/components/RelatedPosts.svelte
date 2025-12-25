<script lang="ts">
	import type { BlogPost } from '../types';
	import BlogPostCard from './BlogPostCard.svelte';
	
	export let posts: BlogPost[];
	export let currentSlug: string;
	export let limit = 3;
	
	$: relatedPosts = posts
		.filter((post) => post.slug !== currentSlug)
		.slice(0, limit);
</script>

{#if relatedPosts.length > 0}
	<section class="mt-12 pt-8 border-t border-bg-50">
		<h2 class="text-2xl font-semibold mb-6">Related Posts</h2>
		<div class="space-y-6">
			{#each relatedPosts as post}
				<BlogPostCard {post} />
			{/each}
		</div>
	</section>
{/if}

