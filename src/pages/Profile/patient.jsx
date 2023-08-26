import { Breadcrumbs, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PatientInfoCard from "../../components/Card/PatientProfile/PatientInfoCard";
import { useAuth } from "../../hooks/auth";
import {
	edittedPatientInfoToPatientObject,
	getPatient,
	updatePatientInfo,
} from "../../api/patient";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import PatientMedicalInfoCard from "../../components/Card/PatientProfile/PatientMedicalInfo";
import PatientTimeSeries from "../../components/Chart/PatientTimeSeries";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PatientEditProfile from "../../components/Dialog/PatientEditProfile";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";

export default function PatientProfile() {
	const { userId } = useAuth();

	// getting patient
	const [patient, setPatient] = useState(null);
	useEffect(() => {
		getPatient(userId).then((patient) => setPatient(patient));
	}, [userId]);

	// edit dialog
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isEditDialogLoading, setIsEditDialogLoading] = useState(false);

	// time series
	const patientGroupedPhysicalAttrs = useMemo(
		() => groupPatientPhysicalAttrs(patient?.physical_attributes),
		[patient]
	);

	if (!patient) {
		return <LoadingBackdrop />;
	}

	function handleEditDialogSave(e, formData) {
		setIsEditDialogLoading(true);
		const newData = edittedPatientInfoToPatientObject(patient, formData);
		updatePatientInfo(userId, newData)
			.then(() => setPatient(newData))
			.then(() => setIsEditDialogLoading(false))
			.then(() => setIsEditDialogOpen(false));
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
				<PatientInfoCard patient={patient} />
			</Grid>
			<Grid item xs={4.5}>
				<PatientMedicalInfoCard patient={patient} />
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
				{Object.keys(patientGroupedPhysicalAttrs).map((attr, idx) => {
					return (
						<PatientTimeSeries
							propertyData={patientGroupedPhysicalAttrs[attr]}
							key={idx}
						/>
					);
				})}
			</Grid>

			<PatientEditProfile
				patient={patient}
				open={isEditDialogOpen}
				onSave={handleEditDialogSave}
				onCancel={(e, formData) => setIsEditDialogOpen(false)}
				isLoading={isEditDialogLoading}
			/>
		</Grid>
	);
}

function groupPatientPhysicalAttrs(patientPhysicalAttrs) {
	if (!patientPhysicalAttrs) {
		return {};
	}

	return patientPhysicalAttrs.reduce((result, phyAttr) => {
		if (!result[phyAttr.name]) {
			result[phyAttr.name] = [];
		}
		result[phyAttr.name].push({
			name: phyAttr.name,
			value: phyAttr.value,
			date_added: phyAttr.date_added,
		});
		return result;
	}, {});
}
