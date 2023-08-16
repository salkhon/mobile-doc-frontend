import { createContext } from "react";

export const UserContext = createContext({
	user: {
		userType: "",
		id: "",
		name: "",
		token: "",
	},
	setUser: (...arg) => {},
});
