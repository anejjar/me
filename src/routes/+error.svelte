<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	
	$: status = $page.status || 404;
	$: message = $page.error?.message || 'Page not found';
</script>

<svelte:head>
	<title>{status} - ANEJJAR Elhoucine</title>
</svelte:head>

<div class="container-custom py-12 md:py-16 min-h-[60vh] flex items-center justify-center">
	<div class="text-center max-w-2xl">
		<h1 class="text-7xl md:text-9xl font-bold mb-4 text-accent">{status}</h1>
		<h2 class="text-2xl md:text-3xl font-semibold mb-6">
			{status === 404 ? 'Page Not Found' : 'Something went wrong'}
		</h2>
		<p class="text-lg text-text-50 mb-8">
			{status === 404
				? "The page you're looking for doesn't exist or has been moved."
				: message}
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="/"
				class="btn-primary"
			>
				Go Home
			</a>
			<button
				on:click={() => window.history.back()}
				class="btn-secondary"
			>
				Go Back
			</button>
		</div>
	</div>
</div>

