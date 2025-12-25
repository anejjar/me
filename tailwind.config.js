/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				bg: {
					DEFAULT: '#0a0a0a',
					50: '#1a1a1a',
					100: '#2a2a2a'
				},
				text: {
					DEFAULT: '#e5e5e5',
					50: '#a0a0a0',
					100: '#6b6b6b'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};

