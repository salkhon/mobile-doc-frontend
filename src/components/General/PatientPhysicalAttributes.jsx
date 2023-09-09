import { ImageList, ImageListItem } from "@mui/material";
import React, { useMemo } from "react";
import PatientTimeSeries from "../Chart/PatientTimeSeries";

export default function PatientPhysicalAttributes({ patient }) {
	const patientGroupedPhysicalAttrs = useMemo(
		() => groupPatientPhysicalAttrs(patient?.physical_attributes),
		[patient]
	);

	return (
		<ImageList
			sx={{
				gridAutoFlow: "column",
			}}
		>
			{Object.keys(patientGroupedPhysicalAttrs).map((attr, idx) => {
				return (
					<ImageListItem key={idx}>
						<PatientTimeSeries
							propertyData={patientGroupedPhysicalAttrs[attr]}
						/>
					</ImageListItem>
				);
			})}
		</ImageList>
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
