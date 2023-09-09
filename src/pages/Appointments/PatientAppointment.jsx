import React from "react";
import { useSearchParams } from "react-router-dom";

export default function PatientAppointment() {
	const [searchParams] = useSearchParams();

	return <h2>patient appt {searchParams.get("id")}</h2>;
}
