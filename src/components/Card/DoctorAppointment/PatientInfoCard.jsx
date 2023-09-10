import styled from "@emotion/styled";
import { Avatar, Card, Chip, Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import PatientLatestPhyAttr from "../../Paper/PatientLatestPhyAttr";
import { extractPatientMedicalConditions } from "../PatientProfile/PatientMedicalInfo";

export default function PatientInfoCard({ patientEHR }) {
	const patientLatestPhyAttrs = useMemo(
		() =>
			getPatientLatestAttrs(
				patientEHR.patient_details?.physical_attributes
			),
		[patientEHR.patient_details?.physical_attributes]
	);
	const patientMedicalConditions = useMemo(
		() => extractPatientMedicalConditions(patientEHR.patient_details),
		[patientEHR.patient_details]
	);

	console.log("conditions in card", patientMedicalConditions);
	return (
		<Card
			sx={{
				height: "86vh",
				boxShadow: 3,
			}}
		>
			<Grid container p="30px 10px" alignItems="center">
				<CenteredGrid item xs={12}>
					<Avatar
						alt={patientEHR.patient_details?.name}
						src="#"
						sx={{
							width: 70,
							height: 70,
						}}
					/>
				</CenteredGrid>
				<Grid
					item
					xs={12}
					display="flex"
					justifyContent="center"
					m="20px 0"
				>
					<Typography variant="h4">
						{patientEHR.patient_details?.name}
					</Typography>
				</Grid>

				<CenteredGrid item xs={12}>
					<Typography variant="overline" fontSize={14} color="grey">
						General Info
					</Typography>
				</CenteredGrid>

				<KeyValueGrid item xs={4}>
					<KeyTypography>Name:</KeyTypography>
				</KeyValueGrid>
				<KeyValueGrid item xs={8}>
					<ValueTypography>
						{patientEHR.patient_details?.name}
					</ValueTypography>
				</KeyValueGrid>

				<KeyValueGrid item xs={4}>
					<KeyTypography>Date of Birth:</KeyTypography>
				</KeyValueGrid>
				<KeyValueGrid item xs={8}>
					<ValueTypography>
						{patientEHR.patient_details?.date_of_brth}
					</ValueTypography>
				</KeyValueGrid>

				<KeyValueGrid item xs={4}>
					<KeyTypography>Phone:</KeyTypography>
				</KeyValueGrid>
				<KeyValueGrid item xs={8}>
					<ValueTypography>
						{patientEHR.patient_details?.phone_no}
					</ValueTypography>
				</KeyValueGrid>

				<KeyValueGrid item xs={4}>
					<KeyTypography>Professsion:</KeyTypography>
				</KeyValueGrid>
				<KeyValueGrid item xs={8}>
					<ValueTypography>
						{patientEHR.patient_details?.profession}
					</ValueTypography>
				</KeyValueGrid>

				<KeyValueGrid item xs={4}>
					<KeyTypography>ID:</KeyTypography>
				</KeyValueGrid>
				<KeyValueGrid item xs={8}>
					<ValueTypography>
						{patientEHR.patient_details?.identification_no}
					</ValueTypography>
				</KeyValueGrid>

				<KeyValueGrid item xs={4}>
					<KeyTypography>Address:</KeyTypography>
				</KeyValueGrid>
				<KeyValueGrid item xs={8}>
					<ValueTypography>
						{patientEHR.patient_details?.address}
					</ValueTypography>
				</KeyValueGrid>

				<CenteredGrid item xs={12}>
					<Typography variant="overline" fontSize={14} color="grey">
						Current Physical Attributes
					</Typography>
				</CenteredGrid>
				<CenteredGrid container spacing={1} padding="0 24px 0 24px">
					{Object.keys(patientLatestPhyAttrs).map((attr, idx) => (
						<Grid
							item
							xs={4}
							display="flex"
							justifyContent="center"
							key={idx}
						>
							<PatientLatestPhyAttr
								attr={attr}
								val={patientLatestPhyAttrs[attr]?.value}
							/>
						</Grid>
					))}
				</CenteredGrid>
				<CenteredGrid item xs={12}>
					<Typography variant="overline" fontSize={14} color="grey">
						Medical Conditions
					</Typography>
				</CenteredGrid>
				<CenteredGrid container spacing={1}>
					{/* {patientEHR.patient_details} */}
					{patientMedicalConditions.map((cond, idx) => (
						<Grid item xs={4} key={idx}>
							<Chip
								icon={cond.icon}
								label={cond.text}
								sx={{ margin: 0.15 }}
							/>
						</Grid>
					))}
				</CenteredGrid>
			</Grid>
		</Card>
	);
}

const CenteredGrid = styled(Grid)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	margin: "12px 0",
}));

const KeyValueGrid = styled(Grid)(({ theme }) => ({
	padding: "2px 24px",
}));

const KeyTypography = styled(Typography)(({ theme }) => ({
	fontSize: 12,
	color: "grey",
	margin: "4px",
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
	fontSize: 16,
}));

function getPatientLatestAttrs(patientPhysicalAttrs) {
	if (!patientPhysicalAttrs) return {};
	return patientPhysicalAttrs.reduce((result, phyAttr) => {
		if (
			!result[phyAttr.name] ||
			new Date(result[phyAttr.name].date_added) <
				new Date(phyAttr.date_added)
		) {
			result[phyAttr.name] = {
				name: phyAttr.name,
				value: phyAttr.value,
				date_added: phyAttr.date_added,
			};
		}
		return result;
	}, {});
}
