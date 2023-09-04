import React from "react";
import { useAuth } from "../../hooks/auth";
import PDB from "./DoctorDash/main";
import PDB2 from "./PatientDash/main";
export function Home() {
	const { userName, userType } = useAuth();

	if (userType === "doctor") {
		return (
			<PDB />
		);
	}

	if (userType === "patient") {
		return (
			<PDB2 />
		);
	}

}

export default Home;
