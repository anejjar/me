<script lang="ts">
	import { onMount } from 'svelte';
	
	export let searchQuery: string = '';
	
	let inputValue = searchQuery;
	let isInitialized = false;
	
	// Sync inputValue with searchQuery on mount
	onMount(() => {
		inputValue = searchQuery;
		isInitialized = true;
	});
	
	// Update searchQuery when inputValue changes (one-way: input -> searchQuery)
	// Only update after component is initialized to avoid initial sync issues
	$: {
		if (isInitialized && inputValue !== undefined) {
			const lowercased = inputValue.toLowerCase();
			if (lowercased !== searchQuery) {
				searchQuery = lowercased;
			}
		}
	}
	
	function clearSearch() {
		inputValue = '';
	}
</script>

<div class="mb-8">
	<label for="blog-search" class="sr-only">Search blog posts</label>
	<div class="relative">
		<input
			id="blog-search"
			type="text"
			placeholder="Search posts..."
			bind:value={inputValue}
			class="w-full px-4 py-3 pl-10 bg-bg-50 border border-bg-100 rounded-md text-text placeholder-text-100 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
		/>
		<svg
			class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-100"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
		{#if inputValue}
			<button
				on:click={clearSearch}
				class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-100 hover:text-white transition-colors"
				aria-label="Clear search"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		{/if}
	</div>
</div>

