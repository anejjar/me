import { marked } from 'marked';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import type { BlogPost } from '../types';

function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob('/src/lib/content/blog/*.md?raw', { 
		eager: true
	});
	
	const posts: BlogPost[] = [];
	
	for (const path in modules) {
		const module = modules[path] as { default: string };
		const rawContent = module.default;
		
		const { data, content: markdownContent } = matter(rawContent);
		const filename = path.split('/').pop() || '';
		const slug = filename.replace(/\.md(\?raw)?$/, '');
		
		// Handle tags - can be string or array
		let tags: string[] = [];
		if (data.tags) {
			tags = Array.isArray(data.tags) ? data.tags : [data.tags];
		}
		
		// Configure marked to add IDs to headings and highlight code
		const renderer = new marked.Renderer();
		renderer.heading = function (text, level) {
			const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
			return `<h${level} id="${escapedText}">${text}</h${level}>`;
		};
		renderer.code = function (code, language) {
			const lang = language || 'plaintext';
			const highlighted = hljs.highlight(code, { language: lang }).value;
			return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
		};
		
		marked.setOptions({ renderer });
		
		posts.push({
			slug,
			title: data.title || slug,
			date: data.date || new Date().toISOString(),
			description: data.description || '',
			content: markdownContent,
			html: marked(markdownContent) as string,
			tags: tags.length > 0 ? tags : undefined,
			readingTime: calculateReadingTime(markdownContent)
		});
	}
	
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		const modules = import.meta.glob('/src/lib/content/blog/*.md?raw', {
			eager: true
		});
		
		for (const path in modules) {
			const filename = path.split('/').pop() || '';
			const pathSlug = filename.replace(/\.md(\?raw)?$/, '');
			if (pathSlug === slug) {
				const module = modules[path] as { default: string };
				const rawContent = module.default;
				const { data, content } = matter(rawContent);
				
				// Handle tags - can be string or array
				let tags: string[] = [];
				if (data.tags) {
					tags = Array.isArray(data.tags) ? data.tags : [data.tags];
				}
				
				// Configure marked to add IDs to headings and highlight code
				const renderer = new marked.Renderer();
				renderer.heading = function (text, level) {
					const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
					return `<h${level} id="${escapedText}">${text}</h${level}>`;
				};
				renderer.code = function (code, language) {
					const lang = language || 'plaintext';
					const highlighted = hljs.highlight(code, { language: lang }).value;
					return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
				};
				
				marked.setOptions({ renderer });
				
				return {
					slug,
					title: data.title || slug,
					date: data.date || new Date().toISOString(),
					description: data.description || '',
					content,
					html: marked(content) as string,
					tags: tags.length > 0 ? tags : undefined,
					readingTime: calculateReadingTime(content)
				};
			}
		}
		
		return null;
	} catch {
		return null;
	}
}

