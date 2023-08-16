import React, { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/global/Topbar";
import AppSidebar from "./components/global/AppSidebar";
import Dashboard from "./components/dashboard";
import { Route, Routes } from "react-router-dom";
import Team from "./components/team";
import Contacts from "./components/contacts";
import Invoices from "./components/invoices";
import Form from "./components/form";
import Calendar from "./components/Calendar";
import { LoginPage } from "./components/login";
import { UserContext } from "./components/login/UserContext"
import NewAppointment from "./components/NewAppointment";

function App() {
    const [theme, colorModeCtxVal] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [user, setUser] = useState(null);

    return (
        <ColorModeContext.Provider value={colorModeCtxVal}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <UserContext.Provider value={ user }>
                    <Box className="app">
                        {user && (
                            <AppSidebar
                                isSidebar={isSidebar}
                                setIsSidebar={setIsSidebar}
                            />
                        )}
                        <main className="content">
                            <Topbar />
                            <Routes>
                                <Route path="/" element={<LoginPage setUser={setUser} />} />
                                <Route path="/newsession" element={<NewAppointment />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/team" element={<Team />} />
                                <Route path="/contacts" element={<Contacts />} />
                                <Route path="/invoices" element={<Invoices />} />
                                <Route path="/form" element={<Form />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/faq" element={<Dashboard />} />
                                <Route path="/bar" element={<Dashboard />} />
                                <Route path="/pie" element={<Dashboard />} />
                                <Route path="/line" element={<Dashboard />} />
                                <Route path="/geography" element={<Dashboard />} />
                            </Routes>
                        </main>
                    </Box>
                </UserContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
