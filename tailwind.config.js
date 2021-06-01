module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#003d4d;",
			},
			spacing: {
				101: "24rem",
				102: "53.75rem",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
