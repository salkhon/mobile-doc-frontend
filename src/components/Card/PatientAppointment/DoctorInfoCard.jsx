import styled from "@emotion/styled";
import {
	Avatar,
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	TextareaAutosize,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getReview, postReviewRequest } from "../../../api/patient";
import { useQuery } from "react-query";
import { LoadingButton } from "@mui/lab";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import LoadingBackdrop from "../../Backdrop/LoadingBackdrop";

export default function DoctorInfoCard({ doctor, appt }) {
	const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

	const postReviewRequestQuery = useQuery(
		["postReviewRequest", appt.session_id],
		postReviewRequest,
		{
			enabled: false,
		}
	);

	const getReviewQuery = useQuery(["getReview", appt.session_id], getReview);

	useEffect(() => {
		if (postReviewRequestQuery.isError) {
			enqueueSnackbar("Cannot request review", {
				variant: "error",
			});
		} else if (postReviewRequestQuery.isSuccess) {
			enqueueSnackbar("Review requested", {
				variant: "success",
			});
		}
	}, [postReviewRequestQuery.isError, postReviewRequestQuery.isSuccess]);

	function handleRequestReview(e) {
		setIsReviewDialogOpen(true);
	}

	function handleSubmit(e) {
		postReviewRequestQuery
			.refetch()
			.then(() => setIsReviewDialogOpen(false));
	}

	function handleClose(e) {
		setIsReviewDialogOpen(false);
	}

	if (getReviewQuery.isFetching) {
		return <LoadingBackdrop />;
	}

	console.log("get review data", getReviewQuery.data);

	return (
		<>
			<Card
				sx={{
					boxShadow: 3,
					height: "100%",
				}}
			>
				<Grid
					container
					p="10% 10px"
					height="100%"
					justifyContent="space-evenly"
					alignItems="center"
				>
					<Grid
						item
						xs={12}
						container
						m="30px 0"
						border={1}
						boxShadow="0 2px 5px"
					>
						<CenteredGrid item xs={12}>
							<Avatar
								alt={doctor.name}
								src="#"
								sx={{
									width: 70,
									height: 70,
								}}
							/>
						</CenteredGrid>
						<CenteredGrid item xs={12}>
							<Typography variant="h4">{doctor.name}</Typography>
						</CenteredGrid>
						<Grid
							item
							xs={12}
							display="flex"
							justifyContent="center"
						>
							<Typography color="grey">{doctor.email}</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							display="flex"
							justifyContent="center"
						>
							<Typography variant="h6">
								{doctor.designation}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							display="flex"
							justifyContent="center"
						>
							<Typography
								variant="h6"
								fontWeight="light"
								color="grey"
							>
								{doctor.degrees}
							</Typography>
						</Grid>

						<CenteredGrid item xs={12}>
							<Typography variant="h5">
								Specializes on <b>{doctor.speciality}</b>
							</Typography>
						</CenteredGrid>
					</Grid>

					<Grid container item xs={12}>
						<CenteredGrid item xs={12} alignItems="center">
							<Button
								variant="contained"
								size="small"
								onClick={handleRequestReview}
								disabled={
									new Date() < new Date(appt.start_time) ||
									getReviewQuery.isSuccess
								}
							>
								Request Review
							</Button>
						</CenteredGrid>

						{/* SHOW REVIEW RESPONSE WHEN THERE IS ANY */}
						{getReviewQuery.isSuccess &&
							getReviewQuery.data?.review?.length > 0 && (
								<Grid container item xs={12}>
									<CenteredGrid item xs={12} pt={2}>
										<Typography>Review Response</Typography>
									</CenteredGrid>
									<CenteredGrid
										item
										xs={12}
										alignItems="center"
									>
										<TextareaAutosize
											value={getReviewQuery.data.review.join(
												"\n"
											)}
											contentEditable={false}
											style={{
												fontFamily: "Source Sans Pro",
												lineHeight: "1.5",
												padding: "12px",
												borderRadius:
													"12px 12px 0 12px",
												border: `1px solid `,
												boxShadow: `0 2px 5px`,
												width: "100%",
												height: "100%",
											}}
										/>
									</CenteredGrid>
								</Grid>
							)}
					</Grid>
				</Grid>
			</Card>

			{/* REVIEW DIALOG */}
			<Dialog open={isReviewDialogOpen} onClose={handleClose}>
				<DialogTitle>Request Review</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want a review of this appointment?
						<br />
						<br />
						The review will be conducted by another doctor. Personal
						details of the patient and the initial doctor will be
						kept private from the reviewee doctor.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<LoadingButton
						loading={postReviewRequestQuery.isFetching}
						onClick={handleSubmit}
					>
						Submit
					</LoadingButton>
				</DialogActions>
			</Dialog>

			<SnackbarProvider />
		</>
	);
}

const CenteredGrid = styled(Grid)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	margin: "12px 0",
}));
