<script lang="ts">
	export let title: string;
	export let intro: string;
</script>

<div class="container-custom py-16 md:py-24">
	<a href="/tools" class="text-sm text-text-50 hover:text-accent transition-colors mb-8 inline-block">← All free tools</a>
	<header class="max-w-3xl mb-12">
		<span class="eyebrow">Free tool</span>
		<h1 class="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
		<p class="text-lg text-text-50 leading-relaxed">{intro}</p>
	</header>

	<div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
		<div class="lg:col-span-3 space-y-6">
			<slot name="inputs" />
		</div>
		<div class="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
			<slot name="result" />
		</div>
	</div>

	{#if $$slots.disclaimer}
		<p class="mt-12 max-w-3xl text-sm text-text-100 leading-relaxed">
			<slot name="disclaimer" />
		</p>
	{/if}
</div>
