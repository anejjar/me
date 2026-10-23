/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				bg: {
					DEFAULT: '#09090b',
					50: '#111114',
					100: '#1f1f23',
					200: '#2a2a30'
				},
				text: {
					DEFAULT: '#e4e4e7',
					50: '#a1a1aa',
					100: '#71717a'
				},
				accent: {
					DEFAULT: '#34d399',
					hover: '#10b981',
					muted: 'rgba(52, 211, 153, 0.12)'
				}
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
				display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
