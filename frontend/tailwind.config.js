/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				'light-green': '#A8E6CF',
				'light-yellow': '#FFD3B6',
				'light-orange': '#FFAB91',
				'pink': '#FFCDD2',
			  },
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("daisyui")],
};

