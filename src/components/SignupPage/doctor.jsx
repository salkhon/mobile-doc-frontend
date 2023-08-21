import React, { useState } from "react";
import {
	Box,
	Container,
	Avatar,
	Typography,
	TextField,
	useTheme,
	useMediaQuery,
	InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import { postDoctorSignup } from "../../api/doctor";
import FormBackground from "./FormBackground";

const initialValues = {
	username: "",
	password: "",
	fullname: "",
	email: "",
	degrees: "",
	speciality: "",
};

const userSchema = yup.object().shape({
	username: yup.string().required("required"),
	password: yup.string().required("required"),
	fullname: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	degrees: yup.string().required("required"),
	speciality: yup.string().required("required"),
});

export default function DoctorSignupPage() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const isNonMobile = useMediaQuery("(min-width:600px)");
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	function handleSubmit(values) {
		console.log("submit button clicked", values);
		setIsLoading(true);
		postDoctorSignup(values)
			.then(() => setIsLoading(false))
			.then(() => navigate("/login"));
	}

	return (
		<Container maxWidth="xl" sx={{ position: "relative" }}>
			<FormBackground mt={10}>
				<Avatar
					sx={{
						m: 1,
						bgcolor: "secondary",
						width: 100,
						height: 100,
					}}
					src="pokedoc-logo.png"
				></Avatar>
				<Typography component="h1" variant="h3">
					Sign Up as a Doctor
				</Typography>
				<Box marginTop={5} display="flex" overflow="auto">
					<Formik
						onSubmit={handleSubmit}
						initialValues={initialValues}
						validationSchema={userSchema}
					>
						{/* These params to the callback come from Formik */}
						{({
							values,
							errors,
							touched, // if you have touched a component (triggers validation)
							handleBlur,
							handleChange,
							handleSubmit,
							setFieldValue,
						}) => {
							return (
								<form onSubmit={handleSubmit}>
									<Box
										display="grid"
										gap="30px"
										gridTemplateColumns="repeat(4, minmax(0, 1fr))"
										sx={{
											div: {
												gridColumn: isNonMobile
													? undefined
													: "span 4",
											},
										}}
									>
										<TextField
											fullWidth
											variant="filled"
											type="text"
											label="User Name"
											onBlur={handleBlur} // when you touch out of a field
											onChange={handleChange} // when you change the text
											value={values.username} // values of the field
											name="username"
											color="tertiary"
											error={
												!!touched.username &&
												!!errors.username
											}
											helperText={
												touched.username &&
												errors.username
											}
											sx={{
												gridColumn: "span 4",
											}}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<AccountCircleOutlinedIcon />
													</InputAdornment>
												),
											}}
										/>
										<TextField
											fullWidth
											variant="filled"
											type="password"
											label="Password"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.password}
											name="password"
											color="tertiary"
											error={
												!!touched.password &&
												!!errors.password
											}
											helperText={
												touched.password &&
												errors.password
											}
											sx={{
												gridColumn: "span 4",
											}}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<PasswordOutlinedIcon />
													</InputAdornment>
												),
											}}
										/>
										<TextField
											fullWidth
											variant="filled"
											type="text"
											label="Full Name"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.fullname}
											name="fullname"
											color="tertiary"
											error={
												!!touched.fullname &&
												!!errors.fullname
											}
											helperText={
												touched.fullname &&
												errors.fullname
											}
											sx={{
												gridColumn: "span 4",
											}}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<PersonOutlinedIcon />
													</InputAdornment>
												),
											}}
										/>
										<TextField
											fullWidth
											variant="filled"
											type="text"
											label="Email"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.email}
											name="email"
											color="tertiary"
											error={
												!!touched.email &&
												!!errors.email
											}
											helperText={
												touched.email && errors.email
											}
											sx={{
												gridColumn: "span 4", // fills up the entire line
											}}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<EmailOutlinedIcon />
													</InputAdornment>
												),
											}}
										/>
										<TextField
											fullWidth
											variant="filled"
											type="text"
											label="Degrees"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.degrees}
											name="degrees"
											color="tertiary"
											sx={{
												gridColumn: "span 4",
											}}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<SchoolOutlinedIcon />
													</InputAdornment>
												),
											}}
										/>
										<TextField
											fullWidth
											variant="filled"
											type="text"
											label="Speciality"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.speciality}
											name="speciality"
											color="tertiary"
											sx={{
												gridColumn: "span 4",
											}}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MedicalServicesOutlinedIcon />
													</InputAdornment>
												),
											}}
										/>
									</Box>
									<Box
										display="flex"
										justifyContent="space-between"
										marginTop="20px"
									>
										<Link
											to="/login"
											style={{
												color: colors.greenAccent[500],
											}}
										>
											Already have an account? Login
										</Link>
										<LoadingButton
											type="submit"
											color="secondary"
											variant="contained"
											loading={isLoading}
										>
											Create New User
										</LoadingButton>
									</Box>
								</form>
							);
						}}
					</Formik>
				</Box>
			</FormBackground>
		</Container>
	);
}
