import React, { useEffect, useState } from "react";
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
import { LoginPage } from "./components/LoginPage";
import { UserContext } from "./components/LoginPage/UserContext"
import NewAppointment from "./components/NewAppointment";
import BackgroundImage from "./components/global/BackgroundImage";
import { LandingPage } from "./components/LandingPage";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
    const [theme, colorModeCtxVal] = useMode();

    const [isSidebar, setIsSidebar] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("setting user");
        const token = localStorage.getItem("pokedoc_token");
        if (token === "patient") {
            setUser({
                userType: "patient",
                id: "0001",
                name: "Salman",
                token: "patient",
            });
        } else if (token === "doctor") {
            setUser({
                userType: "doctor",
                id: "0001",
                name: "Salman",
                token: "doctor",
            });
        } else {
            setUser(null);
        }
    }, [setUser]);

    return (
        <ColorModeContext.Provider value={colorModeCtxVal}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <UserContext.Provider value={{ user, setUser }}>
                    {/* BLURRED IMAGE IN THE BG */}
                    <BackgroundImage />

                    {/* MAIN APP */}
                    <Box className="app">
                        {/* SIDE  BAR */}
                        {user && (
                            <AppSidebar
                                isSidebar={isSidebar}
                                setIsSidebar={setIsSidebar}
                            />
                        )}

                        {/* APP CONTENT */}
                        <main className="content" style={{
                            backgroundColor: `rgba(19, 27, 45, ${user ? 0.9 : 0})`,
                        }}>
                            {user && <Topbar />}
                            <Routes>
                                {/* PUBLIC */}
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<LoginPage />} />

                                {/* AUTH REQUIRED */}
                                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                <Route path="/newsession" element={<PrivateRoute><NewAppointment /></PrivateRoute>} />
                                <Route path="/team" element={<PrivateRoute><Team /></PrivateRoute>} />
                                <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
                                <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
                                <Route path="/form" element={<PrivateRoute><Form /></PrivateRoute>} />
                                <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
                                <Route path="/faq" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                <Route path="/bar" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                <Route path="/pie" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                <Route path="/line" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                <Route path="/geography" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                            </Routes>
                        </main>
                    </Box>
                </UserContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
