/**
 * DOCTOR SPECIFIC API CALLS
 */

import axios from "axios";

export async function getDoctor({ queryKey }) {
    const [, doctorId] = queryKey;
    console.log("GET doctor", doctorId);
    let { data } = await axios.get(`/doctor/${doctorId}`);
    console.log(data)
    return data.doctor;
}

export async function postDoctor({ doctorId, edittedDoctor }) {
    console.log("POST doctor", doctorId, edittedDoctor);
    delete edittedDoctor.calendar;
    let { data } = await axios.put(`/doctor/${doctorId}`, edittedDoctor);
    console.log(data);
    return data;
}

export async function postDoctorSignup({ username, fullname, email, password, degrees, speciality }) {
    console.log("POST doctor signup", username, fullname, email, password, degrees, speciality);
    let resp = await axios.post("/doctor/new", {
        doctor_id: username,
        name: fullname,
        email: email,
        password: password,
        designation: "Consultant",
        degrees: degrees,
        speciality: speciality,
        availability: [
            {
                day_of_the_week: "mon",
                day_start_times: [
                    "09:00:00",
                    "09:15:00",
                    "09:30:00",
                    "09:45:00"
                ]
            },
            {
                day_of_the_week: "tue",
                day_start_times: [
                    "09:00:00",
                    "09:15:00",
                    "09:30:00",
                    "09:45:00"
                ]
            },
            {
                day_of_the_week: "wed",
                day_start_times: [
                    "09:00:00",
                    "09:15:00",
                    "09:30:00",
                    "09:45:00"
                ]
            },
            {
                day_of_the_week: "thu",
                day_start_times: [
                    "09:00:00",
                    "09:15:00",
                    "09:30:00",
                    "09:45:00"
                ]
            },
            {
                day_of_the_week: "fri",
                day_start_times: [
                    "09:00:00",
                    "09:15:00",
                    "09:30:00",
                    "09:45:00"
                ]
            },
            {
                day_of_the_week: "sat",
                day_start_times: [
                    "09:00:00",
                    "09:15:00",
                    "09:30:00",
                    "09:45:00"
                ]
            },
            {
                day_of_the_week: "sun",
                day_start_times: [
                    "09:00:00",
                    "09:15:00",
                    "09:30:00",
                    "09:45:00"
                ]
            }
        ]
    })
    return resp.data;
}