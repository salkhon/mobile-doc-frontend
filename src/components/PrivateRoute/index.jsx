import React, { useContext } from "react";
import { UserContext } from "../LoginPage/UserContext";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }) {
	const { user } = useContext(UserContext);
	const location = useLocation();

	// needs to happend before browser paints the screen
	if (!user) {
		return (
			<Navigate
				to="/login"
				replace
				state={{
					from: location,
				}}
			/>
		);
	}

	return children;
}
