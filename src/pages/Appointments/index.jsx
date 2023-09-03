import React from "react";
import { useSearchParams } from "react-router-dom";
import SingleAppointment from "./SingleAppointment";

export default function Appointments() {
    // todo: if query param is present - single appointment, otherwise all appointments
    const [searchParams] = useSearchParams();

    if (searchParams.has("id")) {
        return <SingleAppointment />
    }
    return <h2>ALL Appointments</h2>
}