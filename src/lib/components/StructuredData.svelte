<script lang="ts">
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'ANEJJAR Elhoucine',
		url: 'https://anejjar.com',
		email: 'anejjarelhoucine@gmail.com',
		jobTitle: 'Front & Back End Developer',
		description: 'Front & Back End developer and UX/UI passion | Open-source lover | Life hacker',
		sameAs: [
			'https://www.linkedin.com/in/anejjar/',
			'https://x.com/anejjarlhoucine'
		]
	};
	
	const schemaJson = JSON.stringify(personSchema);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${schemaJson}</script>`}
</svelte:head>

