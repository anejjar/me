// Project estimator — effort-based pricing for the Moroccan market.
// Price = working days × dayRate. Local freelance day rates run ~2 500–4 500 DH (Casablanca, 2026);
// set dayRate to yours and every estimate follows.
export const dayRate = 2500; // DH per working day

export type ProjectTypeId = 'website' | 'webapp' | 'ecommerce' | 'mvp';

export const projectTypes: {
	id: ProjectTypeId;
	label: string;
	hint: string;
	baseDays: number;
	daysPerUnit: number; // per page (sites) or per screen (apps)
	unitLabel: string;
	defaultUnits: number;
	service: string; // must match a service title in config.ts
}[] = [
	{ id: 'website', label: 'Business website', hint: 'Company, portfolio or landing pages', baseDays: 2, daysPerUnit: 0.5, unitLabel: 'pages', defaultUnits: 5, service: 'WordPress & e-commerce' },
	{ id: 'ecommerce', label: 'Online store', hint: 'WooCommerce or custom shop', baseDays: 4, daysPerUnit: 0.5, unitLabel: 'pages', defaultUnits: 8, service: 'WordPress & e-commerce' },
	{ id: 'webapp', label: 'Web app / dashboard', hint: 'SaaS, portal or internal tool', baseDays: 10, daysPerUnit: 1.5, unitLabel: 'screens', defaultUnits: 8, service: 'Custom web apps' },
	{ id: 'mvp', label: 'Startup MVP', hint: 'Validate an idea fast', baseDays: 12, daysPerUnit: 1.2, unitLabel: 'screens', defaultUnits: 10, service: 'Custom web apps' }
];

export type Feature = { id: string; label: string; days: number; group: 'Core' | 'Integrations' | 'Smart' };

export const features: Feature[] = [
	{ id: 'auth', label: 'User accounts & login', days: 2, group: 'Core' },
	{ id: 'admin', label: 'Admin dashboard', days: 4, group: 'Core' },
	{ id: 'cms', label: 'Blog / CMS', days: 1.5, group: 'Core' },
	{ id: 'i18n', label: 'Multilingual (FR / AR / EN)', days: 2, group: 'Core' },
	{ id: 'payments', label: 'Online payments (CMI, Stripe, PayPal)', days: 3, group: 'Integrations' },
	{ id: 'cod', label: 'Cash on delivery & shipping', days: 1.5, group: 'Integrations' },
	{ id: 'email', label: 'Transactional emails', days: 1, group: 'Integrations' },
	{ id: 'sms', label: 'SMS / WhatsApp', days: 1.5, group: 'Integrations' },
	{ id: 'google', label: 'Google APIs (Maps, Sheets, Calendar)', days: 1.5, group: 'Integrations' },
	{ id: 'api', label: 'Other third-party API', days: 2, group: 'Integrations' },
	{ id: 'automation', label: 'n8n automations', days: 2, group: 'Smart' },
	{ id: 'ai', label: 'AI feature (chat, generation…)', days: 4, group: 'Smart' }
];

export const designOptions = [
	{ id: 'have', label: 'I have designs', multiplier: 1 },
	{ id: 'template', label: 'Use a clean template', multiplier: 1.05 },
	{ id: 'custom', label: 'Custom design needed', multiplier: 1.25 }
];

export const urgencyOptions = [
	{ id: 'flexible', label: 'Flexible', multiplier: 1 },
	{ id: 'normal', label: 'Within 2 months', multiplier: 1 },
	{ id: 'rush', label: 'ASAP (rush)', multiplier: 1.2 }
];

// Range shown to the visitor around the computed estimate
export const rangeLow = 0.85;
export const rangeHigh = 1.25;
