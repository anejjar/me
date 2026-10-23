// Site currency is the Moroccan dirham. Provider prices (AI, hosting) are published in USD/EUR
// and converted with these approximate rates — update them from time to time.
export const ratesUpdated = 'October 2026';
export const USD_TO_MAD = 9.4;
export const EUR_TO_MAD = 11.0;

// "12 500 DH" — space-grouped, with a non-breaking space so "DH" never wraps alone
export const money = (n: number, digits = 0) =>
	`${n.toLocaleString('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: digits })} DH`;
