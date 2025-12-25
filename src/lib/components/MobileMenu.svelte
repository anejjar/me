<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	
	export let open = false;
	
	const dispatch = createEventDispatcher();
	
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];
	
	$: currentPath = $page.url?.pathname || '';
	
	function closeMenu() {
		dispatch('close');
	}
	
	function handleLinkClick() {
		closeMenu();
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
		class="fixed inset-0 bg-bg/80 backdrop-blur-sm z-40 md:hidden"
		on:click={closeMenu}
		on:keydown={handleOverlayKeydown}
		role="button"
		tabindex="0"
		aria-label="Close menu"
	></div>
{/if}

<!-- Mobile Menu -->
<nav
	class="fixed top-0 right-0 h-full w-64 bg-bg border-l border-bg-50 z-50 transform transition-transform duration-300 ease-in-out md:hidden {open ? 'translate-x-0' : 'translate-x-full'}"
	aria-label="Mobile navigation"
>
	<div class="flex flex-col h-full">
		<!-- Close Button -->
		<div class="flex justify-end p-6 border-b border-bg-50">
			<button
				on:click={closeMenu}
				class="text-text-50 hover:text-white transition-colors"
				aria-label="Close menu"
			>
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
		
		<!-- Menu Items -->
		<ul class="flex flex-col p-6 space-y-4">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						on:click={handleLinkClick}
						class="block py-2 text-lg transition-colors {currentPath === item.href ? 'text-white font-medium' : 'text-text-50 hover:text-white'}"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

