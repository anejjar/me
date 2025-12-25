import { getBlogPosts } from '$lib/utils/blog';

export async function GET() {
	const posts = await getBlogPosts();
	const baseUrl = 'https://anejjar.com';
	
	const staticPages = [
		{ url: '', changefreq: 'weekly', priority: '1.0' },
		{ url: '/about', changefreq: 'monthly', priority: '0.8' },
		{ url: '/blog', changefreq: 'weekly', priority: '0.9' },
		{ url: '/contact', changefreq: 'monthly', priority: '0.7' }
	];
	
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${posts
	.map(
		(post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}

