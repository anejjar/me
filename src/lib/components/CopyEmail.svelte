<script lang="ts">
	import { site } from '$lib/config';

	let copied = false;
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		try {
			await navigator.clipboard.writeText(site.email);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 2000);
		} catch {
			window.location.href = `mailto:${site.email}`;
		}
	}
</script>

<button
	type="button"
	on:click={copy}
	class="inline-flex items-center gap-2 text-sm text-text-50 hover:text-white transition-colors"
	aria-label="Copy email address"
>
	<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
		{#if copied}
			<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
		{:else}
			<path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
		{/if}
	</svg>
	<span>{copied ? 'Copied!' : site.email}</span>
	<span class="sr-only" aria-live="polite">{copied ? 'Email copied to clipboard' : ''}</span>
</button>
