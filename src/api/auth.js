import axios from "axios";

export async function postLogin({ queryKey }) {
    const [email, password] = queryKey;
    console.log(email, password)
    let resp = await axios.post("/patient/login", {
        patient_id: email,
        password: password
    },)
    console.log("LOGIN RESPONSE", resp)
    return resp.data;
}