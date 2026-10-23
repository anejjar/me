<script lang="ts">
	import type { Project } from '$lib/config';

	export let project: Project;
</script>

<article class="card card-hover overflow-hidden group h-full flex flex-col">
	<div class="relative h-40 bg-gradient-to-br {project.gradient} border-b border-bg-100 overflow-hidden">
		<div
			class="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
			aria-hidden="true"
		></div>
		<span
			class="absolute bottom-4 left-6 font-display text-5xl font-bold text-white/90 transition-transform duration-300 group-hover:-translate-y-1"
			aria-hidden="true"
		>
			{project.title.charAt(0)}
		</span>
	</div>

	<div class="p-6 flex flex-col flex-1">
		<h3 class="text-xl font-semibold mb-2">{project.title}</h3>
		<p class="text-text-50 leading-relaxed mb-5">{project.description}</p>

		<div class="flex flex-wrap gap-2 mb-6">
			{#each project.technologies as tech}
				<span class="chip text-xs">{tech}</span>
			{/each}
		</div>

		<div class="mt-auto flex items-center gap-5 text-sm font-medium">
			<a
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1 text-white hover:text-accent transition-colors"
			>
				Visit site <span aria-hidden="true">↗</span>
			</a>
			{#if project.caseStudy}
				<a href={project.caseStudy} class="inline-flex items-center gap-1 text-text-50 hover:text-accent transition-colors">
					Read case study <span aria-hidden="true">→</span>
				</a>
			{/if}
		</div>
	</div>
</article>
