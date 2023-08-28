import { Breadcrumbs, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../hooks/auth";
import LoadingBackdrop from "../../components/Backdrop/LoadingBackdrop";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDoctor, postDoctor } from "../../api/doctor";
import DoctorInfoCard from "../../components/Card/DoctorProfile/DoctorInfoCard";
import DoctorEditProfile from "../../components/Dialog/DoctorEditProfile";

export default function DoctorProfile() {
	const { userId } = useAuth();
	const queryClient = useQueryClient();

	// getting doctor
	const getDoctorQuery = useQuery(["getDoctor", userId], getDoctor, {
		refetchOnWindowFocus: false,
	});

	// edit doctor
	const editDoctorMutation = useMutation(postDoctor, {
		onMutate: async ({ doctorId, edittedDoctor }) => {
			await queryClient.cancelQueries(["getDoctor", doctorId]);
			queryClient.setQueryData(["getDoctor", doctorId], edittedDoctor); // optimistic
			// todo: handle error
		},
		onSettled: () => {
			queryClient.invalidateQueries(["getDoctor", userId]);
		},
	});

	// edit dialog
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	if (getDoctorQuery.isFetching) {
		return <LoadingBackdrop />;
	}

	function handleEditDialogSave(e, edittedDoctor) {
		editDoctorMutation.mutate({
			doctorId: userId,
			edittedDoctor: edittedDoctor,
		});
		setIsEditDialogOpen(false);
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
			<Grid item xs={12}>
				<DoctorInfoCard doctor={getDoctorQuery.data} />
			</Grid>

			<DoctorEditProfile
				doctor={getDoctorQuery.data}
				open={isEditDialogOpen}
				onSave={handleEditDialogSave}
				onCancel={(e, edittedDoctor) => setIsEditDialogOpen(false)}
				isLoading={editDoctorMutation.isLoading}
			/>
		</Grid>
	);
}
