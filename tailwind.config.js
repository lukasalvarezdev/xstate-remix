/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			gridTemplateColumns: {
				'40/60': '2fr 3fr',
				desktop_pos_products: '4fr .5fr 1fr 1fr 1fr',
			},
		},
	},
};
