// Automation savings calculator — effort-based, priced from the same day rate as the estimator.
import { dayRate } from './estimatorPricing';

export type Complexity = 'simple' | 'medium' | 'complex';

const buildDays: Record<Complexity, number> = { simple: 1, medium: 2, complex: 4 };

export const buildCost: Record<Complexity, number> = {
	simple: buildDays.simple * dayRate,
	medium: buildDays.medium * dayRate,
	complex: buildDays.complex * dayRate
};

// Self-hosted n8n on a small VPS (e.g. Contabo Cloud VPS 4 ≈ 60 DH/month)
export const monthlyRunningCost = 60;

// Default hourly cost of the employee doing the task. SMIG is 17.92 DH/h (2026);
// an office employee with employer charges typically costs ~35–60 DH/h.
export const defaultHourlyCost = 40;

export type TaskPreset = {
	id: string;
	label: string;
	minutes: number;
	runsPerWeek: number;
	complexity: Complexity;
	flow: string;
};

export const taskPresets: TaskPreset[] = [
	{ id: 'invoices', label: 'Sending invoices', minutes: 10, runsPerWeek: 15, complexity: 'medium', flow: 'New Stripe payment → create invoice PDF → email the client → log it in Google Sheets' },
	{ id: 'leads', label: 'Following up with new leads', minutes: 8, runsPerWeek: 20, complexity: 'simple', flow: 'New form submission → add to CRM → send welcome email → notify you on WhatsApp' },
	{ id: 'data-entry', label: 'Copying data between tools', minutes: 15, runsPerWeek: 10, complexity: 'medium', flow: 'New order in WooCommerce → update stock sheet → create shipping label' },
	{ id: 'reports', label: 'Building weekly reports', minutes: 90, runsPerWeek: 1, complexity: 'complex', flow: 'Every Monday → pull sales, ads & analytics data → build report → email the team' },
	{ id: 'social', label: 'Posting to social media', minutes: 20, runsPerWeek: 5, complexity: 'simple', flow: 'New blog post → generate captions with AI → schedule on LinkedIn, X & Facebook' },
	{ id: 'support', label: 'Sorting support emails', minutes: 3, runsPerWeek: 60, complexity: 'complex', flow: 'New email → AI classifies urgency & topic → create ticket → auto-reply to FAQs' }
];
