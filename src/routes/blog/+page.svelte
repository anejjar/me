<script lang="ts">
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import TagFilter from '$lib/components/TagFilter.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/types';
	
	export let data: PageData;
	const allPosts = data.posts;
	
	let selectedTag: string | null = null;
	let searchQuery = '';
	
	$: filteredPosts = allPosts.filter((post) => {
		// Filter by tag
		if (selectedTag && !post.tags?.includes(selectedTag)) {
			return false;
		}
		
		// Filter by search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			const matchesTitle = post.title.toLowerCase().includes(query);
			const matchesDescription = post.description.toLowerCase().includes(query);
			const matchesContent = post.content.toLowerCase().includes(query);
			const matchesTags = post.tags?.some((tag) => tag.toLowerCase().includes(query));
			
			if (!matchesTitle && !matchesDescription && !matchesContent && !matchesTags) {
				return false;
			}
		}
		
		return true;
	});
	
	$: allTags = allPosts
		.flatMap((post) => post.tags || [])
		.filter((tag): tag is string => Boolean(tag));
	
	function handleTagChange(event: CustomEvent<string | null>) {
		selectedTag = event.detail;
	}
</script>

<svelte:head>
	<title>Blog - ANEJJAR Elhoucine</title>
	<meta name="description" content="Read articles and thoughts from ANEJJAR Elhoucine on development, design, and technology." />
	<meta property="og:title" content="Blog - ANEJJAR Elhoucine" />
	<meta property="og:description" content="Read articles and thoughts from ANEJJAR Elhoucine on development, design, and technology." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://anejjar.com/blog" />
	<link rel="canonical" href="https://anejjar.com/blog" />
</svelte:head>

<div class="container-custom py-12 md:py-16">
	<h1 class="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
	
	{#if allPosts.length === 0}
		<div class="text-center py-12">
			<p class="text-lg text-text-50">No blog posts yet. Check back soon!</p>
		</div>
	{:else}
		<div class="max-w-3xl">
			<SearchBar bind:searchQuery />
			<TagFilter tags={allTags} selectedTag={selectedTag} on:change={handleTagChange} />
			
			{#if filteredPosts.length === 0}
				<div class="text-center py-12">
					<p class="text-lg text-text-50">
						{searchQuery || selectedTag
							? 'No posts found matching your criteria.'
							: 'No posts found.'}
					</p>
				</div>
			{:else}
				<div class="mb-4 text-text-50 text-sm">
					Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
				</div>
				{#each filteredPosts as post}
					<BlogPostCard {post} />
				{/each}
			{/if}
		</div>
	{/if}
</div>

