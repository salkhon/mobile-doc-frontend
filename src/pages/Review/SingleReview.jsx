import { Grid, TextareaAutosize, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import { tokens } from "../../theme";
import { getPendingReviews, postSubmitReview } from "../../api/doctor";
import { useAuth } from "../../hooks/auth";
import SymptomsTable from "../../components/Table/PatientAppointment/SymptomsTable";
import TagInput from "../../components/Tags/TagInput";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

export default function SingleReview({ apptId }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();

	// appt data
	const { userId } = useAuth();
	const getPendingReviewsQuery = useQuery(
		["getPendingReviews", userId],
		getPendingReviews
	);
	const postReviewMutation = useMutation(postSubmitReview);

	const [review, setReview] = useState("");

	const appt = useMemo(() => {
		return (
			getPendingReviewsQuery.data?.pending_peer_reviews?.find(
				(rev) => rev.session_id === apptId
			) ?? {}
		);
	}, [getPendingReviewsQuery.data, apptId]);

	if (getPendingReviewsQuery.isFetching) {
		return <LoadingBackdrop />;
	}

	function handleSubmit(e) {
		postReviewMutation.mutate({ apptId, review });
		navigate("/review");
	}

	console.log("pending reviews in single", getPendingReviewsQuery.data, appt);

	return (
		<Grid container m={2} width="97%">
			<Grid item xs={6} p={3}>
				<Typography variant="h4" sx={{ mb: 3 }}>
					Symptoms
				</Typography>
				<SymptomsTable symptoms={appt.symptom_list} />
			</Grid>
			<Grid item xs={12} alignItems="center" p={3}>
				<Typography variant="h4" sx={{ mt: 9, mb: 2 }}>
					Diagnosis
				</Typography>
				<TagInput
					label="Diagnosis"
					values={appt.diagnosis?.split(",") ?? []}
					onChange={() => {}}
					disabled={true}
					variant="filled"
					color="info"
				/>
			</Grid>
			<Grid item xs={12} alignItems="center" p={3}>
				<Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
					Suggested Tests
				</Typography>
				<TagInput
					label="Suggested Tests"
					values={appt.suggested_test_list}
					onChange={() => {}}
					disabled={true}
				/>
			</Grid>
			<Grid item xs={12} alignItems="center" height="30%" p={3}>
				<Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
					Advice
				</Typography>
				<TextareaAutosize
					placeholder="Advice for patient"
					value={appt.advice ?? ""}
					onChange={() => {}}
					style={{
						fontFamily: "Source Sans Pro",
						lineHeight: "1.5",
						padding: "12px",
						borderRadius: "12px 12px 0 12px",
						border: `1px solid ${colors.primary[600]}`,
						backgroundColor: `${theme.palette.neutral.dark}`,
						color: `${theme.palette.neutral.light}`,
						boxShadow: `0 2px 10px ${colors.primary[600]}`,
						width: "50%",
						height: "100%",
					}}
				/>
			</Grid>
			<Grid item xs={12} p={3}>
				<Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
					Review
				</Typography>
				<TextareaAutosize
					placeholder="Your Review"
					value={review}
					onChange={(e) => setReview(e.target.value)}
					style={{
						fontFamily: "Source Sans Pro",
						lineHeight: "1.5",
						padding: "12px",
						borderRadius: "12px 12px 0 12px",
						border: `1px solid ${colors.secondary[600]}`,
						backgroundColor: `${theme.palette.neutral.dark}`,
						color: `${theme.palette.neutral.light}`,
						boxShadow: `0 2px 10px ${colors.secondary[600]}`,
						width: "50%",
						height: "100%",
					}}
				/>
			</Grid>
			<Grid item xs={12} m={5}>
				<LoadingButton
					variant="contained"
					loading={postReviewMutation.isLoading}
					onClick={handleSubmit}
				>
					Submit
				</LoadingButton>
			</Grid>
		</Grid>
	);
}
