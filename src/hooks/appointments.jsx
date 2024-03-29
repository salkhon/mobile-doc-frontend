import { useQuery } from "react-query";
import { getAppointments } from "../api/session";
import { useEffect, useState } from "react";

export function useAppointments(userId, userType) {
	// todo: not necessary, can useMutation
	const [appointments, setAppointments] = useState([]);

	const { data, isLoading, error } = useQuery(
		["getAppts", userId, userType],
		getAppointments
	);

	useEffect(() => {
		if (data) {
			setAppointments(data);
		}
	}, [data]);

	return {
		appointments: appointments,
		setAppointments: setAppointments,
		isApptsLoading: isLoading,
		apptErr: error,
	};
}
