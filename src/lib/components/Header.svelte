<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import MobileMenu from './MobileMenu.svelte';
	import { navItems, site } from '$lib/config';

	let mobileMenuOpen = false;
	let scrolled = false;

	$: currentPath = $page.url?.pathname || '';

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	onMount(() => {
		const onScroll = () => (scrolled = window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="sticky top-0 z-30 transition-colors duration-300 border-b {scrolled
		? 'bg-bg/80 backdrop-blur-md border-bg-100'
		: 'bg-transparent border-transparent'}"
>
	<nav class="container-custom h-16 md:h-20 flex items-center justify-between gap-6" aria-label="Main navigation">
		<a href="/" class="flex items-center gap-2 font-display text-lg font-bold text-white">
			<span class="block w-9 h-9 p-0.5 rounded-lg bg-accent">
				<img src="/avatar.png" alt="" width="32" height="32" class="w-full h-full rounded-md object-cover" />
			</span>
			{site.shortName}
		</a>

		<!-- Desktop Navigation -->
		<ul class="hidden lg:flex items-center gap-8">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="text-sm transition-colors hover:text-white {currentPath === item.href
							? 'text-white font-medium'
							: 'text-text-50'}"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-3">
			<a href="/contact" class="btn-primary btn-sm">
				Hire me
				<span aria-hidden="true">→</span>
			</a>

			<!-- Mobile Menu Button -->
			<button
				on:click={toggleMobileMenu}
				class="lg:hidden p-2 -mr-2 text-text-50 hover:text-white transition-colors"
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16" />
				</svg>
			</button>
		</div>
	</nav>
</header>

<!-- Mobile Menu Component -->
<MobileMenu open={mobileMenuOpen} on:close={() => (mobileMenuOpen = false)} />
