import React, { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import AppSidebar from "./scenes/global/AppSidebar"
import Dashboard from "./scenes/dashboard"
import { Route, Routes } from "react-router-dom";

function App() {
	const [theme, colorModeCtxVal] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

	return (
		<ColorModeContext.Provider value={colorModeCtxVal}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
                    <AppSidebar isSidebar={isSidebar} />
					<main className="content">
						<Topbar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/team" element={<AppSidebar />} />
                            <Route path="/contacts" element={<Dashboard />} />
                            <Route path="/invoices" element={<Dashboard />} />
                            <Route path="/form" element={<Dashboard />} />
                            <Route path="/calendar" element={<Dashboard />} />
                            <Route path="/faq" element={<Dashboard />} />
                            <Route path="/bar" element={<Dashboard />} />
                            <Route path="/pie" element={<Dashboard />} />
                            <Route path="/line" element={<Dashboard />} />
                            <Route path="/geography" element={<Dashboard />} />
                        </Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
