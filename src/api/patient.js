/**
 * PATIENT SPECIFIC API CALLS
 */

import axios from "axios";

export async function getPatient({ queryKey }) {
    const [, patientId] = queryKey;
    console.log("GET patient", patientId);
    let { data } = await axios.get(`/patient/${patientId}`);
    console.log(data)
    return data;
}

export async function getPatientEHR({ queryKey }) {
    const [, patientId] = queryKey;
    console.log("GET patient EHR", patientId);
    let { data } = await axios.get(`/patient/EHR/${patientId}`)
    console.log(data);
    return data;
}

export async function getCreateNewAppt({ queryKey }) {
    const [, userId] = queryKey
    console.log("GET new appt id", userId)
    let { data } = await axios.get(`/session/new/${userId}`);
    console.log(data)
    return data;
}

export async function postSymtomOnAppointment({ apptId, userType, symptom }) {
    console.log("POST symptom on session", apptId, userType, symptom);
    let { data } = await axios.post(`/session/symptoms/${apptId}`, {
        symptom_name: symptom.symptom,
        duration: symptom.duration,
        added_by: userType
    })
    console.log(data);
    return data;
}

export async function getSuggestedDoctors({ queryKey }) {
    const [, apptId] = queryKey;
    console.log("GET suggested doctors", apptId);
    let { data } = await axios.get(`/session/suggested_doctors/${apptId}`);
    console.log(data);
    return data;
}

export async function postApptDoctor({ apptId, doctorId }) {
    console.log("POST appt doctor", apptId, doctorId);
    let { data } = await axios.post(`/session/update_session_doctor/${apptId}/?input_doctor_id=${doctorId}`);
    console.log(data);
    return data;
}

export async function postApptTime({ apptId, timeStr }) {
    console.log("POST appt time", apptId, timeStr)
    let { data } = await axios.post(`/session/update_session_time/${apptId}`, {
        start_time: timeStr,
        end_time: timeStr
    })
    console.log(data);
    return data
}

export async function postPatientSignup({ username, password, fullname, nid, dob, address, contact, email, profession }) {
    console.log("POST patient signup", username, password, fullname, nid, dob, address, contact, email, profession);
    let resp = await axios.post("/patient/new", {
        patient_id: username,
        password: password,
        name: fullname,
        identification_no: nid,
        date_of_brth: dob,
        address: address,
        phone_no: contact,
        email: email,
        profession: profession,
        general_information: {
            blood_group: "",
            allergies: [],
            heart_condition: false,
            diabetes: false,
            smoking_history: false,
            asthema: false,
            liver_problem: false,
            kidney_problem: false
        },
        physical_attributes: []
    });
    console.log(resp)
    return resp.data;
}

export async function putPatient({ userId, newData }) {
    console.log("PUT patient profile info", newData);
    const { data } = await axios.put(`/patient/${userId}`, newData);
    console.log(data);
    return data
}

export async function postReviewRequest({ queryKey }) {
    const [, apptId] = queryKey;
    console.log("POST review request", apptId);
    const { data } = await axios.post(`/review/request/${apptId}`);
    console.log(data)
    return data;
}

export async function getReview({ queryKey }) {
    const [, apptId] = queryKey;
    console.log("GET appt review", apptId);
    const { data } = await axios.get(`/review/${apptId}`);
    console.log(data);
    return data
}

/* API utils */
export function edittedPatientInfoToPatientObject(prevData, formData) {
    return {
        ...prevData,

        name: formData.name,
        identification_no: formData.id,
        date_of_brth: formData.dateOfBirth,
        address: formData.address,
        phone_no: formData.phoneNum,
        email: formData.email,
        profession: formData.profession,
        general_information: {
            blood_group: formData.bloodGroup,
            allergies: formData.allergies,
            heart_condition: formData.heartCondition,
            diabetes: formData.diabetes,
            smoking_history: formData.smokingHistory,
            asthema: formData.asthma,
            liver_problem: formData.liverProblem,
            kidney_problem: formData.kidneyProblem,
        },
        physical_attributes: formData.physicalAttrs
    };
}