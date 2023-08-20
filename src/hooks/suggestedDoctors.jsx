import { useQuery } from "react-query";
import {
	getCreateNewAppt,
	getSuggestedDoctors,
	postSymtomsOnAppointment,
} from "../api/patient";

export function useSuggestedDoctors(userId, userType, symptoms) {
	const newApptQuery = useQuery([userId], getCreateNewAppt, {
		enabled: false,
	}); // returns apptId

	const postSymptomsQuery = useQuery(
		[newApptQuery.data, userType, symptoms],
		postSymtomsOnAppointment,
		{
			enabled: newApptQuery.isFetchedAfterMount && !!newApptQuery.data,
		}
	); //  returns POST response

	const suggestedDoctorsQuery = useQuery(
		[newApptQuery.data],
		getSuggestedDoctors,
		{
			enabled:
				postSymptomsQuery.isFetchedAfterMount &&
				!!postSymptomsQuery.data,
			keepPreviousData: false,
		}
	); // returns suggeted doctors

	function executeQuery() {
		newApptQuery.refetch();
	}

	return {
		executeQuery,
		apptId: newApptQuery.data,
		isDoctorsLoading:
			newApptQuery.isFetching ||
			postSymptomsQuery.isFetching ||
			suggestedDoctorsQuery.isFetching,
		suggestedDoctors: suggestedDoctorsQuery.data,
	};
}
