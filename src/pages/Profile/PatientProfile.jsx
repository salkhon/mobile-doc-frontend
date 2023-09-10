import { Breadcrumbs, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PatientInfoCard from "../../components/Card/PatientProfile/PatientInfoCard";
import { useAuth } from "../../hooks/auth";
import {
	edittedPatientInfoToPatientObject,
	getPatient,
	putPatient,
} from "../../api/patient";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import PatientMedicalInfoCard from "../../components/Card/PatientProfile/PatientMedicalInfo";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PatientEditProfile from "../../components/Dialog/PatientEditProfile";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import PatientPhysicalAttributes from "../../components/General/PatientPhysicalAttributes";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function PatientProfile() {
	const { userId } = useAuth();

	// patient
	const queryClient = useQueryClient();
	const getPatientQuery = useQuery(["getPatient", userId], getPatient);
	const putPatientMutation = useMutation(putPatient, {
		onMutate: async ({ userId, newData }) => {
			await queryClient.cancelQueries(["getPatient", userId]);
			queryClient.setQueryData(["getPatient", userId], {
				patient: newData,
			});
		},
	});

	// edit dialog
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	function handleEditDialogSave(e, formData) {
		const newData = edittedPatientInfoToPatientObject(
			getPatientQuery.data.patient,
			formData
		);
		console.log("form data", formData, newData);
		putPatientMutation.mutate({ userId, newData });
		setIsEditDialogOpen(false);
	}

	if (getPatientQuery.isFetching) {
		return <LoadingBackdrop />;
	}

	return (
		<Grid container>
			<Breadcrumbs
				aria-label="breadcrumb"
				sx={{
					m: "10px 0 0 24px",
				}}
			>
				<Link
					color="inherit"
					to="/"
					style={{
						textDecoration: "none",
						fontSize: 30,
					}}
				>
					<HomeOutlined />
				</Link>
				<Typography color="text.primary" fontSize={25}>
					Profile
				</Typography>
			</Breadcrumbs>
			<Grid
				item
				xs={12}
				display="flex"
				justifyContent="flex-end"
				sx={{
					mr: 7,
				}}
			>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setIsEditDialogOpen(true)}
				>
					{" "}
					<BorderColorOutlinedIcon
						sx={{
							mr: 1,
						}}
					/>{" "}
					Edit Profile
				</Button>
			</Grid>
			<Grid item xs={7.5}>
				<PatientInfoCard patient={getPatientQuery.data.patient} />
			</Grid>
			<Grid item xs={4.5}>
				<PatientMedicalInfoCard
					patient={getPatientQuery.data.patient}
				/>
			</Grid>

			<Grid item xs={12} container>
				<Grid
					item
					xs={12}
					display="flex"
					justifyContent="space-between"
				>
					<Typography variant="h3" fontWeight="bold" m={3}>
						Temporal Data
					</Typography>
				</Grid>

				{/* TIME SERIES FOR EACH PROPERTY */}
				<Grid item xs={12} pl={3}>
					<PatientPhysicalAttributes
						patient={getPatientQuery.data.patient}
					/>
				</Grid>
			</Grid>

			<PatientEditProfile
				patient={getPatientQuery.data.patient}
				open={isEditDialogOpen}
				onSave={handleEditDialogSave}
				onCancel={(e, formData) => setIsEditDialogOpen(false)}
				isLoading={putPatientMutation.isLoading}
			/>
		</Grid>
	);
}
