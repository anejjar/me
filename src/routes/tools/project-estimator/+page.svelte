<script lang="ts">
	import ToolLayout from '$lib/components/ToolLayout.svelte';
	import ToolResultCta from '$lib/components/ToolResultCta.svelte';
	import { budgetFor, trackToolUse } from '$lib/utils/leadDraft';
	import { money } from '$lib/utils/currency';
	import {
		dayRate,
		designOptions,
		features,
		projectTypes,
		rangeHigh,
		rangeLow,
		urgencyOptions,
		type ProjectTypeId
	} from '$lib/tools/estimatorPricing';

	let typeId: ProjectTypeId = 'website';
	let units = projectTypes[0].defaultUnits;
	let selected: string[] = [];
	let designId = 'template';
	let urgencyId = 'normal';
	let touched = false;

	$: type = projectTypes.find((t) => t.id === typeId)!;
	$: design = designOptions.find((d) => d.id === designId)!;
	$: urgency = urgencyOptions.find((u) => u.id === urgencyId)!;
	$: chosen = features.filter((f) => selected.includes(f.id));

	$: baseDays = type.baseDays + units * type.daysPerUnit;
	$: workDays = (baseDays + chosen.reduce((sum, f) => sum + f.days, 0)) * design.multiplier;
	$: total = workDays * dayRate * urgency.multiplier;
	$: low = Math.round((total * rangeLow) / 500) * 500;
	$: high = Math.round((total * rangeHigh) / 500) * 500;
	// 5 working days a week; rush means longer days / parallel work
	$: weeksLow = Math.max(1, Math.ceil(workDays / 5 / (urgencyId === 'rush' ? 1.3 : 1)));
	$: weeksHigh = Math.max(weeksLow + 1, Math.ceil(weeksLow * 1.5));

	$: groups = [...new Set(features.map((f) => f.group))];

	function selectType(id: ProjectTypeId) {
		typeId = id;
		units = projectTypes.find((t) => t.id === id)!.defaultUnits;
		touch();
	}

	function toggle(id: string) {
		selected = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
		touch();
	}

	function touch() {
		touched = true;
		trackToolUse('project-estimator');
	}

	function draft() {
		return {
			source: 'project-estimator',
			projectType: type.service,
			budget: budgetFor((low + high) / 2),
			message: [
				`Estimate from the project cost estimator:`,
				`• Project: ${type.label} — ${units} ${type.unitLabel}`,
				`• Features: ${chosen.length ? chosen.map((f) => f.label).join(', ') : 'none selected'}`,
				`• Design: ${design.label}`,
				`• Timeline: ${urgency.label}`,
				`• Estimate: ${money(low)} – ${money(high)}, ${weeksLow}–${weeksHigh} weeks`,
				``,
				`About my project: `
			].join('\n')
		};
	}
</script>

<svelte:head>
	<title>Free project cost estimator - ANEJJAR Elhoucine</title>
	<meta name="description" content="How much does a website, online store or web app cost? Get an instant price range and timeline for your project — free." />
	<meta property="og:title" content="Free project cost estimator" />
	<meta property="og:description" content="Get an instant price range and timeline for your website, store or web app." />
	<meta property="og:url" content="https://anejjar.com/tools/project-estimator" />
	<link rel="canonical" href="https://anejjar.com/tools/project-estimator" />
</svelte:head>

<ToolLayout
	title="Project cost estimator"
	intro="Answer four quick questions and get a realistic price range and timeline for your website, store or web app."
>
	<svelte:fragment slot="inputs">
		<fieldset class="card p-6">
			<legend class="sr-only">Project type</legend>
			<h2 class="text-lg font-semibold mb-4"><span class="text-accent mr-2">1.</span>What are you building?</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{#each projectTypes as t}
					<button
						type="button"
						on:click={() => selectType(t.id)}
						aria-pressed={typeId === t.id}
						class="text-left p-4 rounded-xl border transition-colors {typeId === t.id
							? 'border-accent bg-accent-muted'
							: 'border-bg-100 hover:border-text-100'}"
					>
						<span class="block font-medium text-white">{t.label}</span>
						<span class="block text-sm text-text-50">{t.hint}</span>
					</button>
				{/each}
			</div>
		</fieldset>

		<div class="card p-6">
			<h2 class="text-lg font-semibold mb-4">
				<span class="text-accent mr-2">2.</span>How many {type.unitLabel}?
			</h2>
			<div class="flex items-center gap-4">
				<input
					type="range"
					min="1"
					max="40"
					bind:value={units}
					on:input={touch}
					class="flex-1 accent-[#34d399]"
					aria-label="Number of {type.unitLabel}"
				/>
				<span class="w-20 text-right font-display text-2xl font-bold text-white">{units}</span>
			</div>
		</div>

		<fieldset class="card p-6">
			<legend class="sr-only">Features</legend>
			<h2 class="text-lg font-semibold mb-4"><span class="text-accent mr-2">3.</span>Which features do you need?</h2>
			<div class="space-y-5">
				{#each groups as group}
					<div>
						<h3 class="font-sans text-xs font-semibold uppercase tracking-wider text-text-100 mb-2">{group}</h3>
						<div class="flex flex-wrap gap-2">
							{#each features.filter((f) => f.group === group) as f}
								<button
									type="button"
									on:click={() => toggle(f.id)}
									aria-pressed={selected.includes(f.id)}
									class="px-3 py-1.5 rounded-full border text-sm transition-colors {selected.includes(f.id)
										? 'border-accent bg-accent-muted text-white'
										: 'border-bg-100 text-text-50 hover:text-white hover:border-text-100'}"
								>
									{selected.includes(f.id) ? '✓ ' : '+ '}{f.label}
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</fieldset>

		<div class="card p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
			<div>
				<h2 class="text-lg font-semibold mb-4"><span class="text-accent mr-2">4.</span>Design</h2>
				<div class="space-y-2">
					{#each designOptions as d}
						<label class="flex items-center gap-3 cursor-pointer text-text">
							<input type="radio" bind:group={designId} value={d.id} on:change={touch} class="accent-[#34d399]" />
							{d.label}
						</label>
					{/each}
				</div>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-4">Timeline</h2>
				<div class="space-y-2">
					{#each urgencyOptions as u}
						<label class="flex items-center gap-3 cursor-pointer text-text">
							<input type="radio" bind:group={urgencyId} value={u.id} on:change={touch} class="accent-[#34d399]" />
							{u.label}
						</label>
					{/each}
				</div>
			</div>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="result">
		<div class="card p-6" aria-live="polite">
			<p class="text-sm text-text-50 mb-1">Estimated investment</p>
			<p class="font-display text-4xl font-bold text-white mb-1">{money(low)} – {money(high)}</p>
			<p class="text-text-50 mb-6">
				Around <span class="text-white font-medium">{weeksLow}–{weeksHigh} weeks</span> to launch
				<span class="text-text-100">· ~{Math.round(workDays)} working days</span>
			</p>

			<dl class="space-y-2 text-sm border-t border-bg-100 pt-4">
				<div class="flex justify-between gap-4">
					<dt class="text-text-50">{type.label} ({units} {type.unitLabel})</dt>
					<dd class="text-text">{money(baseDays * dayRate)}</dd>
				</div>
				{#each chosen as f}
					<div class="flex justify-between gap-4">
						<dt class="text-text-50">{f.label}</dt>
						<dd class="text-text">{money(f.days * dayRate)}</dd>
					</div>
				{/each}
				{#if design.multiplier !== 1}
					<div class="flex justify-between gap-4">
						<dt class="text-text-50">{design.label}</dt>
						<dd class="text-text">+{Math.round((design.multiplier - 1) * 100)}%</dd>
					</div>
				{/if}
				{#if urgency.multiplier !== 1}
					<div class="flex justify-between gap-4">
						<dt class="text-text-50">Rush delivery</dt>
						<dd class="text-text">+{Math.round((urgency.multiplier - 1) * 100)}%</dd>
					</div>
				{/if}
			</dl>
		</div>

		<ToolResultCta
			{draft}
			title={touched ? 'Get an exact quote' : 'Want an exact quote?'}
			text="Send me this estimate and I'll reply within 24 hours with a fixed-price proposal."
		/>
	</svelte:fragment>

	<svelte:fragment slot="disclaimer">
		This is a ballpark estimate based on typical Moroccan freelance rates, to help you plan. Your final fixed price depends on the exact scope, which we agree on
		together before any work starts.
	</svelte:fragment>
</ToolLayout>
