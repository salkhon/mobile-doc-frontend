import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { LandingPage } from "../pages/Landing";
import React from "react";
import NewAppointment from "../pages/NewAppointment";
import { LoginPage } from "../pages/Login";
import { PrivateRoute } from "../components/PrivateRoute";
import PatientSignupPage from "../pages/Signup/patient";
import DoctorSignupPage from "../pages/Signup/doctor";
import Home from "../pages/Home";
import Calendar from "../pages/Calendar";
import Profile from "../pages/Profile";
import Appointments from "../pages/Appointments";

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
					element: <Home />,
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
					path: "/appointments",
					element: <Appointments />,
				},
				{
					path: "/profile",
					element: <Profile />,
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
