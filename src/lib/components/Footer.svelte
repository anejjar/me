<script lang="ts">
	import { navItems, site, socials } from '$lib/config';
</script>

<footer class="border-t border-bg-100 mt-auto">
	<div class="container-custom py-12">
		<div class="flex flex-col md:flex-row md:items-start justify-between gap-10">
			<div class="max-w-sm">
				<a href="/" class="font-display text-lg font-bold text-white">{site.shortName}</a>
				<p class="mt-3 text-sm text-text-50 leading-relaxed">
					Freelance full-stack developer helping businesses ship web products that work.
				</p>
				<a href="/contact" class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
					Let's work together <span aria-hidden="true">→</span>
				</a>
			</div>

			<div class="grid grid-cols-2 gap-10 text-sm">
				<div>
					<h2 class="font-sans text-xs font-semibold uppercase tracking-wider text-text-100 mb-4">Site</h2>
					<ul class="space-y-2">
						{#each navItems as item}
							<li><a href={item.href} class="text-text-50 hover:text-white transition-colors">{item.label}</a></li>
						{/each}
						<li><a href="/contact" class="text-text-50 hover:text-white transition-colors">Contact</a></li>
					</ul>
				</div>
				<div>
					<h2 class="font-sans text-xs font-semibold uppercase tracking-wider text-text-100 mb-4">Connect</h2>
					<ul class="space-y-2">
						{#each socials as link}
							<li>
								<a href={link.url} target="_blank" rel="noopener noreferrer" class="text-text-50 hover:text-white transition-colors">
									{link.name}
								</a>
							</li>
						{/each}
						<li><a href="mailto:{site.email}" class="text-text-50 hover:text-white transition-colors">Email</a></li>
						<li><a href="/rss.xml" class="text-text-50 hover:text-white transition-colors">RSS</a></li>
					</ul>
				</div>
			</div>
		</div>

		<p class="mt-12 pt-6 border-t border-bg-100 text-text-100 text-sm">
			© {new Date().getFullYear()} {site.name}. All rights reserved.
		</p>
	</div>
</footer>
