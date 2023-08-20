import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { LandingPage } from "../components/LandingPage";
import React from "react";
import NewAppointment from "../components/NewAppointment";
import Calendar from "../components/Calendar";
import AppointmentPage from "../components/AppointmentPage";
import { LoginPage } from "../components/LoginPage";
import { PrivateRoute } from "../components/PrivateRoute";
import Dashboard from "../components/DashboardPage";
import PatientSignupPage from "../components/SignupPage/patient";
import DoctorSignupPage from "../components/SignupPage/doctor";

export default function PokedocRoutes() {
	const { token } = useAuth();

	// only unauthenticated users can access these
	const routesForNotAuthOnly = [
		{
			path: "/",
			element: <LandingPage />,
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: "/signup",
			element: <PatientSignupPage />,
		},
		{
			path: "/doctorsignup",
			element: <DoctorSignupPage />,
		},
	];

	// only authenticated users can access these
	const routesForAuthOnly = [
		{
			path: "/",
			element: <PrivateRoute />,
			children: [
				{
					path: "/",
					element: <Dashboard />,
				},
				{
					path: "/newsession",
					element: <NewAppointment />,
				},
				{
					path: "/calendar",
					element: <Calendar />,
				},
				{
					path: "/appointment",
					element: <AppointmentPage />,
				},
			],
		},
	];

	// unathenticated users get redirected to /login if trying to access private routes
	// authenticated users can't see `routesForNotAuthOnly` at all because they don't exist for them
	const router = createBrowserRouter([
		...(!token ? routesForNotAuthOnly : []),
		...routesForAuthOnly,
	]);

	return <RouterProvider router={router} />;
}
