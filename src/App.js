import React, { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import AppSidebar from "./scenes/global/AppSidebar"
import Dashboard from "./scenes/dashboard"
import { Route, Routes } from "react-router-dom";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";

function App() {
	const [theme, colorModeCtxVal] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

	return (
		<ColorModeContext.Provider value={colorModeCtxVal}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box className="app">
                    <AppSidebar isSidebar={isSidebar} />
					<main className="content">
						<Topbar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/form" element={<Dashboard />} />
                            <Route path="/calendar" element={<Dashboard />} />
                            <Route path="/faq" element={<Dashboard />} />
                            <Route path="/bar" element={<Dashboard />} />
                            <Route path="/pie" element={<Dashboard />} />
                            <Route path="/line" element={<Dashboard />} />
                            <Route path="/geography" element={<Dashboard />} />
                        </Routes>
					</main>
				</Box>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
