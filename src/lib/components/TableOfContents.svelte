<script lang="ts">
	import { onMount } from 'svelte';
	
	export let html: string;
	
	let headings: Array<{ id: string; text: string; level: number }> = [];
	let activeId = '';
	
	onMount(() => {
		// Parse HTML to extract headings
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
		
		headings = Array.from(headingElements).map((heading, index) => {
			const level = parseInt(heading.tagName.charAt(1));
			const text = heading.textContent || '';
			const id = heading.id || `heading-${index}`;
			
			// Add ID to heading if it doesn't have one
			if (!heading.id) {
				heading.id = id;
			}
			
			return { id, text, level };
		});
		
		// Update active heading on scroll
		const handleScroll = () => {
			const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
			let current = '';
			
			headingElements.forEach((heading) => {
				const rect = heading.getBoundingClientRect();
				if (rect.top <= 100) {
					current = heading.id;
				}
			});
			
			activeId = current;
		};
		
		window.addEventListener('scroll', handleScroll);
		handleScroll();
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
	
	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (element) {
			const offset = 100;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;
			
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}
</script>

{#if headings.length > 0}
	<aside class="mb-8 p-6 bg-bg-50 rounded-lg">
		<h3 class="text-lg font-semibold mb-4">Table of Contents</h3>
		<nav aria-label="Table of contents">
			<ul class="space-y-2">
				{#each headings as heading}
					<li>
						<a
							href="#{heading.id}"
							on:click|preventDefault={() => scrollToHeading(heading.id)}
							class="block text-sm text-text-50 hover:text-white transition-colors {activeId === heading.id ? 'text-white font-medium' : ''}"
							style="padding-left: {(heading.level - 1) * 1}rem"
						>
							{heading.text}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
{/if}

