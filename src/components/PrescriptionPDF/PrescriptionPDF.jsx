import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export default function PrescriptionPDF({ patient, doctor, appt }) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Text>Patient</Text>
					<View style={styles.content}>
						<Text>Name: {patient.name ?? patient.patient_id}</Text>
						<Text>Date of Birth: {patient.date_of_brth}</Text>
						<Text>Phone: {patient.phone_no}</Text>
						<Text>Address: {patient.address}</Text>
						<Text>
							Blood Group:{" "}
							{patient.general_information.blood_group}
						</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text>Doctor</Text>
					<View style={styles.content}>
						<Text>Name: {doctor.name ?? doctor.doctor_id}</Text>
						<Text>Email: {doctor.email}</Text>
						<Text>Designation: {doctor.designation}</Text>
						<Text>Degrees: {doctor.degrees}</Text>
						<Text>Speciality: {doctor.speciality}</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text>Symptoms</Text>
					<View style={styles.content}>
						{appt.symptom_list.map((sym, idx) => (
							<Text key={idx}>
								{idx + 1}. {sym.symptom_name} ({sym.duration}{" "}
								days)
							</Text>
						))}
					</View>
				</View>

				<View style={styles.section}>
					<Text>Diagnosis</Text>
					<View style={styles.content}>
						<Text>{appt.diagnosis}</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text>Tests</Text>
					<View style={styles.content}>
						{appt.suggested_test_list.map((test, idx) => (
							<Text key={idx}>
								{idx + 1}. {test}
							</Text>
						))}
					</View>
				</View>

				<View style={styles.section}>
					<Text>Medicines</Text>
					<View style={styles.content}>
						{appt.suggested_medicine_list.map((med, idx) => (
							<Text key={idx}>
								{idx + 1}. {med}
							</Text>
						))}
					</View>
				</View>

				<View style={styles.section}>
					<Text>Advice</Text>
					<View style={styles.content}>
						<Text>{appt.advice}</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
	},
	section: {
		display: "flex",
		margin: 10,
		padding: "10px 0 0 50px",
	},
	content: {
		display: "flex",
		fontSize: 10,
		marginLeft: 30,
		paddingTop: "10px",
	},
});
