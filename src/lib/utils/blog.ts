import { marked } from 'marked';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import type { BlogPost } from '../types';
import { browser } from '$app/environment';

function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes;
}

// Configure marked renderer once
const renderer = new marked.Renderer();
renderer.heading = function (text, level) {
	const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
	return `<h${level} id="${escapedText}">${text}</h${level}>`;
};
renderer.code = function (code, language) {
	try {
		const lang = language || 'plaintext';
		const highlighted = hljs.highlight(code, { language: lang }).value;
		return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
	} catch (hlError) {
		// Fallback if highlight.js fails
		return `<pre><code class="hljs">${code}</code></pre>`;
	}
};

// Configure marked options once
marked.setOptions({ renderer });

export async function getBlogPosts(): Promise<BlogPost[]> {
	try {
		const posts: BlogPost[] = [];
		
		// Use filesystem in SSR, glob in browser (though glob isn't working)
		if (!browser) {
			// Server-side: Read files directly from filesystem
			// Dynamically import fs to avoid bundling for client
			const { readdirSync, readFileSync } = await import('fs');
			const { join } = await import('path');
			
			const blogDir = join(process.cwd(), 'src', 'lib', 'content', 'blog');
			const files = readdirSync(blogDir).filter(f => f.endsWith('.md'));
			
			console.log('Reading from filesystem, found files:', files.length);
			console.log('Blog directory:', blogDir);
			
			for (const file of files) {
				try {
					const filePath = join(blogDir, file);
					const rawContent = readFileSync(filePath, 'utf-8');
					
					const { data, content: markdownContent } = matter(rawContent);
					const slug = file.replace(/\.md$/, '');
					
					// Handle tags - can be string or array
					let tags: string[] = [];
					if (data.tags) {
						tags = Array.isArray(data.tags) ? data.tags : [data.tags];
					}
					
					// Parse date safely
					let dateString = data.date || new Date().toISOString();
					if (typeof dateString === 'string' && !dateString.includes('T')) {
						// If it's just a date (YYYY-MM-DD), add time
						dateString = `${dateString}T00:00:00.000Z`;
					}
					
					// Parse markdown to HTML safely
					let htmlContent = '';
					try {
						htmlContent = marked(markdownContent) as string;
					} catch (markdownError) {
						console.error(`Error parsing markdown for ${file}:`, markdownError);
						htmlContent = `<p>Error parsing markdown content.</p>`;
					}
					
					posts.push({
						slug,
						title: data.title || slug,
						date: dateString,
						description: data.description || '',
						content: markdownContent,
						html: htmlContent,
						tags: tags.length > 0 ? tags : undefined,
						readingTime: calculateReadingTime(markdownContent)
					});
				} catch (error) {
					console.error(`Error processing blog post ${file}:`, error);
					if (error instanceof Error) {
						console.error('Error details:', error.message, error.stack);
					}
				}
			}
		} else {
			// Client-side: Try glob as fallback (though it's not working)
			const globResult = import.meta.glob('/src/lib/content/blog/*.md?raw', { 
				eager: true
			}) as Record<string, { default: string }>;
			
			for (const path in globResult) {
				try {
					const module = globResult[path];
					const rawContent = module.default;
					
					if (!rawContent) continue;
					
					const { data, content: markdownContent } = matter(rawContent);
					const filename = path.split('/').pop() || '';
					const slug = filename.replace(/\.md(\?raw)?$/, '');
					
					// Handle tags - can be string or array
					let tags: string[] = [];
					if (data.tags) {
						tags = Array.isArray(data.tags) ? data.tags : [data.tags];
					}
					
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
				} catch (error) {
					console.error(`Error processing blog post ${path}:`, error);
				}
			}
		}
		
		// Sort posts by date, handling invalid dates gracefully
		return posts.sort((a, b) => {
			try {
				const dateA = new Date(a.date).getTime();
				const dateB = new Date(b.date).getTime();
				// If dates are invalid, put them at the end
				if (isNaN(dateA) && isNaN(dateB)) return 0;
				if (isNaN(dateA)) return 1;
				if (isNaN(dateB)) return -1;
				return dateB - dateA;
			} catch (sortError) {
				console.error('Error sorting posts:', sortError);
				return 0;
			}
		});
	} catch (error) {
		console.error('Error loading blog posts:', error);
		if (error instanceof Error) {
			console.error('Error stack:', error.stack);
		}
		return [];
	}
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		if (!browser) {
			// Server-side: Read file directly from filesystem
			// Dynamically import fs to avoid bundling for client
			const { readFileSync } = await import('fs');
			const { join } = await import('path');
			
			const blogDir = join(process.cwd(), 'src', 'lib', 'content', 'blog');
			const filePath = join(blogDir, `${slug}.md`);
			
			try {
				const rawContent = readFileSync(filePath, 'utf-8');
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
			} catch (fileError) {
				// File not found
				return null;
			}
		} else {
			// Client-side: Try glob (fallback)
			const modules = import.meta.glob('/src/lib/content/blog/*.md?raw', {
				eager: true
			}) as Record<string, { default: string }>;
			
			for (const path in modules) {
				const filename = path.split('/').pop() || '';
				const pathSlug = filename.replace(/\.md(\?raw)?$/, '');
				if (pathSlug === slug) {
					const module = modules[path];
					const rawContent = module.default;
					const { data, content } = matter(rawContent);
					
					// Handle tags - can be string or array
					let tags: string[] = [];
					if (data.tags) {
						tags = Array.isArray(data.tags) ? data.tags : [data.tags];
					}
					
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
		}
		
		return null;
	} catch {
		return null;
	}
}

