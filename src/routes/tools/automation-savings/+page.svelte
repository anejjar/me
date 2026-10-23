<script lang="ts">
	import ToolLayout from '$lib/components/ToolLayout.svelte';
	import ToolResultCta from '$lib/components/ToolResultCta.svelte';
	import { buildCost, defaultHourlyCost, monthlyRunningCost, taskPresets, type Complexity } from '$lib/tools/automationPricing';
	import { budgetFor, trackToolUse } from '$lib/utils/leadDraft';
	import { money } from '$lib/utils/currency';

	type Task = { key: number; label: string; minutes: number; runsPerWeek: number; complexity: Complexity; flow?: string };

	let nextKey = 0;
	let tasks: Task[] = [];
	let hourlyCost = defaultHourlyCost;

	$: perTask = tasks.map((t) => ({ ...t, hoursPerMonth: (t.minutes * t.runsPerWeek * 52) / 12 / 60 }));
	$: hoursPerMonth = perTask.reduce((sum, t) => sum + t.hoursPerMonth, 0);
	$: yearlySaving = hoursPerMonth * 12 * hourlyCost - monthlyRunningCost * 12;
	$: setupCost = tasks.reduce((sum, t) => sum + buildCost[t.complexity], 0);
	$: paybackMonths = yearlySaving > 0 ? setupCost / (yearlySaving / 12) : Infinity;

	function addPreset(id: string) {
		const p = taskPresets.find((x) => x.id === id)!;
		if (tasks.some((t) => t.label === p.label)) return;
		tasks = [...tasks, { key: nextKey++, label: p.label, minutes: p.minutes, runsPerWeek: p.runsPerWeek, complexity: p.complexity, flow: p.flow }];
		trackToolUse('automation-savings');
	}

	function addCustom() {
		tasks = [...tasks, { key: nextKey++, label: 'My task', minutes: 10, runsPerWeek: 5, complexity: 'medium' }];
		trackToolUse('automation-savings');
	}

	function remove(key: number) {
		tasks = tasks.filter((t) => t.key !== key);
	}

	const hours = (n: number) => `${Math.round(n).toLocaleString()} h`;

	function draft() {
		return {
			source: 'automation-savings',
			projectType: 'Automations (n8n)',
			budget: budgetFor(setupCost),
			message: [
				`Automation savings estimate:`,
				...perTask.map((t) => `• ${t.label}: ${t.minutes} min × ${t.runsPerWeek}/week (~${hours(t.hoursPerMonth)}/month)`),
				`• Total: ~${hours(hoursPerMonth)}/month saved, ~${money(yearlySaving)}/year at ${money(hourlyCost)}/hour`,
				``,
				`Tools I currently use: `
			].join('\n')
		};
	}
</script>

<svelte:head>
	<title>Free automation savings calculator (n8n) - ANEJJAR Elhoucine</title>
	<meta name="description" content="How much time and money would automating your repetitive tasks save? Calculate your hours saved, yearly savings and payback period." />
	<meta property="og:title" content="Free automation savings calculator" />
	<meta property="og:description" content="Calculate the hours and money you'd save by automating repetitive work with n8n." />
	<meta property="og:url" content="https://anejjar.com/tools/automation-savings" />
	<link rel="canonical" href="https://anejjar.com/tools/automation-savings" />
</svelte:head>

<ToolLayout
	title="Automation savings calculator"
	intro="Add the repetitive tasks you or your team do every week and see how much time and money automating them would save."
>
	<svelte:fragment slot="inputs">
		<div class="card p-6">
			<h2 class="text-lg font-semibold mb-4"><span class="text-accent mr-2">1.</span>Add your repetitive tasks</h2>
			<div class="flex flex-wrap gap-2">
				{#each taskPresets as p}
					{@const added = tasks.some((t) => t.label === p.label)}
					<button
						type="button"
						on:click={() => addPreset(p.id)}
						disabled={added}
						class="px-3 py-1.5 rounded-full border text-sm transition-colors {added
							? 'border-accent bg-accent-muted text-white'
							: 'border-bg-100 text-text-50 hover:text-white hover:border-text-100'}"
					>
						{added ? '✓' : '+'} {p.label}
					</button>
				{/each}
				<button type="button" on:click={addCustom} class="px-3 py-1.5 rounded-full border border-dashed border-text-100 text-sm text-text-50 hover:text-white transition-colors">
					+ Custom task
				</button>
			</div>
		</div>

		{#if tasks.length === 0}
			<div class="card p-8 text-center text-text-50">Pick a task above to get started.</div>
		{/if}

		{#each tasks as task (task.key)}
			<div class="card p-6" on:input={() => trackToolUse('automation-savings')}>
				<div class="flex items-start justify-between gap-4 mb-4">
					<input
						type="text"
						bind:value={task.label}
						aria-label="Task name"
						class="bg-transparent font-display text-lg font-semibold text-white border-b border-transparent hover:border-bg-200 focus:border-accent focus:outline-none w-full"
					/>
					<button type="button" on:click={() => remove(task.key)} class="p-1 text-text-100 hover:text-red-400 transition-colors" aria-label="Remove {task.label}">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div>
						<label for="min-{task.key}" class="label">Minutes each time</label>
						<input id="min-{task.key}" type="number" min="1" bind:value={task.minutes} class="input" />
					</div>
					<div>
						<label for="runs-{task.key}" class="label">Times per week</label>
						<input id="runs-{task.key}" type="number" min="1" bind:value={task.runsPerWeek} class="input" />
					</div>
					<div>
						<label for="cx-{task.key}" class="label">Complexity</label>
						<select id="cx-{task.key}" bind:value={task.complexity} class="input">
							<option value="simple">Simple</option>
							<option value="medium">Medium</option>
							<option value="complex">Complex</option>
						</select>
					</div>
				</div>
				{#if task.flow}
					<p class="mt-4 text-sm text-text-50">
						<span class="text-accent font-medium">Example flow:</span> {task.flow}
					</p>
				{/if}
			</div>
		{/each}

		{#if tasks.length > 0}
			<div class="card p-6">
				<label for="hourly" class="label">Hourly cost of the person doing this (DH)</label>
				<input id="hourly" type="number" min="1" bind:value={hourlyCost} class="input max-w-[12rem]" aria-describedby="hourly-hint" />
				<p id="hourly-hint" class="mt-2 text-sm text-text-100">
					Salary + employer charges ÷ hours worked. An office employee in Morocco typically costs 35–60 DH/hour (SMIG is 17.92 DH/hour).
				</p>
			</div>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="result">
		<div class="card p-6" aria-live="polite">
			<p class="text-sm text-text-50 mb-1">Time saved</p>
			<p class="font-display text-4xl font-bold text-white mb-1">{hours(hoursPerMonth)}<span class="text-lg text-text-50"> /month</span></p>
			<p class="text-text-50 mb-6">That's {hours(hoursPerMonth * 12)} a year — about {Math.round((hoursPerMonth * 12) / 8)} working days.</p>
			<dl class="space-y-2 text-sm border-t border-bg-100 pt-4">
				<div class="flex justify-between gap-4">
					<dt class="text-text-50">Money saved per year</dt>
					<dd class="font-medium text-accent">{money(Math.max(0, yearlySaving))}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-text-50">Estimated one-off build</dt>
					<dd class="text-text">{money(setupCost)}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-text-50">Running cost (self-hosted n8n)</dt>
					<dd class="text-text">~{money(monthlyRunningCost)}/month</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-text-50">Pays for itself in</dt>
					<dd class="font-medium text-white">
						{tasks.length === 0 ? '—' : paybackMonths === Infinity ? 'n/a' : paybackMonths < 1 ? 'under a month' : `${Math.ceil(paybackMonths)} months`}
					</dd>
				</div>
			</dl>
		</div>
		{#if tasks.length > 0}
			<ToolResultCta
				{draft}
				title="Let's automate this"
				text="Send me these tasks and I'll map out the workflows and a fixed price within 24 hours."
			/>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="disclaimer">
		Estimates assume the automation fully replaces the manual work. Build costs are typical ranges; the final price depends
		on the tools involved.
	</svelte:fragment>
</ToolLayout>
