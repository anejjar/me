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
		<h3 class="font-sans text-xs font-semibold uppercase tracking-wider text-text-100 mb-3">Filter by tag</h3>
		<div class="flex flex-wrap gap-2">
			<button
				on:click={selectAll}
				class="px-3 py-1 rounded-full border text-sm transition-colors {selectedTag === null ? 'bg-accent text-bg font-medium border-accent' : 'bg-bg-50 text-text-50 border-bg-100 hover:text-white hover:border-text-100'}"
			>
				All
			</button>
			{#each uniqueTags as tag}
				<button
					on:click={() => toggleTag(tag)}
					class="px-3 py-1 rounded-full border text-sm transition-colors {selectedTag === tag ? 'bg-accent text-bg font-medium border-accent' : 'bg-bg-50 text-text-50 border-bg-100 hover:text-white hover:border-text-100'}"
				>
					{tag}
				</button>
			{/each}
		</div>
	</div>
{/if}

