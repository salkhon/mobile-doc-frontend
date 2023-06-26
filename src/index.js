import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // allow us to use react router and setup routers

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

/**
 * Hooks: The purpose of react hooks is to replace class components with functional components. So react hooks 
 * try to replicate class behaviors via function calls. 
 */
