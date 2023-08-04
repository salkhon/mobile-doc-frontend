import React from "react";
import Header from "../global/Header";
import { Box } from "@mui/material";

export function LandingPage() {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			margin="20px"
		>
			<Header
				title="LandingPage"
				subtitle="Welcome to your LandingPage"
			/>
		</Box>
	);
}
