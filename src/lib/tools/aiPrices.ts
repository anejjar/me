// Standard (non-batch, uncached) API list prices in USD per 1M tokens.
// Sources: claude.com/pricing, developers.openai.com/api/docs/pricing, ai.google.dev/gemini-api/docs/pricing
export const pricesUpdated = 'October 2026';

export type AiModel = { provider: 'Anthropic' | 'OpenAI' | 'Google'; name: string; tier: 'Flagship' | 'Balanced' | 'Fast'; inputPerM: number; outputPerM: number };

export const aiModels: AiModel[] = [
	{ provider: 'Anthropic', name: 'Claude Opus 5.5', tier: 'Flagship', inputPerM: 4, outputPerM: 20 },
	{ provider: 'Anthropic', name: 'Claude Sonnet 5.5', tier: 'Balanced', inputPerM: 2, outputPerM: 10 },
	{ provider: 'Anthropic', name: 'Claude Haiku 5.5', tier: 'Fast', inputPerM: 0.1, outputPerM: 0.5 },
	{ provider: 'OpenAI', name: 'GPT-6 Astra', tier: 'Flagship', inputPerM: 10, outputPerM: 50 },
	{ provider: 'OpenAI', name: 'GPT-6 Sol', tier: 'Balanced', inputPerM: 2, outputPerM: 10 },
	{ provider: 'OpenAI', name: 'GPT-6 Luna', tier: 'Fast', inputPerM: 0.1, outputPerM: 0.5 },
	{ provider: 'Google', name: 'Gemini 3.1 Pro', tier: 'Flagship', inputPerM: 2, outputPerM: 12 },
	{ provider: 'Google', name: 'Gemini 3.8 Flash', tier: 'Balanced', inputPerM: 0.75, outputPerM: 3.75 },
	{ provider: 'Google', name: 'Gemini 3.5 Flash-Lite', tier: 'Fast', inputPerM: 0.3, outputPerM: 2.5 }
];

export const TOKENS_PER_WORD = 1.33;

export const useCases = [
	{ id: 'chatbot', label: 'Customer support chatbot', requestsPerUser: 10, inputWords: 1500, outputWords: 150, build: 'Chat widget + your docs as knowledge base' },
	{ id: 'content', label: 'Content generation', requestsPerUser: 20, inputWords: 300, outputWords: 800, build: 'Generate product descriptions, posts or emails' },
	{ id: 'summarise', label: 'Document summarisation', requestsPerUser: 15, inputWords: 4000, outputWords: 300, build: 'Upload PDFs, contracts or reports and get summaries' },
	{ id: 'classify', label: 'Classification & extraction', requestsPerUser: 100, inputWords: 400, outputWords: 30, build: 'Tag tickets, extract invoice data, route leads' }
];
