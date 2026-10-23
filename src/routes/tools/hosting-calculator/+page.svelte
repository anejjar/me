<script lang="ts">
	import ToolLayout from '$lib/components/ToolLayout.svelte';
	import ToolResultCta from '$lib/components/ToolResultCta.svelte';
	import { MB_PER_VISIT, pricesUpdated, quote, type AppType } from '$lib/tools/hostingPrices';
	import { trackToolUse } from '$lib/utils/leadDraft';
	import { money, ratesUpdated } from '$lib/utils/currency';

	const visitorSteps = [1_000, 5_000, 10_000, 25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_000_000];
	const appTypes: { id: AppType; label: string; hint: string }[] = [
		{ id: 'static', label: 'Static site', hint: 'Marketing site, landing page, blog' },
		{ id: 'server', label: 'Server app', hint: 'Node, Laravel, Next.js with API' },
		{ id: 'server-db', label: 'App + database', hint: 'SaaS, store, dashboard' }
	];

	let visitorIndex = 4;
	let appType: AppType = 'server-db';
	let storageGb = 5;
	let apps = 1;

	$: visitors = visitorSteps[visitorIndex];
	$: quotes = quote({ visitors, appType, storageGb, apps });
	$: cheapest = quotes[0];
	$: priciest = quotes[quotes.length - 1];
	$: maxCost = Math.max(...quotes.map((q) => q.monthly), 1);
	$: yearlySaving = (priciest.monthly - cheapest.monthly) * 12;

	const fmt = (n: number) => money(n);
	const track = () => trackToolUse('hosting-calculator');

	function draft() {
		return {
			source: 'hosting-calculator',
			projectType: 'DevOps & deployment',
			message: [
				`Hosting cost comparison:`,
				`• ${visitors.toLocaleString()} visitors/month, ${appTypes.find((a) => a.id === appType)!.label}, ${apps} app(s), ${storageGb} GB data`,
				`• Cheapest: ${cheapest.provider} (${cheapest.plan}) ~${fmt(cheapest.monthly)}/mo`,
				`• Most expensive: ${priciest.provider} ~${fmt(priciest.monthly)}/mo`,
				``,
				`I'd like help setting up / migrating my hosting: `
			].join('\n')
		};
	}
</script>

<svelte:head>
	<title>Free hosting cost calculator: Vercel vs Render vs Heroku vs VPS - ANEJJAR Elhoucine</title>
	<meta name="description" content="Compare the monthly cost of hosting your app on Vercel, Netlify, Render, Heroku, AWS Lightsail or your own VPS with Dokploy." />
	<meta property="og:title" content="Free hosting cost calculator" />
	<meta property="og:description" content="Vercel vs Netlify vs Render vs Heroku vs AWS vs a VPS — see what your app would really cost." />
	<meta property="og:url" content="https://anejjar.com/tools/hosting-calculator" />
	<link rel="canonical" href="https://anejjar.com/tools/hosting-calculator" />
</svelte:head>

<ToolLayout
	title="Hosting cost calculator"
	intro="Cloud platforms are easy to start with but can get expensive as you grow. Compare what your app would cost across popular platforms and a self-hosted VPS."
>
	<svelte:fragment slot="inputs">
		<div class="card p-6 space-y-6" on:input={track} on:change={track}>
			<div>
				<div class="flex items-baseline justify-between mb-3">
					<label for="visitors" class="label mb-0">Monthly visitors</label>
					<span class="font-display text-2xl font-bold text-white tabular-nums">{visitors.toLocaleString()}</span>
				</div>
				<input id="visitors" type="range" min="0" max={visitorSteps.length - 1} bind:value={visitorIndex} class="w-full accent-[#34d399]" />
			</div>

			<fieldset>
				<legend class="label">What are you hosting?</legend>
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
					{#each appTypes as t}
						<label class="cursor-pointer">
							<input type="radio" bind:group={appType} value={t.id} class="peer sr-only" />
							<span class="block h-full p-4 rounded-xl border border-bg-100 transition-colors hover:border-text-100 peer-checked:border-accent peer-checked:bg-accent-muted peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
								<span class="block font-medium text-white">{t.label}</span>
								<span class="block text-sm text-text-50">{t.hint}</span>
							</span>
						</label>
					{/each}
				</div>
			</fieldset>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div>
					<label for="apps" class="label">Number of apps</label>
					<input id="apps" type="number" min="1" max="20" bind:value={apps} class="input" />
				</div>
				<div>
					<label for="storage" class="label">Database size (GB)</label>
					<input id="storage" type="number" min="1" max="500" bind:value={storageGb} class="input" disabled={appType !== 'server-db'} />
				</div>
			</div>
		</div>

		<div class="card p-6">
			<h2 class="text-lg font-semibold mb-5">Estimated monthly cost</h2>
			<ul class="space-y-4">
				{#each quotes as q, i}
					<li>
						<div class="flex items-baseline justify-between gap-4 text-sm mb-1">
							<span class="text-white">
								{q.provider}
								{#if i === 0}<span class="ml-1 text-xs font-semibold text-accent">Cheapest</span>{/if}
								<span class="block text-xs text-text-100">{q.plan} · {q.note}</span>
							</span>
							<span class="font-medium text-white tabular-nums">{fmt(q.monthly)}</span>
						</div>
						<div class="h-2 rounded-full bg-bg-100 overflow-hidden">
							<div class="h-full rounded-full {i === 0 ? 'bg-accent' : 'bg-text-100'} transition-all duration-500" style="width: {Math.max(1.5, (q.monthly / maxCost) * 100)}%"></div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="result">
		<div class="card p-6" aria-live="polite">
			<p class="text-sm text-text-50 mb-1">Cheapest option</p>
			<p class="font-display text-4xl font-bold text-white mb-1">{fmt(cheapest.monthly)}<span class="text-lg text-text-50"> /month</span></p>
			<p class="text-text-50 mb-4">{cheapest.provider} · {cheapest.plan}</p>
			{#if yearlySaving > 1}
				<p class="text-sm text-text-50 border-t border-bg-100 pt-4">
					Up to <span class="text-accent font-medium">{money(yearlySaving)}/year</span> less than {priciest.provider}.
				</p>
			{/if}
			{#if cheapest.selfHosted}
				<p class="text-sm text-text-50 mt-3">
					A VPS needs setup and maintenance — that's exactly what I handle. Read
					<a href="/blog/dokploy-contabo-setup" class="text-accent hover:underline">how I self-host with Dokploy</a>.
				</p>
			{/if}
		</div>
		<ToolResultCta
			{draft}
			title="I can set this up for you"
			text="Send me this comparison and I'll recommend the best setup and handle deployment, SSL and backups."
		/>
	</svelte:fragment>

	<svelte:fragment slot="disclaimer">
		Rough estimates from public list prices as of {pricesUpdated}, assuming ~{MB_PER_VISIT} MB transferred per visit and a
		single developer seat. Prices are converted from USD/EUR to dirhams at approximate {ratesUpdated} rates. Render instance and database prices, and Heroku bandwidth,
		are approximate. Real bills depend on your traffic patterns and architecture.
	</svelte:fragment>
</ToolLayout>
