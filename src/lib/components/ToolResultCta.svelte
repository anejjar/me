<script lang="ts">
	import { site } from '$lib/config';
	import { sendToContact, type LeadDraft } from '$lib/utils/leadDraft';

	export let draft: () => LeadDraft;
	export let title = 'Want this built?';
	export let text = "Send me this result and I'll reply within 24 hours with a concrete plan.";
</script>

<div class="card p-6 border-accent/30 bg-gradient-to-b from-accent/10 to-transparent">
	<h2 class="text-lg font-semibold mb-1">{title}</h2>
	<p class="text-sm text-text-50 mb-5">{text}</p>
	<div class="flex flex-col gap-3">
		<button type="button" class="btn-primary w-full" on:click={() => sendToContact(draft())}>
			Send me this result <span aria-hidden="true">→</span>
		</button>
		<a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" class="btn-secondary w-full">Book a 15-min call</a>
	</div>
</div>
