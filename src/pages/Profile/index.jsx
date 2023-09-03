import React from "react";
import { useAuth } from "../../hooks/auth";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";

export default function Profile() {
	// todo: check usertype, and have two subpages for doctor and patient
	const { userType } = useAuth();

	if (userType === "patient") {
		return <PatientProfile />;
	} else if (userType === "doctor") {
		return <DoctorProfile />;
	}
}
