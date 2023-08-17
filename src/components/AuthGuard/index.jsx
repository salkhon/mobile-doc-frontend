import React, { useContext } from "react";
import { UserContext } from "../LoginPage/UserContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ element }) {
	const { user } = useContext(UserContext);

	if (!user) {
		console.log(user);
		return <Navigate to="/login" />;
	}

	return element;
}
