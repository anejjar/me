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
		<h1 class="text-6xl md:text-8xl font-bold mb-4 text-white">{status}</h1>
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
				class="btn bg-white text-bg hover:bg-text-50 transition-colors px-6 py-3 rounded-md font-medium"
			>
				Go Home
			</a>
			<button
				on:click={() => window.history.back()}
				class="btn border border-bg-50 text-text hover:bg-bg-50 transition-colors px-6 py-3 rounded-md font-medium"
			>
				Go Back
			</button>
		</div>
	</div>
</div>

