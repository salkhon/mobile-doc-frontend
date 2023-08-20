import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import React, { useState } from "react";
import AppSidebar from "../global/AppSidebar";
import Topbar from "../global/Topbar";

export function PrivateRoute() {
	const { token } = useAuth();
	const location = useLocation();

	// side bar is for authenticated users only
	const [isSidebar, setIsSidebar] = useState(false);

	if (!token) {
		return (
			<Navigate
				to="/login"
				replace={true}
				state={{
					from: location,
				}}
			/>
		);
	}

	return (
		<>
			<AppSidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
			<main
				className="content"
				style={{
					backgroundColor: `rgba(19, 27, 45, 0.9)`,
				}}
			>
				<Topbar />

				{/* ROUTES THAT ARE WRAPPED BY <PrivateRoute /> */}
				<Outlet />
			</main>
		</>
	);
}
