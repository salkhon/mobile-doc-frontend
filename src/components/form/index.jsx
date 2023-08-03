import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../global/Header";

const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	contact: "",
	address1: "",
	address2: "",
};

const phoneRegex =
	/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// going to defined the validation logic for input fields
// yup provides premade validation functions
const userSchema = yup.object().shape({
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	contact: yup
		.string()
		.matches(phoneRegex, "Phone number is not valid")
		.required("required"),
	address1: yup.string().required("required"),
	address2: yup.string().required("required"),
});

export default function Form() {
	// if we hit a min width of 600 px, this is triggering the boolean
	// allows to use media query in react elements, instead of CSS
	const isNonMobile = useMediaQuery("(min-width:600px)");

	const handleFormSubmit = (values) => {
		console.log(values);
	};

	return (
		<Box margin="20px">
			<Header title="CREATE USER" subtitle="Create a New User Profile" />
			<Formik
				onSubmit={handleFormSubmit}
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
									label="First Name"
									onBlur={handleBlur} // when you touch out of a field
									onChange={handleChange} // when you change the text
									value={values.firstName} // values of the field
									name="firstName"
									error={
										!!touched.firstName &&
										!!errors.firstName
									}
									helperText={
										touched.firstName && errors.firstName
									}
									sx={{
										gridColumn: "span 2",
									}}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Last Name"
									onBlur={handleBlur} // when you touch out of a field
									onChange={handleChange} // when you change the text
									value={values.lastName} // values of the field
									name="lastName"
									error={
										!!touched.lastName && !!errors.lastName
									}
									helperText={
										touched.lastName && errors.lastName
									}
									sx={{
										gridColumn: "span 2",
									}}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Email"
									onBlur={handleBlur} // when you touch out of a field
									onChange={handleChange} // when you change the text
									value={values.email} // values of the field
									name="email"
									error={!!touched.email && !!errors.email}
									helperText={touched.email && errors.email}
									sx={{
										gridColumn: "span 4", // fills up the entire line
									}}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Contact Number"
									onBlur={handleBlur} // when you touch out of a field
									onChange={handleChange} // when you change the text
									value={values.contact} // values of the field
									name="contact"
									error={
										!!touched.contact && !!errors.contact
									}
									helperText={
										touched.contact && errors.contact
									}
									sx={{
										gridColumn: "span 4",
									}}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Address 1"
									onBlur={handleBlur} // when you touch out of a field
									onChange={handleChange} // when you change the text
									value={values.address1} // values of the field
									name="address1"
									error={
										!!touched.address1 && !!errors.address1
									}
									helperText={
										touched.address1 && errors.address1
									}
									sx={{
										gridColumn: "span 4",
									}}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Address 2"
									onBlur={handleBlur} // when you touch out of a field
									onChange={handleChange} // when you change the text
									value={values.address2} // values of the field
									name="address2"
									error={
										!!touched.address2 && !!errors.address2
									}
									helperText={
										touched.address2 && errors.address2
									}
									sx={{
										gridColumn: "span 4",
									}}
								/>
							</Box>
							<Box
								display="flex"
								justifyContent="end"
								marginTop="20px"
							>
								<Button
									type="submit"
									color="secondary"
									variant="contained"
								>
									Create New User
								</Button>
							</Box>
						</form>
					);
				}}
			</Formik>
		</Box>
	);
}
