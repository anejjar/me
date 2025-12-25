import { getBlogPosts } from '$lib/utils/blog';

export async function GET() {
	const posts = await getBlogPosts();
	const baseUrl = 'https://anejjar.com';
	
	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>ANEJJAR Elhoucine - Blog</title>
		<description>Front & Back End developer and UX/UI passion | Open-source lover | Life hacker</description>
		<link>${baseUrl}</link>
		<atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
		<language>en-us</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts
	.map(
		(post) => `		<item>
			<title><![CDATA[${post.title}]]></title>
			<description><![CDATA[${post.description || ''}]]></description>
			<link>${baseUrl}/blog/${post.slug}</link>
			<guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>`
	)
	.join('\n')}
	</channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
}

