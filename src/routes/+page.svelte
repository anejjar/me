<script lang="ts">
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import PortfolioItem from '$lib/components/PortfolioItem.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';
	import CtaBanner from '$lib/components/CtaBanner.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { processSteps, projects, services, site, skills, tools } from '$lib/config';
	import type { PageData } from './$types';

	export let data: PageData;
	const posts = data.posts;

	const stack = ['Laravel', 'React', 'WordPress', 'n8n', 'AI', 'Docker'];
</script>

<svelte:head>
	<title>ANEJJAR Elhoucine - Freelance Full-Stack Developer</title>
	<meta name="description" content="Freelance full-stack developer building web apps, e-commerce stores, n8n automations, API integrations, AI features and deployments. Available for new projects." />
	<meta property="og:title" content="ANEJJAR Elhoucine - Freelance Full-Stack Developer" />
	<meta property="og:description" content="I build fast, reliable web products for your business. Laravel, React, WordPress, AI & Docker." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://anejjar.com" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@anejjarlhoucine" />
	<link rel="canonical" href="https://anejjar.com" />
</svelte:head>

<StructuredData />

<!-- Hero -->
<section class="relative overflow-hidden">
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] max-w-none rounded-full bg-accent/10 blur-3xl"></div>
		<div class="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"></div>
	</div>

	<div class="container-custom relative pt-16 pb-20 md:pt-28 md:pb-32">
		<a
			href="/contact"
			class="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-accent/30 bg-accent-muted text-sm text-accent hover:border-accent/60 transition-colors"
		>
			<span class="relative flex w-2 h-2">
				<span class="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping motion-reduce:animate-none"></span>
				<span class="relative inline-flex w-2 h-2 rounded-full bg-accent"></span>
			</span>
			Available for new projects
		</a>

		<h1 class="text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl font-bold max-w-4xl mb-6">
			I build fast, reliable web products
			<span class="text-text-100">for your business.</span>
		</h1>

		<p class="text-lg md:text-xl text-text-50 leading-relaxed max-w-2xl mb-10">
			Hi, I'm {site.name} — a freelance full-stack developer. From MVPs and online stores to automations, API integrations and AI,
			I take your idea from first call to production.
		</p>

		<div class="flex flex-col sm:flex-row gap-3 mb-12">
			<a href="/contact" class="btn-primary text-base px-6 py-3.5">Start a project <span aria-hidden="true">→</span></a>
			<a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" class="btn-secondary text-base px-6 py-3.5">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
				</svg>
				Book a 15-min call
			</a>
		</div>

		<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-100">
			<span>Working with</span>
			{#each stack as tech}
				<span class="text-text-50 font-medium">{tech}</span>
			{/each}
		</div>
	</div>
</section>

<!-- Services -->
<section id="services" class="section border-t border-bg-100">
	<div class="container-custom">
		<div class="mb-12 md:mb-16" use:reveal>
			<span class="eyebrow">Services</span>
			<h2 class="section-title">How I can help</h2>
			<p class="section-subtitle">End-to-end development for founders, agencies and small businesses — one developer, no hand-offs.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
			{#each services as service, i}
				<div class="h-full" use:reveal={i * 80}><ServiceCard {service} /></div>
			{/each}
		</div>
	</div>
</section>

<!-- Work -->
<section id="work" class="section border-t border-bg-100">
	<div class="container-custom">
		<div class="mb-12 md:mb-16" use:reveal>
			<span class="eyebrow">Selected work</span>
			<h2 class="section-title">Products I've shipped</h2>
			<p class="section-subtitle">Real products, live in production and used by real people.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each projects as project, i}
				<div class="h-full" use:reveal={i * 80}><PortfolioItem {project} /></div>
			{/each}
		</div>
	</div>
</section>

<!-- Free tools -->
<section id="tools" class="section border-t border-bg-100">
	<div class="container-custom">
		<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16" use:reveal>
			<div>
				<span class="eyebrow">Free tools</span>
				<h2 class="section-title">Get answers before you hire</h2>
				<p class="section-subtitle">Estimate your project, audit your site and see what automation or AI would cost you — free.</p>
			</div>
			<a href="/tools" class="text-sm font-medium text-text-50 hover:text-accent transition-colors shrink-0">All tools →</a>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each tools.slice(0, 3) as tool, i}
				<div class="h-full" use:reveal={i * 80}><ToolCard {tool} /></div>
			{/each}
		</div>
	</div>
</section>

<!-- Process -->
<section class="section border-t border-bg-100">
	<div class="container-custom">
		<div class="mb-12 md:mb-16" use:reveal>
			<span class="eyebrow">Process</span>
			<h2 class="section-title">Simple, transparent, predictable</h2>
			<p class="section-subtitle">You always know what's being built, when it ships and what it costs.</p>
		</div>
		<ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
			{#each processSteps as step, i}
				<li class="card p-6" use:reveal={i * 80}>
					<span class="block font-display text-sm font-semibold text-accent mb-4">0{i + 1}</span>
					<h3 class="text-lg font-semibold mb-2">{step.title}</h3>
					<p class="text-sm text-text-50 leading-relaxed">{step.description}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- Stack -->
<section class="section border-t border-bg-100">
	<div class="container-custom grid grid-cols-1 lg:grid-cols-3 gap-10">
		<div use:reveal>
			<span class="eyebrow">Tech stack</span>
			<h2 class="section-title">Tools I trust</h2>
			<p class="section-subtitle">Proven, well-supported technology — so your product is easy to maintain long after launch.</p>
		</div>
		<div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8" use:reveal={100}>
			{#each Object.entries(skills) as [group, items]}
				<div>
					<h3 class="font-sans text-xs font-semibold uppercase tracking-wider text-text-100 mb-3">{group}</h3>
					<div class="flex flex-wrap gap-2">
						{#each items as item}
							<span class="chip">{item}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Articles -->
{#if posts.length > 0}
	<section class="section border-t border-bg-100">
		<div class="container-custom">
			<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12" use:reveal>
				<div>
					<span class="eyebrow">Writing</span>
					<h2 class="section-title mb-0">Latest articles</h2>
				</div>
				<a href="/blog" class="text-sm font-medium text-text-50 hover:text-accent transition-colors">View all articles →</a>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
				{#each posts.slice(0, 3) as post, i}
					<div class="h-full" use:reveal={i * 80}><BlogPostCard {post} /></div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Final CTA -->
<div class="container-custom pb-20 md:pb-28">
	<CtaBanner />
</div>
