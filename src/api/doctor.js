/**
 * DOCTOR SPECIFIC API CALLS
 */

import axios from "axios";

export async function getDoctor({ queryKey }) {
    const [doctorId] = queryKey;
    console.log("GET doctor", doctorId);
    let resp = await axios.get(`/doctor/${doctorId}`);
    console.log(resp)
    return resp.data.doctor;
}