/**
 * PATIENT SPECIFIC API CALLS
 */

import axios from "axios";

export async function getCreateNewAppt({ queryKey }) {
    const [userId] = queryKey
    console.log("GET new appt id", userId)
    let resp = await axios.get(`/session/new/${userId}`);
    console.log(resp)
    return resp.data.created_session_id;
}

export async function postSymtomsOnAppointment({ queryKey }) {
    const [apptId, userType, symptoms] = queryKey;
    console.log("POST symptoms on session", apptId, userType, symptoms);
    let resp = await Promise.all(symptoms.map(symptom =>
        axios.post(`/session/symptoms/${apptId}`, {
            symptom_name: symptom,
            duration: 1,
            added_by: userType
        })
    ))
    console.log(resp);
    return resp;
}

export async function getSuggestedDoctors({ queryKey }) {
    const [apptId] = queryKey;
    console.log("GET suggested doctors", apptId);
    let resp = await axios.get(`/session/suggested_doctors/${apptId}`);
    console.log(resp);
    const suggestedDoctors = resp.data.suggested_doctors;
    return suggestedDoctors;
}

export async function postApptDoctor({ queryKey }) {
    const [apptId, doctorId] = queryKey;
    console.log("POST appt doctor", apptId, doctorId);
    let resp = await axios.post(`/session/update_session_doctor/${apptId}/?input_doctor_id=${doctorId}`);
    console.log(resp);
    return resp;
}

export async function postApptTime({ queryKey }) {
    const [apptId, timeStr] = queryKey;
    console.log("POST appt time", apptId, timeStr)
    let resp = await axios.post(`/session/update_session_time/${apptId}`, {
        start_time: timeStr,
        end_time: timeStr
    })
    console.log(resp);
    return resp
}