<script lang="ts">
	import ToolLayout from '$lib/components/ToolLayout.svelte';
	import ToolResultCta from '$lib/components/ToolResultCta.svelte';
	import { aiModels, pricesUpdated, TOKENS_PER_WORD, useCases } from '$lib/tools/aiPrices';
	import { trackToolUse } from '$lib/utils/leadDraft';
	import { money, USD_TO_MAD } from '$lib/utils/currency';

	let useCaseId = useCases[0].id;
	let users = 500;
	let requestsPerUser = useCases[0].requestsPerUser;
	let inputWords = useCases[0].inputWords;
	let outputWords = useCases[0].outputWords;

	$: useCase = useCases.find((u) => u.id === useCaseId)!;
	$: requests = users * requestsPerUser;
	$: inputTokens = inputWords * TOKENS_PER_WORD;
	$: outputTokens = outputWords * TOKENS_PER_WORD;
	$: costs = aiModels
		.map((m) => ({ ...m, monthly: ((requests * (inputTokens * m.inputPerM + outputTokens * m.outputPerM)) / 1e6) * USD_TO_MAD }))
		.sort((a, b) => a.monthly - b.monthly);
	$: maxCost = Math.max(...costs.map((c) => c.monthly), 0.01);
	$: balanced = costs.filter((c) => c.tier === 'Balanced').sort((a, b) => a.monthly - b.monthly)[0];

	function pickUseCase(id: string) {
		useCaseId = id;
		const u = useCases.find((x) => x.id === id)!;
		requestsPerUser = u.requestsPerUser;
		inputWords = u.inputWords;
		outputWords = u.outputWords;
		trackToolUse('ai-cost-calculator');
	}

	const fmt = (n: number) => (n < 10 ? money(n, 2) : money(n));

	function draft() {
		return {
			source: 'ai-cost-calculator',
			projectType: 'AI integrations',
			message: [
				`AI feature cost estimate:`,
				`• Use case: ${useCase.label}`,
				`• ${users.toLocaleString()} users × ${requestsPerUser} requests/month = ${requests.toLocaleString()} requests`,
				`• ~${inputWords} words in / ${outputWords} words out per request`,
				`• Cheapest: ${costs[0].name} ${fmt(costs[0].monthly)}/mo · Balanced: ${balanced.name} ${fmt(balanced.monthly)}/mo`,
				``,
				`I'd like to add this to my product: `
			].join('\n')
		};
	}
</script>

<svelte:head>
	<title>Free AI API cost calculator (Claude, OpenAI, Gemini) - ANEJJAR Elhoucine</title>
	<meta name="description" content="How much does it cost to add AI to your app? Compare monthly API costs across Claude, OpenAI and Gemini models for your usage." />
	<meta property="og:title" content="Free AI feature cost calculator" />
	<meta property="og:description" content="Compare the monthly API cost of Claude, OpenAI and Gemini for your AI feature." />
	<meta property="og:url" content="https://anejjar.com/tools/ai-cost-calculator" />
	<link rel="canonical" href="https://anejjar.com/tools/ai-cost-calculator" />
</svelte:head>

<ToolLayout
	title="AI feature cost calculator"
	intro="Thinking about adding AI to your product? See what it would cost per month on today's leading models — usually far less than you'd expect."
>
	<svelte:fragment slot="inputs">
		<fieldset class="card p-6">
			<legend class="sr-only">Use case</legend>
			<h2 class="text-lg font-semibold mb-4"><span class="text-accent mr-2">1.</span>What should the AI do?</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{#each useCases as u}
					<button
						type="button"
						on:click={() => pickUseCase(u.id)}
						aria-pressed={useCaseId === u.id}
						class="text-left p-4 rounded-xl border transition-colors {useCaseId === u.id ? 'border-accent bg-accent-muted' : 'border-bg-100 hover:border-text-100'}"
					>
						<span class="block font-medium text-white">{u.label}</span>
						<span class="block text-sm text-text-50">{u.build}</span>
					</button>
				{/each}
			</div>
		</fieldset>

		<div class="card p-6 grid grid-cols-1 sm:grid-cols-2 gap-5" on:input={() => trackToolUse('ai-cost-calculator')}>
			<h2 class="sm:col-span-2 text-lg font-semibold"><span class="text-accent mr-2">2.</span>Your usage</h2>
			<div>
				<label for="users" class="label">Monthly active users</label>
				<input id="users" type="number" min="1" step="50" bind:value={users} class="input" />
			</div>
			<div>
				<label for="rpu" class="label">AI requests per user / month</label>
				<input id="rpu" type="number" min="1" bind:value={requestsPerUser} class="input" />
			</div>
			<div>
				<label for="in-words" class="label">Words sent per request <span class="text-text-100">(prompt + context)</span></label>
				<input id="in-words" type="number" min="10" max="20000" step="50" bind:value={inputWords} class="input" />
			</div>
			<div>
				<label for="out-words" class="label">Words in each AI reply</label>
				<input id="out-words" type="number" min="10" max="5000" step="10" bind:value={outputWords} class="input" />
			</div>
		</div>

		<div class="card p-6">
			<h2 class="text-lg font-semibold mb-1">Monthly cost by model</h2>
			<p class="text-sm text-text-50 mb-5">{requests.toLocaleString()} requests / month</p>
			<ul class="space-y-3">
				{#each costs as c, i}
					<li>
						<div class="flex items-baseline justify-between gap-4 text-sm mb-1">
							<span class="text-white">
								{c.name}
								<span class="text-text-100">· {c.tier}</span>
								{#if i === 0}<span class="ml-1 text-xs font-semibold text-accent">Cheapest</span>{/if}
							</span>
							<span class="font-medium text-white tabular-nums">{fmt(c.monthly)}</span>
						</div>
						<div class="h-2 rounded-full bg-bg-100 overflow-hidden">
							<div class="h-full rounded-full {i === 0 ? 'bg-accent' : 'bg-text-100'} transition-all duration-500" style="width: {Math.max(1.5, (c.monthly / maxCost) * 100)}%"></div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="result">
		<div class="card p-6" aria-live="polite">
			<p class="text-sm text-text-50 mb-1">With a balanced model ({balanced.name})</p>
			<p class="font-display text-4xl font-bold text-white mb-1">{fmt(balanced.monthly)}<span class="text-lg text-text-50"> /month</span></p>
			<p class="text-text-50 mb-4">
				That's <span class="text-white font-medium">{money(balanced.monthly / Math.max(users, 1), 2)}</span> per user.
			</p>
			<p class="text-sm text-text-50 border-t border-bg-100 pt-4">
				Fastest/cheapest option: <span class="text-accent font-medium">{costs[0].name} at {fmt(costs[0].monthly)}/mo</span>. Caching and
				smart model routing can cut costs further.
			</p>
		</div>
		<ToolResultCta
			{draft}
			title="Add AI to your product"
			text="Send me this estimate and I'll suggest the right model, architecture and a fixed price to build it."
		/>
	</svelte:fragment>

	<svelte:fragment slot="disclaimer">
		Based on public USD list prices per 1M tokens as of {pricesUpdated}, converted at ~{USD_TO_MAD} DH per dollar (standard rates, no caching or batch discounts),
		at ~{TOKENS_PER_WORD} tokens per word. Real costs depend on your prompts and traffic.
	</svelte:fragment>
</ToolLayout>
