import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { PageLoader } from "../pageloader";
import { Box } from "@mui/material";

export function AuthenticationGuard({ component }) {
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => (
			<Box>
				<PageLoader />
			</Box>
		),
	});

	return <Component />;
}
