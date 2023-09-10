import { Paper, Skeleton, Stack } from "@mui/material";
import { useAuth } from "../../../hooks/auth";
import React from "react";
import { useQuery } from "react-query";
import { getPendingReviews } from "../../../api/doctor";

export function PendingPeerReviews() {
	const { userId } = useAuth();

	// get pending reviews
	const getPendingReviewsQuery = useQuery(
		["getPendingReviews", userId],
		getPendingReviews
	);

	if (getPendingReviewsQuery.isFetching) {
		return (
			<Stack direction="row" mt={5} spacing={3}>
				<Skeleton variant="rectangular" height="15vh" width="20vw" />
				<Skeleton variant="rectangular" height="15vh" width="20vw" />
				<Skeleton variant="rectangular" height="15vh" width="20vw" />
			</Stack>
		);
	}

	console.log("peer reviews for doctor", getPendingReviewsQuery.data);
	return (
		<Stack width="100%">
			{getPendingReviewsQuery.data.pending_peer_reviews.map(
				(rev, idx) => (
					<Paper key={idx}>hey</Paper>
				)
			)}
		</Stack>
	);
}
