export default {
	content: [
		'./renderer/renderer.js',
		'./renderer/index.html', // renderer/index.html
		'./renderer/src/**/*.{js,jsx,ts,tsx, css}',
		'./src/**/*.{js,jsx,ts,tsx,css}', // Include JS/JSX and CSS files
    './index.html',
	],
	darkMode: 'class',
	theme: {
		extend: {
			// Optional: Extend colors if needed
      colors: {
        gray: {
          800: '#1f2937', // Ensure bg-gray-800
        },
      },
		},
	},
	plugins: [],
};
