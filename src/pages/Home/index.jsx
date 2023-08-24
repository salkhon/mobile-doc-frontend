import React from "react";
import { Box } from "@mui/material";
import { useAuth } from "../../hooks/auth";
import Header from "../../components/Header/Header";

export function Home() {
	const { userName, userType } = useAuth();

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			margin="20px"
		>
			<Header
				title="Dashboard"
				subtitle={`Welcome to your dashboard, ${userType} ${userName}`}
			/>
		</Box>
	);
}

export default Home;
