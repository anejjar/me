// Carries a tool's result into the contact form (sessionStorage, so nothing lands in the URL)
import { goto } from '$app/navigation';

export type LeadDraft = {
	source: string;
	projectType?: string;
	budget?: string;
	message: string;
};

const KEY = 'lead-draft';

export const budgets = ['< 10 000 DH', '10 000 – 25 000 DH', '25 000 – 60 000 DH', '60 000+ DH', 'Not sure yet'];

export function budgetFor(amount: number): string {
	if (amount < 10_000) return budgets[0];
	if (amount < 25_000) return budgets[1];
	if (amount < 60_000) return budgets[2];
	return budgets[3];
}

export function saveDraft(draft: LeadDraft) {
	try {
		sessionStorage.setItem(KEY, JSON.stringify(draft));
	} catch {
		// storage unavailable — the form simply starts empty
	}
}

export function loadDraft(): LeadDraft | null {
	try {
		const raw = sessionStorage.getItem(KEY);
		if (!raw) return null;
		sessionStorage.removeItem(KEY);
		return JSON.parse(raw) as LeadDraft;
	} catch {
		return null;
	}
}

export function sendToContact(draft: LeadDraft) {
	saveDraft(draft);
	window.gtag?.('event', 'tool_lead', { tool: draft.source });
	goto('/contact');
}

const tracked = new Set<string>();

// Fire `tool_used` once per tool per page view
export function trackToolUse(tool: string) {
	if (tracked.has(tool) || typeof window === 'undefined') return;
	tracked.add(tool);
	window.gtag?.('event', 'tool_used', { tool });
}
