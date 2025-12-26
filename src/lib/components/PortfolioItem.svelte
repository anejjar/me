<script lang="ts">
	export let project: {
		title: string;
		description: string;
		url: string;
		technologies?: string[];
	};
</script>

<article class="border border-bg-50 rounded-lg p-6 hover:border-white transition-colors group">
	<a href={project.url} target="_blank" rel="noopener noreferrer" class="block">
		<h3 class="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
			{project.title}
			<span class="inline-block ml-2 text-text-100 group-hover:text-white transition-colors">→</span>
		</h3>
		<p class="text-text-50 mb-4">
			{project.description}
		</p>
		{#if project.technologies && project.technologies.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each project.technologies as tech}
					<span class="px-2 py-1 bg-bg-50 rounded text-xs text-text-50">
						{tech}
					</span>
				{/each}
			</div>
		{/if}
	</a>
</article>

