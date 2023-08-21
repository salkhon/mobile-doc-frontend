import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import React, { useState } from "react";
import AppSidebar from "../global/AppSidebar";
import Topbar from "../global/Topbar";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const opacity = "C8";

export function PrivateRoute() {
	const { token } = useAuth();
	const location = useLocation();

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

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
					backgroundColor: `${colors.primary[900]}${opacity}`,
				}}
			>
				<Topbar />

				{/* ROUTES THAT ARE WRAPPED BY <PrivateRoute /> */}
				<Outlet />
			</main>
		</>
	);
}
