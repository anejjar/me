<script lang="ts">
	import type { Service } from '$lib/config';
	import { icons } from '$lib/icons';

	export let service: Service;
</script>

<article class="card card-hover p-6 md:p-8 h-full flex flex-col">
	<div class="grid place-items-center w-12 h-12 rounded-xl bg-accent-muted text-accent mb-6">
		<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" d={icons[service.icon]} />
		</svg>
	</div>
	<h3 class="text-xl font-semibold mb-3">{service.title}</h3>
	<p class="text-text-50 leading-relaxed mb-6">{service.description}</p>
	<ul class="mt-auto space-y-2">
		{#each service.deliverables as item}
			<li class="flex items-start gap-2 text-sm text-text">
				<svg class="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				</svg>
				{item}
			</li>
		{/each}
	</ul>
</article>
