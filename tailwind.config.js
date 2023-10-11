/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,ts}',
	],
	theme: {
		colors:{
		'header-button-background': 'rgba(244, 244, 244, .2)',
		'header-button-background-hover': '#949494'
		},
		extend: {},
	},
	plugins: [],
};

