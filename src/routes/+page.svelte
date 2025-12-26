<script lang="ts">
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import PortfolioItem from '$lib/components/PortfolioItem.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
	const posts = data.posts;
	
	const skills = {
		languages: ['PHP', 'JavaScript', 'Python', 'Go'],
		frameworks: ['Laravel', 'React', 'Vue.js', 'WordPress'],
		tools: [
			'CSS3', 'HTML5', 'TypeScript', 'TailwindCSS', 'Bootstrap',
			'Node.js', 'Express.js', 'Next.js', 'Vite', 'Redux',
			'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite',
			'Docker', 'Postman', 'JWT', 'NPM', 'Netlify'
		]
	};
	
	const projects = [
		{
			title: 'AI Tales',
			description: 'An AI-powered platform that creates personalized bedtime stories for children, turning bedtime into magical moments where your child is the hero of their own story.',
			url: 'https://ai-tales.com/',
			technologies: ['AI', 'Web Development', 'User Experience']
		},
		{
			title: 'This Day Wiki',
			description: 'A comprehensive knowledge platform that provides historical information and events that happened on any given day throughout history.',
			url: 'https://www.thisdaywiki.com/',
			technologies: ['Web Development', 'Content Management', 'Data Visualization']
		},
		{
			title: 'Organicaf',
			description: 'An e-commerce platform for organic coffee and spices from Morocco, featuring a complete online store with product catalog, shopping cart, and order management.',
			url: 'https://organicaf.ma/',
			technologies: ['E-commerce', 'WordPress', 'Payment Integration']
		}
	];
</script>

<svelte:head>
	<title>ANEJJAR Elhoucine - Developer & Designer</title>
	<meta name="description" content="Front & Back End developer and UX/UI passion | Open-source lover | Life hacker who 💓 code, meditation and solving human problems." />
	<meta property="og:title" content="ANEJJAR Elhoucine - Developer & Designer" />
	<meta property="og:description" content="Front & Back End developer and UX/UI passion | Open-source lover | Life hacker" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://anejjar.com" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@anejjarlhoucine" />
	<link rel="canonical" href="https://anejjar.com" />
</svelte:head>

<StructuredData />

<div class="container-custom py-12 md:py-16">
	<!-- Hero Section -->
	<section class="mb-16">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">
			Hi 👋, I'm <span class="text-white">ANEJJAR Elhoucine</span>!
		</h1>
		<p class="text-xl text-text-50 leading-relaxed max-w-3xl">
			Front & Back End developer and UX/UI passion | Open-source lover | Life hacker who 💓 code, meditation and solving human problems.
		</p>
	</section>

	<!-- Introduction -->
	<section class="mb-16">
		<p class="text-lg text-text leading-relaxed max-w-3xl mb-6">
			I'm a passionate developer who loves building solutions that make a difference. 
			When I'm not coding, you'll find me meditating, learning new technologies, or working on open-source projects.
		</p>
		<p class="text-lg text-text leading-relaxed max-w-3xl">
			💬 Ready for freelancing: <a href="/contact" class="link">anejjar.com</a>
		</p>
	</section>

	<!-- Technical Skills -->
	<section class="mb-16">
		<h2 class="text-2xl font-semibold mb-6">Technical Skills 🛠️</h2>
		
		<div class="space-y-8">
			<div>
				<h3 class="text-lg font-medium mb-3">Languages</h3>
				<div class="flex flex-wrap gap-2">
					{#each skills.languages as lang}
						<span class="px-3 py-1 bg-bg-50 rounded-md text-sm">{lang}</span>
					{/each}
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-medium mb-3">Frameworks & Libraries</h3>
				<div class="flex flex-wrap gap-2">
					{#each skills.frameworks as framework}
						<span class="px-3 py-1 bg-bg-50 rounded-md text-sm">{framework}</span>
					{/each}
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-medium mb-3">Tools & Technologies</h3>
				<div class="flex flex-wrap gap-2">
					{#each skills.tools as tool}
						<span class="px-3 py-1 bg-bg-50 rounded-md text-sm">{tool}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Portfolio Section -->
	<section class="mb-16">
		<h2 class="text-2xl font-semibold mb-6">Featured Projects 🚀</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each projects as project}
				<PortfolioItem {project} />
			{/each}
		</div>
	</section>

	<!-- Recent Blog Posts -->
	{#if posts.length > 0}
		<section class="mb-16">
			<h2 class="text-2xl font-semibold mb-6">Recent Articles</h2>
			<div>
				{#each posts.slice(0, 5) as post}
					<BlogPostCard {post} />
				{/each}
			</div>
			{#if posts.length > 5}
				<div class="mt-6">
					<a href="/blog" class="link">View all articles →</a>
				</div>
			{/if}
		</section>
	{/if}

	<!-- Connect Section -->
	<section>
		<h2 class="text-2xl font-semibold mb-4">Connect with me</h2>
		<div class="flex items-center gap-6">
			<a
				href="https://www.linkedin.com/in/anejjar/"
				target="_blank"
				rel="noopener noreferrer"
				class="link"
			>
				LinkedIn
			</a>
			<a
				href="https://x.com/anejjarlhoucine"
				target="_blank"
				rel="noopener noreferrer"
				class="link"
			>
				Twitter/X
			</a>
			<a
				href="mailto:anejjarelhoucine@gmail.com"
				class="link"
			>
				Email
			</a>
		</div>
	</section>
</div>

