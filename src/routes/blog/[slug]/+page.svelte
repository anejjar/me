<script lang="ts">
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/types';
	import SocialShare from '$lib/components/SocialShare.svelte';
	import RelatedPosts from '$lib/components/RelatedPosts.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import CtaBanner from '$lib/components/CtaBanner.svelte';
	
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

<div class="container-custom py-16 md:py-24">
	<article class="max-w-3xl mx-auto">
		<header class="mb-8">
			<a href="/blog" class="text-sm text-text-50 hover:text-accent transition-colors mb-8 inline-block">
				← Back to blog
			</a>
			<h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
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
		
		<div class="mt-12">
			<CtaBanner title="Need something like this built?" />
		</div>

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
		@apply text-accent no-underline hover:underline underline-offset-4 transition-colors;
	}
	
	:global(.prose code) {
		@apply bg-bg-100 px-1.5 py-0.5 rounded text-sm font-normal before:content-none after:content-none;
	}
	
	:global(.prose pre) {
		@apply bg-bg-50 border border-bg-100 rounded-xl p-4 overflow-x-auto;
	}
	
	:global(.prose pre code) {
		@apply bg-transparent p-0;
	}
</style>

