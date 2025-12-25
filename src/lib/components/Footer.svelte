<script lang="ts">
	const socialLinks = [
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/anejjar/',
			icon: 'linkedin'
		},
		{
			name: 'Twitter/X',
			url: 'https://x.com/anejjarlhoucine',
			icon: 'twitter'
		}
	];
</script>

<footer class="border-t border-bg-50 mt-auto">
	<div class="container-custom py-8">
		<div class="flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-text-100 text-sm">
				© {new Date().getFullYear()} ANEJJAR Elhoucine
			</p>
			
			<div class="flex items-center gap-6">
				{#each socialLinks as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-text-50 hover:text-white transition-colors text-sm"
						aria-label={link.name}
					>
						{link.name}
					</a>
				{/each}
				<a
					href="mailto:anejjarelhoucine@gmail.com"
					class="text-text-50 hover:text-white transition-colors text-sm"
				>
					Email
				</a>
			</div>
		</div>
	</div>
</footer>

