<script lang="ts">
	import type { Tool } from '$lib/config';
	import { icons } from '$lib/icons';

	export let tool: Tool;
</script>

<a href="/tools/{tool.slug}" class="card card-hover group flex flex-col h-full p-6">
	<div class="flex items-center justify-between mb-5">
		<span class="grid place-items-center w-11 h-11 rounded-xl bg-accent-muted text-accent">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d={icons[tool.icon]} />
			</svg>
		</span>
		<span class="text-xs font-semibold uppercase tracking-wider text-accent">Free</span>
	</div>
	<h3 class="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{tool.title}</h3>
	<p class="text-sm text-text-50 leading-relaxed mb-5">{tool.description}</p>
	<span class="mt-auto text-sm font-medium text-white group-hover:text-accent transition-colors">
		Try it free <span aria-hidden="true">→</span>
	</span>
</a>
