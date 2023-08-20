import axios from "axios";

export async function postLogin({ queryKey }) {
    const [username, password] = queryKey;
    console.log(username, password)
    let resp = await axios.post("/login", {
        id: username,
        password: password
    },)
    console.log("LOGIN RESPONSE", resp)
    return resp.data;
}