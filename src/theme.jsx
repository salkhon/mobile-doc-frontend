// color design tokens
export function tokens(mode) {
	return mode === "dark" // todo: reverse
		? {
				grey: {
					100: "#e0e0e0",
					200: "#c2c2c2",
					300: "#a3a3a3",
					400: "#858585",
					500: "#666666",
					600: "#525252",
					700: "#3d3d3d",
					800: "#292929",
					900: "#141414",
				},
				primary: {
					50: "#e3f3fe",
					100: "#bbe0ff",
					200: "#8fcdff",
					300: "#60baff",
					400: "#39aaff",
					500: "#019cff",
					600: "#028df1",
					700: "#007bde",
					800: "#006acc",
					900: "#004bad",
				},
				secondary: {
					50: "#ffe8ed",
					100: "#ffc6cf",
					200: "#f78d92",
					300: "#ef5d67",
					400: "#fa2840",
					500: "#ff0020",
					600: "#f00022",
					700: "#df001c",
					800: "#d20014",
					900: "#c20005",
				},
				greenAccent: {
					50: "#d6f9f5",
					100: "#95eee3",
					200: "#04e3d0",
					300: "#00d4bb",
					400: "#00c5a9",
					500: "#00b898",
					600: "#00a989",
					700: "#009877",
					800: "#008768",
					900: "#006948",
				},
				redAccent: {
					100: "#f8dcdb",
					200: "#f1b9b7",
					300: "#e99592",
					400: "#e2726e",
					500: "#FD2A43",
					600: "#af3f3b",
					700: "#832f2c",
					800: "#58201e",
					900: "#2c100f",
				},
				blueAccent: {
					100: "#e1e2fe",
					200: "#c3c6fd",
					300: "#a4a9fc",
					400: "#3788D8",
					500: "#6870fa",
					600: "#535ac8",
					700: "#3e4396",
					800: "#2a2d64",
					900: "#151632",
				},
		  }
		: {
				grey: {
					100: "#141414",
					200: "#292929",
					300: "#3d3d3d",
					400: "#525252",
					500: "#666666",
					600: "#858585",
					700: "#a3a3a3",
					800: "#c2c2c2",
					900: "#e0e0e0",
				},
				primary: {
					50: "#004bad",
					100: "#006acc",
					200: "#007bde",
					300: "#028df1",
					400: "#019cff",
					500: "#39aaff",
					600: "#60baff",
					700: "#8fcdff",
					800: "#bbe0ff",
					900: "#e3f3fe",
				},
				secondary: {
					50: "#c20005",
					100: "#d20014",
					200: "#df001c",
					300: "#f00022",
					400: "#ff0020",
					500: "#fa2840",
					600: "#ef5d67",
					700: "#f78d92",
					800: "#ffc6cf",
					900: "#ffe8ed",
				},
				greenAccent: {
					50: "#006948",
					100: "#008768",
					200: "#009877",
					300: "#00a989",
					400: "#00b898",
					500: "#00c5a9",
					600: "#00d4bb",
					700: "#04e3d0",
					800: "#95eee3",
					900: "#d6f9f5",
				},
				redAccent: {
					100: "#2c100f",
					200: "#58201e",
					300: "#832f2c",
					400: "#af3f3b",
					500: "#db4f4a",
					600: "#e2726e",
					700: "#e99592",
					800: "#f1b9b7",
					900: "#f8dcdb",
				},
				blueAccent: {
					100: "#151632",
					200: "#2a2d64",
					300: "#3e4396",
					400: "#535ac8",
					500: "#6870fa",
					600: "#868dfb",
					700: "#a4a9fc",
					800: "#c3c6fd",
					900: "#e1e2fe",
				},
		  };
}

// mui theme settings
export function themeSettings(mode) {
	const colors = tokens(mode);
	return {
		palette: {
			mode: mode,
			...(mode === "dark"
				? {
						primary: {
							main: colors.primary[600],
						},
						secondary: {
							main: colors.secondary[400],
						},
						tertiary: {
							main: colors.greenAccent[200],
						},
						neutral: {
							dark: colors.grey[700],
							main: colors.grey[500],
							light: colors.grey[100],
						},
						background: {
							default: colors.primary[900],
						},
				  }
				: {
						primary: {
							main: colors.primary[600],
						},
						secondary: {
							main: colors.secondary[400],
						},
						tertiary: {
							main: colors.greenAccent[300],
						},
						neutral: {
							dark: colors.grey[900],
							main: colors.grey[500],
							light: colors.grey[100],
						},
						background: {
							default: "#fcfcfc",
						},
				  }),
		},
		typography: {
			fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
	};
}
