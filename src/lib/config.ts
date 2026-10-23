export const site = {
	name: 'ANEJJAR Elhoucine',
	shortName: 'ANEJJAR',
	url: 'https://anejjar.com',
	email: 'anejjarelhoucine@gmail.com',
	bookingUrl: 'https://cal.com/anejjar-lhouciane-rrm7af/15min',
	// Web3Forms access key — public by design, it only allows sending to the owner's inbox
	formAccessKey: 'a7679e3b-2c95-48d4-bdc5-f4e4c6e2f17c',
	// Google PageSpeed Insights key — required in practice: keyless requests share Google's public quota, which is usually exhausted.
	// Free from Google Cloud Console; restrict it to the anejjar.com referrer and the PageSpeed Insights API.
	pageSpeedApiKey: ''
};

export const socials = [
	{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/anejjar/' },
	{ name: 'Twitter/X', url: 'https://x.com/anejjarlhoucine' }
];

export const navItems = [
	{ href: '/#services', label: 'Services' },
	{ href: '/#work', label: 'Work' },
	{ href: '/tools', label: 'Free tools' },
	{ href: '/about', label: 'About' },
	{ href: '/blog', label: 'Blog' }
];

export type Service = {
	id: string;
	title: string;
	description: string;
	deliverables: string[];
	icon: 'code' | 'cart' | 'spark' | 'server' | 'bolt' | 'plug' | 'gauge' | 'calculator';
};

export const services: Service[] = [
	{
		id: 'web-app',
		title: 'Custom web apps',
		description: 'SaaS MVPs, dashboards and internal tools built with Laravel and React — fast, secure and easy to grow.',
		deliverables: ['MVP in weeks, not months', 'Clean, documented codebase', 'Auth, payments, admin panels'],
		icon: 'code'
	},
	{
		id: 'ecommerce',
		title: 'WordPress & e-commerce',
		description: 'High-converting WooCommerce stores and WordPress sites you can manage yourself.',
		deliverables: ['Custom themes, no bloat', 'Payment & shipping setup', 'SEO & speed optimised'],
		icon: 'cart'
	},
	{
		id: 'ai',
		title: 'AI integrations',
		description: 'Add useful AI features to your product — content generation, chat, search and automation.',
		deliverables: ['LLM-powered features', 'Workflow automation', 'Cost-aware architecture'],
		icon: 'spark'
	},
	{
		id: 'automation',
		title: 'Automations (n8n)',
		description: 'Stop doing the same task twice. I connect your tools — CRM, sheets, email, invoices — into workflows that run on their own.',
		deliverables: ['Hours saved every week', 'Self-hosted n8n, no per-task fees', 'Monitored & documented flows'],
		icon: 'bolt'
	},
	{
		id: 'integrations',
		title: 'API integrations',
		description: 'Connect your product to the services it needs: payments, email, SMS, WhatsApp and Google APIs — done securely.',
		deliverables: ['Stripe, PayPal & CMI payments', 'Email, SMS & WhatsApp (Resend, Twilio…)', 'Google Maps, Sheets, Calendar & login'],
		icon: 'plug'
	},
	{
		id: 'devops',
		title: 'DevOps & deployment',
		description: 'Get your app online reliably: Docker, VPS setup, CI/CD and monitoring without the cloud bill shock.',
		deliverables: ['Dockerised deployments', 'VPS & Dokploy setup', 'Backups & SSL handled'],
		icon: 'server'
	}
];

export type Tool = {
	slug: string;
	title: string;
	description: string;
	icon: Service['icon'];
	service: Service['id'];
};

export const tools: Tool[] = [
	{
		slug: 'project-estimator',
		title: 'Project cost estimator',
		description: 'Get a price range and timeline for your website, web app or store in under a minute.',
		icon: 'calculator',
		service: 'web-app'
	},
	{
		slug: 'website-audit',
		title: 'Website speed & SEO audit',
		description: "See how fast your site really is and what's hurting your Google ranking — in plain English.",
		icon: 'gauge',
		service: 'ecommerce'
	},
	{
		slug: 'automation-savings',
		title: 'Automation savings calculator',
		description: 'Find out how many hours and how much money automating your repetitive tasks would save.',
		icon: 'bolt',
		service: 'automation'
	},
	{
		slug: 'ai-cost-calculator',
		title: 'AI feature cost calculator',
		description: 'Estimate the monthly API cost of adding AI to your product across Claude, OpenAI and Gemini.',
		icon: 'spark',
		service: 'ai'
	},
	{
		slug: 'hosting-calculator',
		title: 'Hosting cost calculator',
		description: 'Compare what your app would cost on Vercel, Render, Heroku, AWS or your own VPS.',
		icon: 'server',
		service: 'devops'
	}
];

export type Project = {
	title: string;
	description: string;
	url: string;
	caseStudy?: string;
	technologies: string[];
	gradient: string;
};

export const projects: Project[] = [
	{
		title: 'AI Tales',
		description: 'AI-powered platform that writes personalised bedtime stories where your child is the hero.',
		url: 'https://ai-tales.com/',
		caseStudy: '/blog/ai-tales',
		technologies: ['AI', 'Full-stack', 'UX'],
		gradient: 'from-violet-500/30 via-fuchsia-500/10 to-transparent'
	},
	{
		title: 'This Day Wiki',
		description: 'Knowledge platform surfacing historical events, births and facts for any day of the year.',
		url: 'https://www.thisdaywiki.com/',
		caseStudy: '/blog/this-day-wiki',
		technologies: ['Content platform', 'SEO', 'Data'],
		gradient: 'from-sky-500/30 via-cyan-500/10 to-transparent'
	},
	{
		title: 'Organicaf',
		description: 'E-commerce store for organic Moroccan coffee and spices, with catalog, cart and order management.',
		url: 'https://organicaf.ma/',
		caseStudy: '/blog/organicaf',
		technologies: ['E-commerce', 'WordPress', 'Payments'],
		gradient: 'from-amber-500/30 via-orange-500/10 to-transparent'
	},
	{
		title: 'Junk Startups',
		description: 'Launch platform for indie makers: list a startup, get upvotes, feedback and early users, plus a free launch-readiness audit.',
		url: 'https://junkstartups.com/',
		technologies: ['Next.js', 'Community', 'SEO'],
		gradient: 'from-rose-500/30 via-pink-500/10 to-transparent'
	},
	{
		title: 'MyWebTools',
		description: '50+ free developer utilities — JSON, encoding, colors, security and more — running entirely in the browser, no sign-up.',
		url: 'https://mywebtools.dev/',
		technologies: ['Developer tools', 'Client-side', 'Privacy'],
		gradient: 'from-emerald-500/30 via-teal-500/10 to-transparent'
	},
	{
		title: 'Be Puzzled',
		description: 'Free online logic puzzle site with 40+ games — nonograms, sudoku variants, minesweeper and more — plus a daily puzzle.',
		url: 'https://be-puzzled.com/',
		technologies: ['Games', 'Web app', 'UX'],
		gradient: 'from-indigo-500/30 via-blue-500/10 to-transparent'
	}
];

export const processSteps = [
	{ title: 'Discovery call', description: 'A free 15-minute call to understand your goals, users and constraints.' },
	{ title: 'Clear proposal', description: 'Scope, timeline and a fixed price — no surprises later.' },
	{ title: 'Build in iterations', description: 'Weekly demos so you see progress and can steer early.' },
	{ title: 'Launch & support', description: 'Deployment, handover and ongoing support when you need it.' }
];

export const skills = {
	Languages: ['PHP', 'JavaScript', 'TypeScript', 'Python', 'Go'],
	Frameworks: ['Laravel', 'React', 'Next.js', 'Vue.js', 'SvelteKit', 'WordPress', 'Express.js'],
	Data: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
	Tooling: ['Docker', 'n8n', 'Stripe', 'Twilio', 'Google APIs', 'TailwindCSS', 'Vite', 'Node.js', 'Git', 'Postman']
};
