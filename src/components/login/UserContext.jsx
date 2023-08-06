import { createContext } from "react";

export const UserContext = createContext({
    userType: "", 
    id: "0001", 
    token: ""
});
