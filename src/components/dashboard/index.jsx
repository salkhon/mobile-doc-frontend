import React from "react";
import Header from "../global/Header";
import { Box } from "@mui/material";

const Dashboard = () => {
	return (
		<Box display="flex" justifyContent="space-between" alignItems="center" margin="20px">
			<Header title="Dashboard" subtitle="Welcome to your dashboard" />
		</Box>
	);
};

export default Dashboard;
