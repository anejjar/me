<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { navItems, site } from '$lib/config';

	export let open = false;

	const dispatch = createEventDispatcher();

	$: currentPath = $page.url?.pathname || '';

	function closeMenu() {
		dispatch('close');
	}

	function handleOverlayKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeMenu();
		}
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			closeMenu();
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('keydown', handleEscape);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleEscape);
		}
	});
</script>

<!-- Mobile Menu Overlay -->
{#if open}
	<div
		class="fixed inset-0 bg-bg/80 backdrop-blur-sm z-40 lg:hidden"
		on:click={closeMenu}
		on:keydown={handleOverlayKeydown}
		role="button"
		tabindex="0"
		aria-label="Close menu"
	></div>
{/if}

<!-- Mobile Menu -->
<nav
	class="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-bg-50 border-l border-bg-100 z-50 transform transition-transform duration-300 ease-in-out lg:hidden {open
		? 'translate-x-0'
		: 'translate-x-full'}"
	aria-label="Mobile navigation"
	inert={!open}
>
	<div class="flex flex-col h-full">
		<div class="flex items-center justify-between h-16 px-6 border-b border-bg-100">
			<span class="flex items-center gap-2 font-display font-bold text-white">
				<span class="block w-8 h-8 p-0.5 rounded-lg bg-accent">
					<img src="/avatar.png" alt="" width="28" height="28" class="w-full h-full rounded-md object-cover" />
				</span>
				{site.shortName}
			</span>
			<button on:click={closeMenu} class="p-2 -mr-2 text-text-50 hover:text-white transition-colors" aria-label="Close menu">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<ul class="flex flex-col p-6 gap-1">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						on:click={closeMenu}
						class="block py-3 text-lg transition-colors {currentPath === item.href
							? 'text-white font-medium'
							: 'text-text-50 hover:text-white'}"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="mt-auto p-6 space-y-3 border-t border-bg-100">
			<a href="/contact" on:click={closeMenu} class="btn-primary w-full">Start a project</a>
			<a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" class="btn-secondary w-full">
				Book a 15-min call
			</a>
		</div>
	</div>
</nav>
