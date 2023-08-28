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
import { LoadingButton } from "@mui/lab";

export default function DoctorEditProfile({
	doctor,
	open,
	onSave,
	onCancel,
	isLoading,
}) {
	const [edittedDoctor, setEdittedDoctor] = useState({
		name: doctor?.name,
		email: doctor?.email,
		designation: doctor?.designation,
		degrees: doctor?.degrees,
		speciality: doctor?.speciality,
		availablitliy: doctor?.availability,
	});

	function changeHandlerForField(field) {
		// handler
		return (event) => {
			setEdittedDoctor((prevData) => ({
				...prevData,
				[field]: event.target.value,
			}));
		};
	}

	return (
		<Dialog open={open} onClose={(e) => onCancel(e, edittedDoctor)}>
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
							value={edittedDoctor.name}
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
							value={edittedDoctor.email}
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
							label="Designation"
							value={edittedDoctor.designation}
							onChange={changeHandlerForField("designation")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							label="Degrees"
							value={edittedDoctor.degrees}
							onChange={changeHandlerForField("degrees")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Speciality"
							value={edittedDoctor.speciality}
							onChange={changeHandlerForField("speciality")}
							fullWidth
							variant="standard"
							sx={{
								m: 1,
							}}
						/>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions>
				<Button
					onClick={(e) => onCancel(e, edittedDoctor)}
					color="secondary"
				>
					Cancel
				</Button>
				<LoadingButton
					loading={isLoading}
					onClick={(e) => onSave(e, edittedDoctor)}
					color="secondary"
				>
					Save
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}
