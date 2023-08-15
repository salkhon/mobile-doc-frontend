import { createContext } from "react";

export const UserContext = createContext({
	userType: "",
	id: "",
	name: "",
	token: "",
});
