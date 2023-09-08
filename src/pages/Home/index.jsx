import React from "react";
import { Grid } from "@mui/material";
import { useAuth } from "../../hooks/auth";
import Header from "../../components/Header/Header";
import DoctorHome from "./DoctorHome";
import PatientHome from "./PatientHome";

export default function Home() {
	const { userName, userType } = useAuth();

	return (
		<Grid
			container
			justifyContent="space-between"
			alignItems="center"
			margin="20px 0 20px 20px"
			width="97.7%"
		>
			<Grid item xs={12}>
				<Header
					title="Home"
					subtitle={`Welcome, ${userType} ${userName}`}
				/>
			</Grid>
			{userType === "doctor" ? <DoctorHome /> : <PatientHome />}
		</Grid>
	);
}
