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

    let resp;
    let sessions;
    if (userType === "patient") {
        resp = await axios.get(`/patient/EHR/${userId}`);
        console.log("patient response", resp)
        sessions = resp.data.patient_sessions;
    } else if (userType === "doctor") {
        resp = await axios.get(`/doctor/${userId}`)
        sessions = resp.data.doctor.calendar.map(session => ({
            start_time: session.session_starttime,
            end_time: session.session_endtime
        }));
    }
    return sessions;
}
