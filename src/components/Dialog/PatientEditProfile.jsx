import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import BasicDatePicker from "../Datepicker/BasicDatePicker";
import AllergiesTagInput from "../Input/AllergiesTagInput";
import MedicalConditionCheckbox from "../Input/MedicalConditionCheckbox";
import { LoadingButton } from "@mui/lab";
import CRUDTable from "../Table/CRUDTable";

export default function PatientEditProfile({
	patient,
	open,
	onSave,
	onCancel,
	isLoading,
}) {
	const [formData, setFormData] = useState({
		name: patient?.name,
		email: patient?.email,
		dateOfBirth: patient?.date_of_brth,
		address: patient?.address,
		phoneNum: patient?.phone_no,
		id: patient?.identification_no,
		profession: patient?.profession,
		bloodGroup: patient?.general_information?.blood_group,
		allergies: patient?.general_information?.allergies,
		heartCondition: !!patient?.general_information?.heart_condition,
		diabetes: !!patient?.general_information?.diabetes,
		smokingHistory: !!patient?.general_information?.smoking_history,
		asthma: !!patient?.general_information?.asthema,
		liverProblem: !!patient?.general_information?.liver_problem,
		kidneyProblem: !!patient?.general_information?.kidney_problem,
		physicalAttrs: patient?.physical_attributes,
	});

	function changeHandlerForField(field) {
		// handler
		return (event) => {
			setFormData((prevData) => ({
				...prevData,
				[field]: event.target.value,
			}));
		};
	}

	function valueAssignHandlerForField(field) {
		return (val) => {
			setFormData((prevData) => ({
				...prevData,
				[field]: val,
			}));
		};
	}

	function handleDateChange(date) {
		setFormData((prevData) => ({
			...prevData,
			dateOfBirth: date.$d.toISOString().split("T")[0],
		}));
	}

	function handlePhyAttrChange(newrow, rows) {
		console.log("table state change", rows);
		setFormData((prevData) => ({
			...prevData,
			physicalAttrs: rows.map((r) => ({
				name: r.name,
				value: r.value,
				date_added: r.date_added.toISOString().split("T")[0],
			})),
		}));
	}

	return (
		<Dialog open={open} onClose={(e) => onCancel(e, formData)}>
			<DialogTitle>Edit Profile</DialogTitle>
			<DialogContent>
				<Grid item xs={12} display="flex" justifyContent="center">
					<DialogContentText>Edit basic properties</DialogContentText>
				</Grid>

				{/* PERSONAL INFO */}
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					spacing={2}
					sx={{
						width: "100%",
						height: "100%",
					}}
				>
					<Grid item xs={12}>
						<TextField
							label="Name"
							value={formData.name}
							onChange={changeHandlerForField("name")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							label="Email"
							value={formData.email}
							onChange={changeHandlerForField("email")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Phone number"
							value={formData.phoneNum}
							onChange={changeHandlerForField("phoneNum")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>

					<Grid item xs={6}>
						<BasicDatePicker
							label="Date of birth"
							value={new Date(patient?.date_of_brth)}
							onChange={handleDateChange}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Identification number"
							value={formData.id}
							onChange={changeHandlerForField("id")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="address"
							value={formData.address}
							onChange={changeHandlerForField("address")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Profession"
							value={formData.profession}
							onChange={changeHandlerForField("profession")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>
				</Grid>

				{/* BLOOD GROUP, ALLERGIES */}
				<Grid item display="flex" justifyContent="center" marginTop={3}>
					<DialogContentText>
						Edit medical properties
					</DialogContentText>
				</Grid>

				<Grid
					container
					spacing={2}
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs={12}>
						<TextField
							label="Blood group"
							value={formData.bloodGroup}
							onChange={changeHandlerForField("bloodGroup")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>

					<Grid item xs={12}>
						<AllergiesTagInput
							patientAllergies={formData.allergies}
							onChange={valueAssignHandlerForField("allergies")}
						/>
					</Grid>

					{/* HEART LIVER ETC CONDITIONS */}
					<Grid
						item
						display="flex"
						justifyContent="center"
						marginTop={3}
					>
						<DialogContentText>
							Select the conditions you have
						</DialogContentText>
					</Grid>

					<Grid item xs={12}>
						<MedicalConditionCheckbox
							formData={formData}
							valueAssignHandlerForField={
								valueAssignHandlerForField
							} // field selection will be done per checkbox
						/>
					</Grid>

					{/* TIME SERIES DATA */}
					<Grid
						item
						xs={12}
						container
						justifyContent="center"
						marginTop={3}
					>
						<Grid
							item
							xs={12}
							display="flex"
							justifyContent="center"
						>
							<DialogContentText>
								Physical Attributes (Time Series)
							</DialogContentText>
						</Grid>

						<Grid item xs={12}>
							<CRUDTable
								cols={patientPhyAttrColumns}
								data={formData.physicalAttrs.map((attr) => ({
									...attr,
									date_added: new Date(attr.date_added),
								}))}
								onChange={handlePhyAttrChange}
							/>
						</Grid>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions>
				<Button
					onClick={(e) => onCancel(e, formData)}
					color="secondary"
				>
					Cancel
				</Button>
				<LoadingButton
					loading={isLoading}
					onClick={(e) => onSave(e, formData)}
					color="secondary"
				>
					Save
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}

const patientPhyAttrColumns = [
	{
		field: "name",
		headerName: "Name",
		type: "string",
		width: 100,
	},
	{
		field: "value",
		headerName: "Value",
		type: "number",
		width: 100,
	},
	{
		field: "date_added",
		headerName: "Date Added",
		type: "date",
		width: 100,
	},
];
