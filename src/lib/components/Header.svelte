<script lang="ts">
	import { page } from '$app/stores';
	import MobileMenu from './MobileMenu.svelte';
	
	let mobileMenuOpen = false;
	
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];
	
	$: currentPath = $page.url?.pathname || '';
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<header class="border-b border-bg-50">
	<nav class="container-custom py-6">
		<div class="flex items-center justify-between">
			<a href="/" class="text-xl font-semibold hover:text-white transition-colors">
				ANEJJAR
			</a>
			
			<!-- Desktop Navigation -->
			<ul class="hidden md:flex items-center gap-6">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							class="text-text-50 hover:text-white transition-colors {currentPath === item.href ? 'text-white font-medium' : ''}"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
			
			<!-- Mobile Menu Button -->
			<button
				on:click={toggleMobileMenu}
				class="md:hidden text-text-50 hover:text-white transition-colors"
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
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
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</nav>
	
	<!-- Mobile Menu Component -->
	<MobileMenu open={mobileMenuOpen} on:close={() => mobileMenuOpen = false} />
</header>

