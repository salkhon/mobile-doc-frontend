import React from "react";
import { useSearchParams } from "react-router-dom";
import AllAppointments from "./AllAppointments";
import { useAuth } from "../../hooks/auth";
import DoctorAppointment from "./DoctorAppoinment";
import PatientAppointment from "./PatientAppointment";

export default function Appointments() {
	const { userType } = useAuth();
	const [searchParams] = useSearchParams();

	if (!searchParams.has("id")) {
		return <AllAppointments />;
	}

	return userType === "doctor" ? (
		<DoctorAppointment />
	) : (
		<PatientAppointment />
	);
}
