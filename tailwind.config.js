/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,ts}',
	],
	theme: {
		colors:{
		'header-button-background': 'rgba(244, 244, 244, .2)',
		'header-button-background-hover': '#949494',
		'black': '#000',
		'white': '#fff',
		'pure-white': '#f4f4f4',
		'overlay-background': '#000000d9',
		'modal-menu-link-hover':'#949494'
				},
		extend: {},
	},
	plugins: [],
};

