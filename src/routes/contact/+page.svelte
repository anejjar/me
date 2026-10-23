<script lang="ts">
	import InquiryForm from '$lib/components/InquiryForm.svelte';
	import CopyEmail from '$lib/components/CopyEmail.svelte';
	import { site, socials } from '$lib/config';

	const promises = [
		'Reply within 24 hours',
		'Free 15-minute discovery call',
		'Fixed-price proposal, no surprises'
	];
</script>

<svelte:head>
	<title>Start a project - ANEJJAR Elhoucine</title>
	<meta name="description" content="Hire ANEJJAR Elhoucine for your next web app, e-commerce store, AI integration or deployment. Get a reply within 24 hours." />
	<meta property="og:title" content="Start a project - ANEJJAR Elhoucine" />
	<meta property="og:description" content="Hire ANEJJAR Elhoucine for your next web app, e-commerce store, AI integration or deployment." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://anejjar.com/contact" />
	<link rel="canonical" href="https://anejjar.com/contact" />
</svelte:head>

<div class="container-custom py-16 md:py-24">
	<div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
		<div class="lg:col-span-2">
			<span class="eyebrow">Contact</span>
			<h1 class="text-4xl md:text-5xl font-bold mb-6">Let's build something great.</h1>
			<p class="text-lg text-text-50 leading-relaxed mb-8">
				Tell me a bit about your project and I'll get back to you with questions, ideas and a rough estimate.
			</p>

			<ul class="space-y-3 mb-10">
				{#each promises as promise}
					<li class="flex items-center gap-3 text-text">
						<svg class="w-5 h-5 shrink-0 text-accent" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
						</svg>
						{promise}
					</li>
				{/each}
			</ul>

			<div class="card p-6 mb-8">
				<h2 class="text-lg font-semibold mb-2">Prefer to talk first?</h2>
				<p class="text-sm text-text-50 mb-4">Pick a time that suits you — a quick, no-pressure chat.</p>
				<a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" class="btn-secondary w-full">
					Book a 15-min call
				</a>
			</div>

			<div class="space-y-3">
				<CopyEmail />
				<div class="flex gap-5 text-sm">
					{#each socials as link}
						<a href={link.url} target="_blank" rel="noopener noreferrer" class="text-text-50 hover:text-white transition-colors">
							{link.name} ↗
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="lg:col-span-3">
			<InquiryForm />
		</div>
	</div>
</div>
