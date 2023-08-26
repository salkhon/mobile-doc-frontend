import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
axios.defaults.headers.post["Content-Type"] = "application/json";

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

/**
 * Hooks: The purpose of react hooks is to replace class components with functional components. So react hooks
 * try to replicate class behaviors via function calls.
 */
