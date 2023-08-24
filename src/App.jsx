import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ColorModeAndThemeProvider } from "./contexts/ColorModeAndThemeContext";
import { Box, CssBaseline } from "@mui/material";
import PokedocRoutes from "./routes";
import BackgroundImage from "./components/Image/BackgroundImage";

export default function App() {
	return (
		<ColorModeAndThemeProvider>
			<AuthProvider>
				<CssBaseline />
				<BackgroundImage />

				<Box className="app">
					<PokedocRoutes />
				</Box>
			</AuthProvider>
		</ColorModeAndThemeProvider>
	);
}
