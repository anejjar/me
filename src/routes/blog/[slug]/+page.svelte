<script lang="ts">
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/types';
	import SocialShare from '$lib/components/SocialShare.svelte';
	import RelatedPosts from '$lib/components/RelatedPosts.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	
	export let data: PageData;
	const post: BlogPost = data.post;
	const relatedPosts = data.relatedPosts || [];
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}
</script>

<svelte:head>
	<title>{post.title} - ANEJJAR Elhoucine</title>
	<meta name="description" content={post.description || post.title} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description || ''} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://anejjar.com/blog/${post.slug}`} />
	<meta property="article:published_time" content={post.date} />
	<meta name="twitter:card" content="summary" />
	<link rel="canonical" href={`https://anejjar.com/blog/${post.slug}`} />
</svelte:head>

<div class="container-custom py-12 md:py-16">
	<article class="max-w-3xl">
		<header class="mb-8">
			<a href="/blog" class="text-text-50 hover:text-white transition-colors mb-6 inline-block">
				← Back to blog
			</a>
			<h1 class="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
			{#if post.date}
				<time class="text-text-100 text-sm">
					{formatDate(post.date)}
				</time>
			{/if}
		</header>
		
		<TableOfContents html={post.html} />
		
		<div class="prose prose-invert prose-lg max-w-none">
			{@html post.html}
		</div>
		
		<SocialShare title={post.title} url={`/blog/${post.slug}`} />
		
		<RelatedPosts posts={relatedPosts} currentSlug={post.slug} />
	</article>
</div>

<style>
	:global(.prose) {
		@apply text-text;
	}
	
	:global(.prose h1),
	:global(.prose h2),
	:global(.prose h3),
	:global(.prose h4) {
		@apply text-white;
	}
	
	:global(.prose a) {
		@apply text-text hover:text-white transition-colors;
	}
	
	:global(.prose code) {
		@apply bg-bg-50 px-1.5 py-0.5 rounded text-sm;
	}
	
	:global(.prose pre) {
		@apply bg-bg-50 rounded-lg p-4 overflow-x-auto;
	}
	
	:global(.prose pre code) {
		@apply bg-transparent p-0;
	}
</style>

