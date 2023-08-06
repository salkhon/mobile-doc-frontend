import React from "react";
import Header from "../global/Header";
import { Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../login/UserContext";

export function Dashboard() {
	const user = useContext(UserContext);
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			margin="20px"
		>
			<Header
				title="Dashboard"
				subtitle={`Welcome to your dashboard, ${user?.userType}`}
			/>
		</Box>
	);
}

export default Dashboard;
