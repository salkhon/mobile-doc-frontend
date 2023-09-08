import styled from "@emotion/styled";
import { Avatar, Card, Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import PatientLatestPhyAttr from "../../Paper/PatientLatestPhyAttr";

export default function PatientInfoCard({ patientEHR }) {
	const patientLatestPhyAttrs = useMemo(
		() =>
			getPatientLatestAttrs(
				patientEHR?.patient_details?.physical_attributes
			),
		[patientEHR?.patient_details?.physical_attributes]
	);
	console.log("latest", patientLatestPhyAttrs);
	return (
		<Card
			sx={{
				height: "100%",
				boxShadow: 3,
			}}
		>
			<Grid container p="30px 0" alignItems="center">
				<CenteredGrid item xs={12}>
					<Avatar
						alt={patientEHR?.patient_details?.name}
						src="#"
						sx={{
							width: 100,
							height: 100,
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
					<Typography variant="h3">
						{patientEHR?.patient_details?.name}
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
			</Grid>

			<CenteredGrid>
				<Typography variant="overline" fontSize={14} color="grey">
					Current Physical Attributes
				</Typography>
			</CenteredGrid>
			<CenteredGrid container spacing={1} padding="0 24px 24px 24px">
				{Object.keys(patientLatestPhyAttrs).map((attr, idx) => (
					<Grid
						item
						xs={6}
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
	fontSize: 14,
	color: "grey",
	margin: "4px",
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
	fontSize: 18,
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
