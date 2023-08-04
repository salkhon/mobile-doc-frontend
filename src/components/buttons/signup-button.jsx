import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React from "react";

export const SignupButton = () => {
	const { loginWithRedirect } = useAuth0();

	const handleSignUp = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: "/",
			},
			authorizationParams: {
				screen_hint: "signup",
			},
		});
	};

	return (
		<Button variant="contained" color="primary" onClick={handleSignUp}>
			Sign Up
		</Button>
	);
};
