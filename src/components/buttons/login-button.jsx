import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

export function LoginButton() {
	const { loginWithRedirect } = useAuth0();

	async function handleLogin() {
		await loginWithRedirect({
			appState: {
				returnTo: "/",
			},
		});
	}

	return (
		<Button variant="contained" color="primary" onClick={handleLogin}>
			Log In
		</Button>
	);
}
