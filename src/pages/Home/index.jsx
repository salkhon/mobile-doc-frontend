import React from "react";
import { useAuth } from "../../hooks/auth";
import PDB from "./PatientDash/main";
export function Home() {
	const { userName, userType } = useAuth();
	
	return (
		// <Box
		// 	display="flex"
		// 	justifyContent="space-between"
		// 	alignItems="center"
		// 	margin="20px"
		// >
		// 	<Header
		// 		title="Dashboard"
		// 		subtitle={`Welcome to your dashboard, ${userType} ${userName}`}
		// 	/>
		// </Box>
		<PDB name={userName} />
	);
}

export default Home;
