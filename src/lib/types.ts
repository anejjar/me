export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	description: string;
	content: string;
	html: string;
	tags?: string[];
	readingTime?: number;
}

