import React from "react";
import Header from "../global/Header";
import { Box } from "@mui/material";
import { useAuth } from "../../hooks/auth";

export function Dashboard() {
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

export default Dashboard;
