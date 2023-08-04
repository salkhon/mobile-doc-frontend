import React from "react";
import Header from "../global/Header";
import { Box } from "@mui/material";

export function LoginPage() {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			margin="20px"
		>
			<Header
				title="Login Page"
				subtitle="Welcome to your Login Page"
			/>
		</Box>
	);
}
