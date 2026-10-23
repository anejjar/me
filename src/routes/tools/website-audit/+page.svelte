<script lang="ts">
	import ToolLayout from '$lib/components/ToolLayout.svelte';
	import ToolResultCta from '$lib/components/ToolResultCta.svelte';
	import ScoreRing from '$lib/components/ScoreRing.svelte';
	import { site } from '$lib/config';
	import { auditCopy } from '$lib/tools/auditCopy';
	import { trackToolUse } from '$lib/utils/leadDraft';

	type Issue = { id: string; title: string; why: string; detail?: string; score: number };
	type Report = {
		url: string;
		scores: { label: string; score: number }[];
		vitals: { label: string; value: string; score: number }[];
		issues: Issue[];
	};

	const categories = [
		{ id: 'performance', label: 'Performance' },
		{ id: 'seo', label: 'SEO' },
		{ id: 'accessibility', label: 'Accessibility' },
		{ id: 'best-practices', label: 'Best practices' }
	];
	const vitalIds = [
		{ id: 'largest-contentful-paint', label: 'Largest paint (LCP)' },
		{ id: 'total-blocking-time', label: 'Blocking time (TBT)' },
		{ id: 'cumulative-layout-shift', label: 'Layout shift (CLS)' }
	];
	const loadingMessages = [
		'Loading your site on a simulated phone…',
		'Measuring how fast content appears…',
		'Checking SEO and accessibility…',
		'Almost there — preparing your report…'
	];

	let input = '';
	let status: 'idle' | 'loading' | 'done' | 'error' = 'idle';
	let error = '';
	let report: Report | null = null;
	let loadingStep = 0;
	let lastUrl = '';

	function normalise(value: string): string | null {
		const trimmed = value.trim();
		if (!trimmed) return null;
		try {
			const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
			return url.hostname.includes('.') ? url.toString() : null;
		} catch {
			return null;
		}
	}

	async function runAudit() {
		const url = normalise(input);
		if (!url) {
			status = 'error';
			error = 'Please enter a valid website address, like example.com';
			return;
		}

		status = 'loading';
		lastUrl = url;
		loadingStep = 0;
		trackToolUse('website-audit');
		const ticker = setInterval(() => (loadingStep = Math.min(loadingStep + 1, loadingMessages.length - 1)), 6000);

		const params = new URLSearchParams({ url, strategy: 'mobile' });
		categories.forEach((c) => params.append('category', c.id));
		if (site.pageSpeedApiKey) params.set('key', site.pageSpeedApiKey);

		try {
			const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(
					response.status === 429
						? 'The automatic audit has hit its limit for today.'
						: "We couldn't load that site. Check the address and make sure it's publicly reachable."
				);
			}
			report = parse(url, data.lighthouseResult);
			status = 'done';
		} catch (err) {
			status = 'error';
			error = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
		} finally {
			clearInterval(ticker);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function parse(url: string, lh: any): Report {
		const scores = categories.map((c) => ({ label: c.label, score: Math.round((lh.categories[c.id]?.score ?? 0) * 100) }));
		const vitals = vitalIds.map((v) => ({
			label: v.label,
			value: lh.audits[v.id]?.displayValue ?? '—',
			score: lh.audits[v.id]?.score ?? 0
		}));
		const issues: Issue[] = Object.entries(lh.audits as Record<string, any>)
			.filter(([, a]) => typeof a.score === 'number' && a.score < 0.9 && ['binary', 'numeric', 'metricSavings'].includes(a.scoreDisplayMode))
			.map(([id, a]) => ({
				id,
				title: auditCopy[id]?.title ?? a.title,
				why: auditCopy[id]?.why ?? '',
				detail: a.displayValue,
				score: a.score
			}))
			// explained issues first, then worst score
			.sort((a, b) => Number(!!auditCopy[b.id]) - Number(!!auditCopy[a.id]) || a.score - b.score)
			.slice(0, 5);
		return { url, scores, vitals, issues };
	}

	function manualDraft() {
		return {
			source: 'website-audit',
			projectType: 'WordPress & e-commerce',
			message: `Please audit my website: ${lastUrl}

What I'd like to improve: `
		};
	}

	function draft() {
		const r = report!;
		return {
			source: 'website-audit',
			projectType: 'WordPress & e-commerce',
			message: [
				`Website audit for ${r.url} (mobile):`,
				`• Scores: ${r.scores.map((s) => `${s.label} ${s.score}`).join(', ')}`,
				`• Top issues: ${r.issues.map((i) => i.title).join('; ') || 'none'}`,
				``,
				`I'd like help fixing these. About my site: `
			].join('\n')
		};
	}
</script>

<svelte:head>
	<title>Free website speed & SEO audit - ANEJJAR Elhoucine</title>
	<meta name="description" content="Test your website's speed, SEO and accessibility for free. Get scores and plain-English fixes in 30 seconds." />
	<meta property="og:title" content="Free website speed & SEO audit" />
	<meta property="og:description" content="Test your website's speed, SEO and accessibility and get plain-English fixes." />
	<meta property="og:url" content="https://anejjar.com/tools/website-audit" />
	<link rel="canonical" href="https://anejjar.com/tools/website-audit" />
</svelte:head>

<ToolLayout
	title="Website speed & SEO audit"
	intro="Slow sites lose visitors and rank lower on Google. Enter your address to see your scores and what to fix first — tested on a mobile phone, like most of your visitors."
>
	<svelte:fragment slot="inputs">
		<form class="card p-6" on:submit|preventDefault={runAudit} novalidate>
			<label for="audit-url" class="label">Your website</label>
			<div class="flex flex-col sm:flex-row gap-3">
				<input
					id="audit-url"
					type="url"
					inputmode="url"
					autocomplete="url"
					placeholder="yourbusiness.com"
					bind:value={input}
					class="input flex-1"
					disabled={status === 'loading'}
				/>
				<button type="submit" class="btn-primary" disabled={status === 'loading'}>
					{status === 'loading' ? 'Analysing…' : 'Run free audit'}
				</button>
			</div>
			{#if status === 'error'}
				<p class="mt-3 text-sm text-red-400" role="alert">{error}</p>
			{/if}
		</form>

		{#if status === 'loading'}
			<div class="card p-8 text-center" role="status">
				<svg class="w-8 h-8 mx-auto mb-4 animate-spin text-accent" fill="none" viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
					<path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
				</svg>
				<p class="text-white font-medium">{loadingMessages[loadingStep]}</p>
				<p class="text-sm text-text-100 mt-1">This usually takes 15–30 seconds.</p>
			</div>
		{/if}

		{#if status === 'done' && report}
			<div class="card p-6">
				<h2 class="text-lg font-semibold mb-6">Scores for <span class="text-accent break-all">{new URL(report.url).hostname}</span></h2>
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
					{#each report.scores as s}
						<ScoreRing score={s.score} label={s.label} />
					{/each}
				</div>
			</div>

			<div class="card p-6">
				<h2 class="text-lg font-semibold mb-4">Core Web Vitals</h2>
				<dl class="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{#each report.vitals as v}
						<div class="rounded-xl border border-bg-100 p-4">
							<dt class="text-xs text-text-50 mb-1">{v.label}</dt>
							<dd class="font-display text-xl font-bold {v.score >= 0.9 ? 'text-accent' : v.score >= 0.5 ? 'text-amber-400' : 'text-red-400'}">
								{v.value}
							</dd>
						</div>
					{/each}
				</dl>
			</div>

			<div class="card p-6">
				<h2 class="text-lg font-semibold mb-4">What to fix first</h2>
				{#if report.issues.length === 0}
					<p class="text-text-50">No major issues found — nice work!</p>
				{:else}
					<ol class="space-y-4">
						{#each report.issues as issue, i}
							<li class="flex gap-4">
								<span class="grid place-items-center w-7 h-7 shrink-0 rounded-full bg-bg-100 text-sm font-semibold text-white">{i + 1}</span>
								<div>
									<p class="font-medium text-white">
										{issue.title}
										{#if issue.detail}<span class="ml-1 text-sm font-normal text-text-100">({issue.detail})</span>{/if}
									</p>
									{#if issue.why}<p class="text-sm text-text-50">{issue.why}</p>{/if}
								</div>
							</li>
						{/each}
					</ol>
				{/if}
			</div>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="result">
		{#if status === 'done' && report}
			<ToolResultCta
				{draft}
				title="Want me to fix these?"
				text="Send me this report and I'll reply within 24 hours with what I'd fix, how long it takes and what it costs."
			/>
		{:else if status === 'error' && lastUrl}
			<ToolResultCta
				draft={manualDraft}
				title="I'll audit it for you"
				text="Send me your URL and I'll personally review your site's speed and SEO, then reply within 24 hours."
			/>
		{:else}
			<div class="card p-6">
				<h2 class="text-lg font-semibold mb-3">Why it matters</h2>
				<ul class="space-y-3 text-sm text-text-50">
					<li class="flex gap-2"><span class="text-accent" aria-hidden="true">●</span> 53% of mobile visitors leave a site that takes over 3 seconds to load.</li>
					<li class="flex gap-2"><span class="text-accent" aria-hidden="true">●</span> Page speed and Core Web Vitals are Google ranking factors.</li>
					<li class="flex gap-2"><span class="text-accent" aria-hidden="true">●</span> Faster stores convert more visitors into customers.</li>
				</ul>
			</div>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="disclaimer">
		Powered by Google PageSpeed Insights (mobile test). Scores can vary slightly between runs.
	</svelte:fragment>
</ToolLayout>
