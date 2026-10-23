<script lang="ts">
	import { site } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
	import CopyEmail from './CopyEmail.svelte';

	export let title = 'Have a project in mind?';
	export let subtitle = "Tell me what you're building. I'll reply within 24 hours with next steps — no obligation.";
</script>

<section class="relative overflow-hidden card px-6 py-12 md:px-16 md:py-16 text-center" use:reveal>
	<div
		class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] max-w-none rounded-full bg-accent/10 blur-3xl"
		aria-hidden="true"
	></div>
	<div class="relative">
		<h2 class="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
		<p class="text-lg text-text-50 max-w-xl mx-auto mb-8">{subtitle}</p>
		<div class="flex flex-col sm:flex-row gap-3 justify-center mb-6">
			<a href="/contact" class="btn-primary">Start a project <span aria-hidden="true">→</span></a>
			<a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" class="btn-secondary">Book a 15-min call</a>
		</div>
		<CopyEmail />
	</div>
</section>
