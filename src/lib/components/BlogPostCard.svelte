<script lang="ts">
	import type { BlogPost } from '../types';
	
	export let post: BlogPost;
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}
</script>

<article class="border-b border-bg-50 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
	<a href="/blog/{post.slug}" class="block group">
		<h2 class="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
			{post.title}
		</h2>
		{#if post.description}
			<p class="text-text-50 mb-3 line-clamp-2">
				{post.description}
			</p>
		{/if}
		<div class="flex items-center gap-4 flex-wrap">
			<time class="text-text-100 text-sm">
				{formatDate(post.date)}
			</time>
			{#if post.readingTime}
				<span class="text-text-100 text-sm">• {post.readingTime} min read</span>
			{/if}
			{#if post.tags && post.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each post.tags.slice(0, 3) as tag}
						<span class="px-2 py-0.5 bg-bg-50 rounded text-xs text-text-50">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</a>
</article>

