import { ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { themeSettings } from "../../theme";

// context structure for color mode
export const ColorModeContext = createContext({
	colorMode: "light",
	toggleColorMode: () => {},
});

export function ColorModeAndThemeProvider({ children }) {
	const modeInStorage = localStorage.getItem("mode") ?? "dark";
	const [mode, setMode] = useState(modeInStorage);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	// upon change of context state, update localStorage
	useEffect(() => {
		localStorage.setItem("mode", mode);
	}, [mode]);

	const colorModeCtxVal = useMemo(() => {
		return {
			colorMode: mode,
			toggleColorMode: () =>
				setMode((prev) => (prev === "light" ? "dark" : "light")),
		};
	}, [mode]);

	return (
		<ColorModeContext.Provider value={colorModeCtxVal}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
