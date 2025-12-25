<script lang="ts">
	import '../lib/styles/app.css';
	import 'highlight.js/styles/github-dark.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<a href="#main-content" class="skip-to-content">Skip to content</a>

<div class="min-h-screen flex flex-col">
	<Header />
	<main id="main-content" class="flex-grow">
		<slot />
	</main>
	<Footer />
</div>

