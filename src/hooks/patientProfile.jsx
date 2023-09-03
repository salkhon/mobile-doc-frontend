import { useMutation, useQueryClient } from "react-query";
import { updatePatientInfo } from "../api/patient";

export function useEditPatientProfile(userId) {
	const queryClient = useQueryClient();

	return useMutation({
		// mutation function needs to return promise of request
		mutationFn: updatePatientInfo,
		// When mutate is called:
		onMutate: async ({ newData }) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			queryClient.cancelQueries({
				queryKey: ["patientProfile", userId],
			});

			// Optimistically update to the new value
			queryClient.setQueryData(["patientProfile", userId], newData);
		},
		onSuccess: async () => {
			console.log(
				"on success query cache",
				queryClient.getQueryData(["patientProfile", userId])
			);
			// Always refetch after error or success:
			return queryClient.invalidateQueries({
				queryKey: ["patientProfile", userId],
			});
		},
	});
}
