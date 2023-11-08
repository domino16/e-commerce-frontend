/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,ts}',
	],
	theme: {
		colors:{
		'header-button-background': 'rgba(244, 244, 244, .2)',
		'header-button-background-hover': '#949494',
		'header-button-background-when-menu-open':'rgba(0, 0, 0, .3)',
		'header-button-background-when-menu-open-hover':'rgba(0, 0, 0, .5)',
		'header-button-background-in-sticky-header': '#d6d6d6',
		'black': '#000',
		'white': '#fff',
		'pure-white': '#f4f4f4',
		'overlay-background': '#000000d9',
		'link-hover':'#949494',
		'hero-background': 'rgba(0,0,0,0.5)',
		catagory:{
			child1:{
				'text':'#ff9500',
				'background':'#fffbdc',
				
			},
			child2:{
				'text':'#000',
				'background':'#e3e3e3'
			},
			child3:{
				'text':'#b41924',
				'background':'#fce4e5'
			},
			child4:{
				'text':'#235c1b',
				'background':'#e1efe3'
			},
			child5:{
				'text':'#9b5b37',
				'background':'#fff5e9'
			},
			child6:{
				'text':'#000',
				'background':'#fff'
			},
		}
				},
		extend: {
			transitionTimingFunction: {
				'in-out-expo': 'cubic-bezier(.38,.005,.215,1)',
			  },
			  fontSize:{
				'modal-menu-nav-links-size':'clamp(48px,120/2000*100vw,120px)',
				'modal-menu-second-nav-links-size':'clamp(20px,24/1400*100vw,24px)',
				'tile-text-size' : 'clamp(40px,55/2000*100vw,55px)'
			  },
			  spacing:{
				'tile-spacing':'clamp(16px,calc(30/14.4*1vw),30px)2.5rem',
				'h2-landing-page-padding-top': 'clamp(calc(0.0625rem*80),calc(120/14.4*1vw),calc(0.0625rem*120))'
			  }
		},
	},
	plugins: [],
};

