import { Card, Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import {
	BloodtypeOutlined,
	SickOutlined,
	MonitorHeartOutlined,
	MedicalInformationOutlined,
	SmokingRoomsOutlined,
	AirOutlined,
	OpacityOutlined,
} from "@mui/icons-material";

export default function PatientMedicalInfoCard({ patient }) {
	const conditions = useMemo(
		() => extractPatientMedicalConditions(patient),
		[patient]
	);

	return (
		<Card
			sx={{
				borderRadius: 3,
				height: "50vh",
				width: "30vw",
				m: "24px 0px 4px 0px",
				p: 4,
			}}
		>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				sx={{
					height: "100%",
				}}
			>
				<Grid
					item
					xs={12}
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Typography variant="h4" fontWeight="bold">
						Medical Conditions
					</Typography>
				</Grid>

				{/* ALLERGIES */}
				{patient?.general_information?.allergies && (
					<Grid
						item
						xs={12}
						container
						justifyContent="center"
						alignItems="center"
					>
						<Grid
							item
							xs={6}
							display="flex"
							justifyContent="flex-end"
						>
							<SickOutlined
								style={{
									fontSize: 50,
								}}
							/>
						</Grid>
						<Grid
							item
							xs={6}
							container
							justifyContent="center"
							pl="5px"
						>
							<Grid item xs={12}>
								<Typography variant="h5" color="textSecondary">
									Allergies
								</Typography>
							</Grid>
							<Grid item xs={12} display="flex">
								{patient?.general_information?.allergies.map(
									(allergy, idx) => (
										<Typography
											variant="h5"
											mr="5px"
											key={idx}
										>
											{allergy}
										</Typography>
									)
								)}
							</Grid>
						</Grid>
					</Grid>
				)}

				{/* BLOOD GROUP */}
				<Grid
					item
					xs={6}
					container
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs={6} display="flex" justifyContent="flex-end">
						<BloodtypeOutlined
							style={{
								fontSize: 50,
							}}
						/>
					</Grid>
					<Grid item xs={6} container justifyContent="center">
						<Grid item xs={12}>
							<Typography variant="h5" color="textSecondary">
								Blood Group
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h4">
								{patient?.general_information?.blood_group}
							</Typography>
						</Grid>
					</Grid>
				</Grid>

				{/* MEDICAL CONDITIONS */}
				{conditions.map((condition, idx) => (
					<Grid
						item
						xs={6}
						container
						justifyContent="center"
						alignItems="center"
						key={idx}
					>
						<Grid
							item
							xs={6}
							display="flex"
							justifyContent="flex-end"
						>
							{condition.icon}
						</Grid>
						<Grid item xs={6} justifyContent="center" pl="5px">
							<Typography variant="h5" color="textSecondary">
								{condition.text}
							</Typography>
						</Grid>
					</Grid>
				))}
			</Grid>
		</Card>
	);
}

export function extractPatientMedicalConditions(patient) {
	if (!patient) {
		return [];
	}
	const conditions = [
		{
			cond: "heart_condition",
			text: "Heart Condition",
			icon: (
				<MonitorHeartOutlined
					style={{
						fontSize: 25,
					}}
				/>
			),
		},
		{
			cond: "diabetes",
			text: "Diabetes",
			icon: (
				<MedicalInformationOutlined
					style={{
						fontSize: 25,
					}}
				/>
			),
		},
		{
			cond: "smoking_history",
			text: "Smoking History",
			icon: (
				<SmokingRoomsOutlined
					style={{
						fontSize: 25,
					}}
				/>
			),
		},
		{
			cond: "asthema",
			text: "Asthma",
			icon: (
				<AirOutlined
					style={{
						fontSize: 25,
					}}
				/>
			),
		},
		{
			cond: "liver_problem",
			text: "Liver Problem",
			icon: (
				<MedicalInformationOutlined
					style={{
						fontSize: 25,
					}}
				/>
			),
		},
		{
			cond: "kidney_problem",
			text: "Kidney Problem",
			icon: (
				<OpacityOutlined
					style={{
						fontSize: 25,
					}}
				/>
			),
		},
	].filter(
		(condition) =>
			!!patient?.general_information &&
			!!patient?.general_information[condition.cond]
	);
	return conditions;
}
