/**
 * General Session API Calls
 */

import axios from "axios";

export function getFormattedDateTime(dateTimeObj) {
    // dhrubo's time format
    const year = dateTimeObj.getFullYear();
    const month = String(dateTimeObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateTimeObj.getDate()).padStart(2, "0");
    const hour = String(dateTimeObj.getHours()).padStart(2, "0");
    const minute = String(dateTimeObj.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
}

export async function getAppointments({ queryKey }) {
    const [userId, userType] = queryKey;

    let resp, sessions;
    console.log("GET appointments", userId, userType);
    resp = await axios.get(`/${userType}/${userId}/all_sessions`);
    console.log(resp);
    sessions = userType === "patient" ? resp.data.patient_sessions : resp.data.doctor_sessions;
    return sessions;
}

export async function getAppointment({ queryKey }) {
    const [apptId] = queryKey;

    console.log("GET appointment", apptId)
    let resp = await axios.get(`/session/${apptId}`);
    console.log(resp)
    return resp.data.session;
}
