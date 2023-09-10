import { useSearchParams } from "react-router-dom";
import SingleReview from "./SingleReview";
import React from "react";
import AllPendingReviews from "./AllPendingReviews";

export default function Review() {
	const [searchParams] = useSearchParams();

	if (searchParams.has("id")) {
		return <SingleReview apptId={searchParams.get("id")} />;
	}

	return <AllPendingReviews />;
}
