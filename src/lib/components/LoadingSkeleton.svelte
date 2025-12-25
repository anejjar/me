<script lang="ts">
	export let count = 3;
</script>

<div class="space-y-6">
	{#each Array(count) as _, i}
		<div class="animate-pulse">
			<div class="h-6 bg-bg-50 rounded w-3/4 mb-3"></div>
			<div class="h-4 bg-bg-50 rounded w-full mb-2"></div>
			<div class="h-4 bg-bg-50 rounded w-5/6 mb-4"></div>
			<div class="h-3 bg-bg-50 rounded w-1/4"></div>
		</div>
	{/each}
</div>

