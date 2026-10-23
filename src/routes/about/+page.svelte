<script lang="ts">
	import CtaBanner from '$lib/components/CtaBanner.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { services, skills } from '$lib/config';
</script>

<svelte:head>
	<title>About - ANEJJAR Elhoucine</title>
	<meta name="description" content="Learn more about ANEJJAR Elhoucine - freelance full-stack developer, UX/UI enthusiast, and open-source contributor." />
	<meta property="og:title" content="About - ANEJJAR Elhoucine" />
	<meta property="og:description" content="Learn more about ANEJJAR Elhoucine - freelance full-stack developer, UX/UI enthusiast, and open-source contributor." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://anejjar.com/about" />
	<link rel="canonical" href="https://anejjar.com/about" />
</svelte:head>

<div class="container-custom py-16 md:py-24">
	<header class="max-w-3xl mb-16 md:mb-20">
		<span class="eyebrow">About</span>
		<h1 class="text-4xl md:text-6xl font-bold mb-6">Developer with a designer's eye.</h1>
		<p class="text-xl text-text-50 leading-relaxed">
			I'm ANEJJAR Elhoucine — a front &amp; back end developer with a passion for UX/UI, an open-source lover and a
			life hacker who loves code, meditation and solving human problems.
		</p>
	</header>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
		<section class="lg:col-span-2 space-y-6 text-lg text-text leading-relaxed" use:reveal>
			<h2 class="text-2xl font-semibold">My approach</h2>
			<p>
				My journey in development has been driven by curiosity and a desire to create meaningful solutions. I believe in
				writing clean, maintainable code and building user experiences that truly make a difference.
			</p>
			<p>
				As a freelancer, I work directly with you — no account managers, no hand-offs. I care about the business outcome
				as much as the code: shipping quickly, communicating clearly, and leaving you with something you can grow.
			</p>
			<p>
				I'm always expanding my skill set. Right now I'm diving deeper into <strong class="text-white">Python</strong> and
				<strong class="text-white">Go</strong>, and building with AI.
			</p>
		</section>

		<aside class="card p-6 h-fit" use:reveal={100}>
			<h2 class="text-lg font-semibold mb-4">What I do</h2>
			<ul class="space-y-3">
				{#each services as service}
					<li class="flex items-start gap-2 text-text-50">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true"></span>
						{service.title}
					</li>
				{/each}
				<li class="flex items-start gap-2 text-text-50">
					<span class="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true"></span>
					Open-source contributions
				</li>
			</ul>
		</aside>
	</div>

	<section class="mb-20" use:reveal>
		<h2 class="text-2xl font-semibold mb-8">Technical skills</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
	</section>

	<CtaBanner title="Let's work together" />
</div>
