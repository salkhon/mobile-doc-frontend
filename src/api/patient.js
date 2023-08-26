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
    const [patientId] = queryKey;
    console.log("GET patient EHR", patientId);
    let resp = await axios.get(`/patient/EHR/${patientId}`)
    console.log(resp);
    return resp.data.patient_details
}

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

export async function addPatientPhyAttr(userId, prevData, formData) {
    console.log("PUT patient phy attr", formData);
    let resp = await axios.put(`/patient/${userId}`, addedPhyAttrFormDataToPatientObj(prevData, formData));
    console.log(resp);
    return resp.data;
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

export function addedPhyAttrFormDataToPatientObj(prevData, {
    name,
    value,
    dateAdded,
}) {
    return {
        ...prevData,
        general_information: { ...prevData.general_information },
        physical_attributes: [...prevData.physical_attributes, {
            name: name, value: value, date_added: dateAdded
        }]
    }
}