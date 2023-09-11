import axios from "axios";

export async function postLogin({ queryKey }) {
    const [username, password] = queryKey;
    console.log("POST login", username, password)
    let resp = await axios.post("/login", {
        id: username,
        password: password
    },)
    console.log("LOGIN RESPONSE", resp)
    return resp.data;
}

export async function getNotifications({ queryKey }) {
    const [, userId] = queryKey;
    console.log("GET notification", userId);
    const { data } = await axios.get("/notification");
    console.log(data);
    return data;
}