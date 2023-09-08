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
    const [, userId, userType] = queryKey;
    console.log("GET appointments", userId, userType);
    const { data } = await axios.get(`/${userType}/${userId}/all_sessions`);
    console.log(data);
    const sessions = userType === "patient" ? data.patient_sessions : data.doctor_sessions;
    return sessions;
}

export async function getAppointment({ queryKey }) {
    const [, apptId] = queryKey;
    console.log("GET appointment", apptId)
    let { data } = await axios.get(`/session/${apptId}`);
    console.log(data)
    return data.session;
}

export async function getAllMeds() {
    console.log("GET all meds");
    const { data } = await axios.get("/medicine/all");
    console.log(data)
    return data;
}

export async function putPrescription({ apptId, prescription }) {
    console.log("PUT prescription", prescription);
    const { data } = await axios.put(`/session/update_prescription/${apptId}`, prescription);
    console.log(data);
    return data;
}
