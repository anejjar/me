<script lang="ts">
	import { onMount } from 'svelte';
	import { services, site } from '$lib/config';
	import { budgets, loadDraft } from '$lib/utils/leadDraft';

	const projectTypes = [...services.map((s) => s.title), 'Something else'];
	const timelines = ['ASAP', '1 – 3 months', '3+ months', 'Flexible'];

	let projectType = projectTypes[0];
	let budget = budgets[0];
	let message = '';
	let source = 'contact-form';
	let prefilled = false;

	onMount(() => {
		const draft = loadDraft();
		if (!draft) return;
		if (draft.projectType && projectTypes.includes(draft.projectType)) projectType = draft.projectType;
		if (draft.budget && budgets.includes(draft.budget)) budget = draft.budget;
		message = draft.message;
		source = draft.source;
		prefilled = true;
	});

	let status: 'idle' | 'sending' | 'success' | 'error' = 'idle';
	let errorMessage = '';
	let errors: Record<string, string> = {};

	function validate(data: FormData) {
		const next: Record<string, string> = {};
		if (!String(data.get('name') || '').trim()) next.name = 'Please tell me your name.';
		const email = String(data.get('email') || '').trim();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email.';
		if (String(data.get('message') || '').trim().length < 10) next.message = 'A few words about the project, please.';
		return next;
	}

	async function handleSubmit(event: SubmitEvent) {
		const form = event.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		errors = validate(data);
		if (Object.keys(errors).length > 0) {
			(form.querySelector(`[name="${Object.keys(errors)[0]}"]`) as HTMLElement | null)?.focus();
			return;
		}

		status = 'sending';
		data.set('subject', `New project inquiry from ${data.get('name')}`);

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: data
			});
			const result = await response.json();
			if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');

			status = 'success';
			form.reset();
			message = '';
			prefilled = false;
			window.gtag?.('event', 'generate_lead', { project_type: data.get('project_type') });
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong.';
		}
	}
</script>

{#if status === 'success'}
	<div class="card p-8 md:p-10 text-center" role="status">
		<div class="grid place-items-center w-14 h-14 mx-auto mb-6 rounded-full bg-accent-muted text-accent">
			<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
			</svg>
		</div>
		<h2 class="text-2xl font-semibold mb-3">Thanks — message received!</h2>
		<p class="text-text-50 mb-8">I'll get back to you within 24 hours. Want to skip the wait?</p>
		<div class="flex flex-col sm:flex-row gap-3 justify-center">
			<a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" class="btn-primary">Book a 15-min call</a>
			<button type="button" class="btn-secondary" on:click={() => (status = 'idle')}>Send another</button>
		</div>
	</div>
{:else}
	<form
		action="https://api.web3forms.com/submit"
		method="POST"
		class="card p-6 md:p-8 space-y-5"
		novalidate
		on:submit|preventDefault={handleSubmit}
	>
		<input type="hidden" name="access_key" value={site.formAccessKey} />
		<input type="hidden" name="from_name" value="anejjar.com" />
		<input type="hidden" name="source" value={source} />

		{#if prefilled}
			<p class="flex items-center gap-2 text-sm text-accent bg-accent-muted border border-accent/30 rounded-lg px-4 py-3">
				<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				</svg>
				Prefilled from your result — add your name and email, edit anything you like.
			</p>
		{/if}
		<input type="checkbox" name="botcheck" class="hidden" style="display: none" tabindex="-1" autocomplete="off" />

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div>
				<label for="name" class="label">Name</label>
				<input id="name" name="name" type="text" autocomplete="name" class="input" placeholder="Jane Doe"
					aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
				{#if errors.name}<p id="name-error" class="mt-1.5 text-sm text-red-400">{errors.name}</p>{/if}
			</div>
			<div>
				<label for="email" class="label">Email</label>
				<input id="email" name="email" type="email" autocomplete="email" class="input" placeholder="jane@company.com"
					aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
				{#if errors.email}<p id="email-error" class="mt-1.5 text-sm text-red-400">{errors.email}</p>{/if}
			</div>
		</div>

		<fieldset>
			<legend class="label">What do you need?</legend>
			<div class="flex flex-wrap gap-2">
				{#each projectTypes as type}
					<label class="cursor-pointer">
						<input type="radio" name="project_type" value={type} class="peer sr-only" bind:group={projectType} />
						<span class="chip cursor-pointer transition-colors hover:border-text-100 peer-checked:border-accent peer-checked:bg-accent-muted peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
							{type}
						</span>
					</label>
				{/each}
			</div>
		</fieldset>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div>
				<label for="budget" class="label">Budget</label>
				<select id="budget" name="budget" class="input" bind:value={budget}>
					{#each budgets as budget}<option>{budget}</option>{/each}
				</select>
			</div>
			<div>
				<label for="timeline" class="label">Timeline</label>
				<select id="timeline" name="timeline" class="input">
					{#each timelines as timeline}<option>{timeline}</option>{/each}
				</select>
			</div>
		</div>

		<div>
			<label for="message" class="label">Project details</label>
			<textarea id="message" name="message" rows={prefilled ? 9 : 5} class="input resize-y" bind:value={message}
				placeholder="What are you building, who is it for, and what does success look like?"
				aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}></textarea>
			{#if errors.message}<p id="message-error" class="mt-1.5 text-sm text-red-400">{errors.message}</p>{/if}
		</div>

		{#if status === 'error'}
			<p class="text-sm text-red-400" role="alert">
				{errorMessage} Please try again or email me at
				<a href="mailto:{site.email}" class="underline">{site.email}</a>.
			</p>
		{/if}

		<button type="submit" class="btn-primary w-full" disabled={status === 'sending'}>
			{#if status === 'sending'}
				<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
					<path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
				</svg>
				Sending…
			{:else}
				Send inquiry <span aria-hidden="true">→</span>
			{/if}
		</button>
		<p class="text-xs text-text-100 text-center">I reply within 24 hours. Your details stay private.</p>
	</form>
{/if}
