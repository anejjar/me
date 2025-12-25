<script lang="ts">
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
</script>

<svelte:head>
	<title>About - ANEJJAR Elhoucine</title>
	<meta name="description" content="Learn more about ANEJJAR Elhoucine - Front & Back End developer, UX/UI enthusiast, and open-source contributor." />
	<meta property="og:title" content="About - ANEJJAR Elhoucine" />
	<meta property="og:description" content="Learn more about ANEJJAR Elhoucine - Front & Back End developer, UX/UI enthusiast, and open-source contributor." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://anejjar.com/about" />
	<link rel="canonical" href="https://anejjar.com/about" />
</svelte:head>

<div class="container-custom py-12 md:py-16">
	<h1 class="text-4xl md:text-5xl font-bold mb-8">About</h1>
	
	<div class="max-w-3xl space-y-8">
		<section>
			<h2 class="text-2xl font-semibold mb-4">Who I Am</h2>
			<p class="text-lg text-text leading-relaxed mb-4">
				Hi 👋, I'm <strong>ANEJJAR Elhoucine</strong>!
			</p>
			<p class="text-lg text-text leading-relaxed mb-4">
				I'm a Front & Back End developer with a passion for UX/UI design. I'm an open-source lover 
				and a life hacker who 💓 code, meditation, and solving human problems.
			</p>
			<p class="text-lg text-text leading-relaxed">
				My journey in development has been driven by curiosity and a desire to create meaningful 
				solutions. I believe in writing clean, maintainable code and building user experiences 
				that truly make a difference.
			</p>
		</section>

		<section>
			<h2 class="text-2xl font-semibold mb-4">Technical Skills</h2>
			
			<div class="space-y-6">
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

		<section>
			<h2 class="text-2xl font-semibold mb-4">Currently Learning</h2>
			<p class="text-lg text-text leading-relaxed">
				I'm always expanding my skill set. Currently diving deeper into <strong>Python</strong> and <strong>Go</strong>, 
				exploring new frameworks, and staying up-to-date with the latest web technologies.
			</p>
		</section>

		<section>
			<h2 class="text-2xl font-semibold mb-4">What I Do</h2>
			<ul class="list-disc list-inside space-y-2 text-lg text-text">
				<li>Build full-stack web applications</li>
				<li>Design and implement user interfaces</li>
				<li>Contribute to open-source projects</li>
				<li>Freelance development work</li>
				<li>Solve complex technical problems</li>
			</ul>
		</section>

		<section>
			<h2 class="text-2xl font-semibold mb-4">Get in Touch</h2>
			<p class="text-lg text-text leading-relaxed mb-4">
				💬 Ready for freelancing: <a href="/contact" class="link">anejjar.com</a>
			</p>
			<p class="text-lg text-text leading-relaxed">
				📫 How to reach me: <a href="mailto:anejjarelhoucine@gmail.com" class="link">anejjarelhoucine@gmail.com</a>
			</p>
		</section>
	</div>
</div>

