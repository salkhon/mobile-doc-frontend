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
import Calendar from "./components/calendar";
import { useAuth0 } from "@auth0/auth0-react";
import { LandingPage } from "./components/landing";
import { PageLoader } from "./components/pageloader";
import { AuthenticationGuard } from "./components/authentication-guard";

function App() {
    const [theme, colorModeCtxVal] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <ColorModeContext.Provider value={colorModeCtxVal}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box className="app">
                    {isAuthenticated && (
                        <AppSidebar
                            isSidebar={isSidebar}
                            setIsSidebar={setIsSidebar}
                        />
                    )}
                    <main className="content">
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <>
                                <Topbar />
                                <Routes>
                                    <Route path="/" element={<LandingPage />} />
                                    <Route path="/dashboard" element={
                                        <AuthenticationGuard component={Dashboard}></AuthenticationGuard>} />
                                    <Route path="/team" element={
                                        <AuthenticationGuard component={Team}></AuthenticationGuard>} />
                                    <Route path="/contacts" element={
                                        <AuthenticationGuard component={Contacts}></AuthenticationGuard>} />
                                    <Route path="/invoices" element={
                                        <AuthenticationGuard component={Invoices}></AuthenticationGuard>} />
                                    <Route path="/form" element={
                                        <AuthenticationGuard component={Form}></AuthenticationGuard>} />
                                    <Route path="/calendar" element={
                                        <AuthenticationGuard component={Calendar}></AuthenticationGuard>} />
                                    <Route path="/faq" element={
                                        <AuthenticationGuard component={Dashboard}></AuthenticationGuard>} />
                                    <Route path="/bar" element={
                                        <AuthenticationGuard component={Dashboard}></AuthenticationGuard>} />
                                    <Route path="/pie" element={
                                        <AuthenticationGuard component={Dashboard}></AuthenticationGuard>} />
                                    <Route path="/line" element={
                                        <AuthenticationGuard component={Dashboard}></AuthenticationGuard>} />
                                    <Route path="/geography" element={
                                        <AuthenticationGuard component={Dashboard}></AuthenticationGuard>} />
                                </Routes>
                            </>
                        )}
                    </main>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
