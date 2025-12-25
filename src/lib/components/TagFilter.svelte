<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	export let tags: string[] = [];
	export let selectedTag: string | null = null;
	
	const dispatch = createEventDispatcher<{ change: string | null }>();
	
	$: uniqueTags = [...new Set(tags)].sort();
	
	function toggleTag(tag: string) {
		const newValue = selectedTag === tag ? null : tag;
		dispatch('change', newValue);
	}
	
	function selectAll() {
		dispatch('change', null);
	}
</script>

{#if uniqueTags.length > 0}
	<div class="mb-8">
		<h3 class="text-sm font-medium text-text-50 mb-4">Filter by tag:</h3>
		<div class="flex flex-wrap gap-2">
			<button
				on:click={selectAll}
				class="px-3 py-1 rounded-md text-sm transition-colors {selectedTag === null ? 'bg-white text-bg font-medium' : 'bg-bg-50 text-text hover:bg-bg-100'}"
			>
				All
			</button>
			{#each uniqueTags as tag}
				<button
					on:click={() => toggleTag(tag)}
					class="px-3 py-1 rounded-md text-sm transition-colors {selectedTag === tag ? 'bg-white text-bg font-medium' : 'bg-bg-50 text-text hover:bg-bg-100'}"
				>
					{tag}
				</button>
			{/each}
		</div>
	</div>
{/if}

