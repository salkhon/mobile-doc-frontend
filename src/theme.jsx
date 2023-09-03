// color design tokens
export function tokens(mode) {
	return mode === "dark"
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
					100: "#b0fff",
					200: "#65f9ff",
					300: "#33c7ff",
					400: "#0195FD",
					500: "#131b2d",
					600: "#0B3E84",
					700: "#072855",
					800: "#031266",
					900: "#000000",
				},
				secondary: {
					100: "#53030d",
					200: "#850414",
					300: "#b6061b",
					400: "#e80722",
					500: "#f92942",
					600: "#bf003c",
					700: "#8c002c",
					800: "#59001c",
					900: "#26000c",
				},
				greenAccent: {
					100: "#dbf5ee",
					200: "#b7ebde",
					300: "#94e2cd",
					400: "#70d8bd",
					500: "#4cceac",
					600: "#3da58a",
					700: "#2e7c67",
					800: "#1e5245",
					900: "#0f2922",
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
					100: "#000000",
					200: "#031266",
					300: "#072855",
					400: "#0B3E84",
					500: "#131b2d",
					600: "#0195FD",
					700: "#33c7ff",
					800: "#65f9ff",
					900: "#b0fff",
				},
				secondary: {
					100: "#26000c",
					200: "#59001c",
					300: "#8c002c",
					400: "#bf003c",
					500: "#f92942",
					600: "#e80722",
					700: "#b6061b",
					800: "#850414",
					900: "#53030d",
				},
				greenAccent: {
					100: "#0f2922",
					200: "#1e5245",
					300: "#2e7c67",
					400: "#3da58a",
					500: "#4cceac",
					600: "#70d8bd",
					700: "#94e2cd",
					800: "#b7ebde",
					900: "#dbf5ee",
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
							main: colors.secondary[500],
						},
						tertiary: {
							main: colors.greenAccent[300],
						},
						neutral: {
							dark: colors.grey[700],
							main: colors.grey[500],
							light: colors.grey[100],
						},
						background: {
							default: colors.primary[500],
						},
				  }
				: {
						primary: {
							main: colors.primary[600],
						},
						secondary: {
							main: colors.secondary[500],
						},
						tertiary: {
							main: colors.greenAccent[300],
						},
						neutral: {
							dark: colors.grey[700],
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
