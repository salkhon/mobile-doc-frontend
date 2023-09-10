import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { removeLocalStorageUserInfo } from "./contexts/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 30e3,
            retry: false
        }
    }
});

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.response.use(resp => resp, err => {
    if (err?.response?.status === 401) {
        // logout
        removeLocalStorageUserInfo();
        return <Navigate to="/" />
    }
    return Promise.reject(err);
})

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

/**
 * Hooks: The purpose of react hooks is to replace class components with functional components. So react hooks
 * try to replicate class behaviors via function calls.
 */
