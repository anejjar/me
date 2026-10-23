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

<article class="mb-4 last:mb-0 h-full">
	<a href="/blog/{post.slug}" class="card card-hover block h-full p-6 group">
		<div class="flex items-center gap-3 flex-wrap text-text-100 text-sm mb-3">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			{#if post.readingTime}
				<span aria-hidden="true">·</span>
				<span>{post.readingTime} min read</span>
			{/if}
		</div>
		<h2 class="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
			{post.title}
		</h2>
		{#if post.description}
			<p class="text-text-50 mb-4 line-clamp-2">
				{post.description}
			</p>
		{/if}
		{#if post.tags && post.tags.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each post.tags.slice(0, 3) as tag}
					<span class="chip text-xs">{tag}</span>
				{/each}
			</div>
		{/if}
	</a>
</article>
