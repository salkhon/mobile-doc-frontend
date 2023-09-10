import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/auth";
import { getPendingReviews } from "../../api/doctor";
import PendingReviewsTable from "../../components/Table/AllPendingReviews/PendingReviewsTable";

export default function AllPendingReviews() {
	const { userId } = useAuth();
	const getPendingReviewsQuery = useQuery(
		["getPendingReviews", userId],
		getPendingReviews
	);

	if (getPendingReviewsQuery.isFetching) {
		return (
			<Stack spacing={2} m={3}>
				{[...Array(12).keys()].map((i) => (
					<Skeleton
						variant="rounded"
						width="90%"
						height="50px"
						key={i}
					/>
				))}
			</Stack>
		);
	}

	return (
		<Grid item xs={12} m={3} sx={{ height: "87vh" }}>
			<PendingReviewsTable
				reviews={getPendingReviewsQuery.data?.pending_peer_reviews}
			/>
		</Grid>
	);
}
