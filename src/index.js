import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // allow us to use react router and setup routers
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <App />
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    </React.StrictMode>
);

/**
 * Hooks: The purpose of react hooks is to replace class components with functional components. So react hooks
 * try to replicate class behaviors via function calls.
 */
