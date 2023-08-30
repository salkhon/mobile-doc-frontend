/**
 * PATIENT SPECIFIC API CALLS
 */

import axios from "axios";

export async function getPatient(patientId) {
    console.log("GET patient", patientId);
    let resp = await axios.get(`/patient/${patientId}`);
    console.log(resp)
    return resp.data.patient;
}

export async function getPatientEHR({ queryKey }) {
    const [, patientId] = queryKey;
    console.log("GET patient EHR", patientId);
    let resp = await axios.get(`/patient/EHR/${patientId}`)
    console.log(resp);
    return resp.data.patient_details
}

export async function getCreateNewAppt({ queryKey }) {
    const [, userId] = queryKey
    console.log("GET new appt id", userId)
    let { data } = await axios.get(`/session/new/${userId}`);
    console.log(data)
    return data;
}

export async function postSymtomsOnAppointment({ apptId, userType, symptom }) {
    console.log("POST symptoms on session", apptId, userType, symptom);
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
            blood_group: "AB+",
            allergies: [
                "Peanuts",
                "Shellfish"
            ],
            heart_condition: true,
            diabetes: true,
            smoking_history: true,
            asthema: true,
            liver_problem: true,
            kidney_problem: true
        },
        physical_attributes: [
            {
                name: "Height",
                value: 170.5,
                date_added: "2022-01-01"
            }
        ]
    });
    console.log(resp)
    return resp.data;
}

export async function updatePatientInfo(userId, newData) {
    console.log("PUT patient profile info", newData);
    const { data } = await axios.put(`/patient/${userId}`, newData);
    console.log(data);
    return data
}

export function edittedPatientInfoToPatientObject(prevData, {
    name,
    email,
    dateOfBirth,
    address,
    phoneNum,
    id,
    profession,
    bloodGroup,
    allergies,
    heartCondition,
    diabetes,
    smokingHistory,
    asthma,
    liverProblem,
    kidneyProblem,
    physicalAttrs
}) {
    return {
        ...prevData,

        name: name,
        identification_no: id,
        date_of_brth: dateOfBirth,
        address: address,
        phone_no: phoneNum,
        email: email,
        profession: profession,
        general_information: {
            blood_group: bloodGroup,
            allergies: allergies,
            heart_condition: heartCondition,
            diabetes: diabetes,
            smoking_history: smokingHistory,
            asthema: asthma,
            liver_problem: liverProblem,
            kidney_problem: kidneyProblem,
        },
        physical_attributes: physicalAttrs
    };
}