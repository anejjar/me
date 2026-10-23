// Hosting list prices (USD/month unless noted; quote() converts everything to MAD). Sources: vercel.com/pricing, netlify.com/pricing,
// render.com/docs/outbound-bandwidth, heroku.com/pricing, aws.amazon.com/lightsail/pricing,
// contabo.com/en/vps, hetzner.com/cloud. Render instance/DB prices and Heroku bandwidth are not
// published on a page we could verify — treat those as estimates.
export const pricesUpdated = 'October 2026';
import { EUR_TO_MAD, money, USD_TO_MAD } from '$lib/utils/currency';

const EUR_TO_USD = EUR_TO_MAD / USD_TO_MAD;
export const MB_PER_VISIT = 2;

export type AppType = 'static' | 'server' | 'server-db';

export type HostingInput = {
	visitors: number; // monthly
	appType: AppType;
	storageGb: number; // database size
	apps: number;
};

export type HostingQuote = {
	// monthly cost in MAD
	provider: string;
	plan: string;
	monthly: number;
	note: string;
	selfHosted?: boolean;
};

const gbFor = (visitors: number) => (visitors * MB_PER_VISIT) / 1000;
const over = (used: number, included: number) => Math.max(0, used - included);
const EXTERNAL_DB = 25; // estimate for a managed Postgres add-on on platforms without their own DB

export function quote(input: HostingInput): HostingQuote[] {
	const { visitors, appType, storageGb, apps } = input;
	const gb = gbFor(visitors);
	const needsServer = appType !== 'static';
	const needsDb = appType === 'server-db';
	const heavy = visitors > 50_000;

	const quotes: HostingQuote[] = [];

	// Vercel Pro: $20/seat incl. 1 TB transfer, then $0.15/GB; ~$0.60 per 1M function calls
	{
		const functions = needsServer ? ((visitors * 5) / 1e6) * 0.6 + (heavy ? 15 * apps : 0) : 0;
		const monthly = 20 + over(gb, 1000) * 0.15 + functions + (needsDb ? EXTERNAL_DB : 0);
		quotes.push({ provider: 'Vercel', plan: 'Pro', monthly, note: needsDb ? `Includes ~${money(EXTERNAL_DB * USD_TO_MAD)} external database` : '1 TB transfer included' });
	}

	// Netlify Pro: $20 incl. 3,000 credits; 20 credits/GB, 2 credits per 10k requests; extra 1,500 credits = $10
	{
		const credits = gb * 20 + ((visitors * 20) / 10_000) * 2 + (needsServer ? (visitors / 10_000) * 10 : 0);
		const monthly = 20 + Math.ceil(over(credits, 3000) / 1500) * 10 + (needsDb ? EXTERNAL_DB : 0);
		quotes.push({ provider: 'Netlify', plan: 'Pro', monthly, note: 'Credit-based billing' });
	}

	// Render: static sites free; web service Starter $7 / Standard $25; Postgres $6 + $0.30/GB; bandwidth 5 GB (Hobby) or 25 GB (Pro $25), then $0.15/GB
	{
		const instances = needsServer ? apps * (heavy ? 25 : 7) : 0;
		const db = needsDb ? 6 + storageGb * 0.3 : 0;
		const hobby = over(gb, 5) * 0.15;
		const pro = 25 + over(gb, 25) * 0.15;
		const monthly = instances + db + Math.min(hobby, pro);
		quotes.push({ provider: 'Render', plan: hobby <= pro ? 'Hobby workspace' : 'Pro workspace', monthly, note: 'Bandwidth billed past 5–25 GB' });
	}

	// Heroku: Basic $7 / Standard-2X $50 dyno; Postgres Essential-0 $5 (1 GB), -1 $9 (10 GB), -2 $20 (32 GB)
	{
		const dynos = apps * (heavy ? 50 : 7);
		const db = !needsDb ? 0 : storageGb <= 1 ? 5 : storageGb <= 10 ? 9 : 20;
		quotes.push({ provider: 'Heroku', plan: heavy ? 'Standard-2X' : 'Basic', monthly: dynos + db, note: 'Per app (dyno)' });
	}

	// AWS Lightsail: $7 (1 GB RAM, 2 TB), $12 (2 GB, 3 TB), $24 (4 GB, 4 TB); managed DB $15; ~$0.09/GB over
	{
		const plan = visitors <= 50_000 ? { price: 7, tb: 2, name: '1 GB' } : visitors <= 300_000 ? { price: 12, tb: 3, name: '2 GB' } : { price: 24, tb: 4, name: '4 GB' };
		const monthly = plan.price + (needsDb ? 15 : 0) + over(gb, plan.tb * 1000) * 0.09;
		quotes.push({ provider: 'AWS Lightsail', plan: `${plan.name} instance`, monthly, note: needsDb ? `Includes ${money(15 * USD_TO_MAD)} managed DB` : 'All apps on one instance' });
	}

	// Contabo Cloud VPS (EUR, standard monthly rate, unlimited fair-use traffic) running Dokploy
	{
		const load = visitors * Math.max(1, apps * 0.5);
		const plan = load <= 300_000 ? { eur: 5.5, name: 'Cloud VPS 4 (8 GB RAM)' } : load <= 1_000_000 ? { eur: 7.5, name: 'Cloud VPS 6 (12 GB RAM)' } : { eur: 14, name: 'Cloud VPS 8 (24 GB RAM)' };
		quotes.push({ provider: 'Contabo VPS + Dokploy', plan: plan.name, monthly: plan.eur * EUR_TO_USD, note: 'All apps + database on one server', selfHosted: true });
	}

	// Hetzner Cloud (EUR excl. VAT, EU, 20 TB traffic) running Dokploy
	{
		const load = visitors * Math.max(1, apps * 0.5);
		const plan = load <= 300_000 ? { eur: 5.99, name: 'CX23 (4 GB RAM)' } : { eur: 8.99, name: 'CX33 (8 GB RAM)' };
		quotes.push({ provider: 'Hetzner VPS + Dokploy', plan: plan.name, monthly: plan.eur * EUR_TO_USD, note: 'All apps + database on one server', selfHosted: true });
	}

	return quotes.map((q) => ({ ...q, monthly: q.monthly * USD_TO_MAD })).sort((a, b) => a.monthly - b.monthly);
}
