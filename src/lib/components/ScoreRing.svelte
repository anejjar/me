<script lang="ts">
	export let score: number; // 0–100
	export let label: string;

	const r = 34;
	const circumference = 2 * Math.PI * r;

	$: color = score >= 90 ? 'text-accent' : score >= 50 ? 'text-amber-400' : 'text-red-400';
	$: offset = circumference * (1 - score / 100);
</script>

<div class="flex flex-col items-center text-center">
	<div class="relative w-20 h-20 {color}">
		<svg viewBox="0 0 80 80" class="w-full h-full -rotate-90" aria-hidden="true">
			<circle cx="40" cy="40" {r} fill="none" stroke="currentColor" stroke-width="6" class="opacity-15" />
			<circle
				cx="40"
				cy="40"
				{r}
				fill="none"
				stroke="currentColor"
				stroke-width="6"
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={offset}
				class="transition-[stroke-dashoffset] duration-700"
			/>
		</svg>
		<span class="absolute inset-0 grid place-items-center font-display text-xl font-bold" aria-hidden="true">{score}</span>
	</div>
	<span class="mt-2 text-xs text-text-50" aria-hidden="true">{label}</span>
	<span class="sr-only">{label} score: {score} out of 100</span>
</div>
