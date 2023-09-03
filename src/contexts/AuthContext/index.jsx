import React from "react";
import { createContext, useMemo, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({
	token: "",
	setToken: (token) => {},
	userId: "",
	setUserId: (userId) => {},
	userName: "",
	setUserName: (userName) => {},
	userType: "",
	setUserType: (userType) => {},
});

export function AuthProvider({ children }) {
	const userInfo = getLocalStorageUserInfo();

	const [token, setToken] = useState(userInfo.token);
	const [userId, setUserId] = useState(userInfo.userId);
	const [userName, setUserName] = useState(userInfo.userName);
	const [userType, setUserType] = useState(userInfo.userType);

	// upon change of context state, update localStorage
	if (token) {
		axios.defaults.headers["Authorization"] = `Bearer ${token}`;
		setLocalStorageUserInfo({ token, userId, userName, userType });
	} else {
		delete axios.defaults.headers["Authorization"];
		removeLocalStorageUserInfo();
	}

	const authContextVal = useMemo(
		() => ({
			token,
			setToken,
			userId,
			setUserId,
			userName,
			setUserName,
			userType,
			setUserType,
		}),
		[token, userId, userName, userType]
	);

	return (
		<AuthContext.Provider value={authContextVal}>
			{children}
		</AuthContext.Provider>
	);
}

function getLocalStorageUserInfo() {
	return {
		token: localStorage.getItem("token"),
		userId: localStorage.getItem("userId"),
		userName: localStorage.getItem("userName"),
		userType: localStorage.getItem("userType"),
	};
}

function setLocalStorageUserInfo(userInfo) {
	for (let key of ["token", "userId", "userName", "userType"]) {
		localStorage.setItem(key, userInfo[key]);
	}
}

export function removeLocalStorageUserInfo() {
	for (let key of ["token", "userId", "userName", "userType"]) {
		localStorage.removeItem(key);
	}
}
