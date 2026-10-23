<script lang="ts">
	import ToolCard from '$lib/components/ToolCard.svelte';
	import CtaBanner from '$lib/components/CtaBanner.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { tools } from '$lib/config';
</script>

<svelte:head>
	<title>Free tools - ANEJJAR Elhoucine</title>
	<meta name="description" content="Free tools for founders and small businesses: project cost estimator, website speed & SEO audit, automation savings, AI cost and hosting cost calculators." />
	<meta property="og:title" content="Free tools - ANEJJAR Elhoucine" />
	<meta property="og:description" content="Estimate your project, audit your website and calculate AI, hosting and automation costs — free, no sign-up." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://anejjar.com/tools" />
	<link rel="canonical" href="https://anejjar.com/tools" />
</svelte:head>

<div class="container-custom py-16 md:py-24">
	<header class="max-w-3xl mb-12 md:mb-16">
		<span class="eyebrow">Free tools</span>
		<h1 class="text-4xl md:text-6xl font-bold mb-4">Plan your project with confidence.</h1>
		<p class="text-lg text-text-50 leading-relaxed">
			Free, no sign-up. Get real numbers on cost, speed and savings before you spend a cent.
		</p>
	</header>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
		{#each tools as tool, i}
			<div class="h-full" use:reveal={i * 60}><ToolCard {tool} /></div>
		{/each}
	</div>

	<CtaBanner title="Rather just talk it through?" />
</div>
