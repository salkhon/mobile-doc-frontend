import React from "react";
import { useAuth } from "../../hooks/auth";
import DoctorDash from "./DoctorDash/main";
import PatientDash from "./PatientDash/main";
export function Home() {
	const { userName, userType } = useAuth();

	if (userType === "doctor") {
		return (
			<DoctorDash />
		);
	}

	if (userType === "patient") {
		return (
			<PatientDash />
		);
	}

}

export default Home;
