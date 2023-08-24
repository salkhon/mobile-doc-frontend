import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { Card, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function PatientTimeSeries({ propertyData }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// prop: data of a specific property (height, weight)
	const formattedData = [
		{
			id: propertyData[0]?.name,
			data: [],
		},
	];

	formattedData[0].data = useMemo(() => {
		propertyData.sort(
			(data1, data2) =>
				new Date(data1.date_added) - new Date(data2.date_added)
		);
		return propertyData.map((val, idx) => ({
			x: val.date_added,
			y: val.value,
		}));
	}, [propertyData]);

	return (
		<Card
			sx={{
				borderRadius: 3,
				height: "60vh",
				width: "83vw",
				m: "4px 4px 4px 24px",
			}}
		>
			<Typography variant="h3" m={3}>
				{propertyData[0]?.name}
			</Typography>
			<ResponsiveLine
				data={formattedData}
				margin={{ top: 40, right: 90, bottom: 130, left: 60 }}
				xScale={{ type: "point" }}
				yScale={{
					type: "linear",
					min: "auto",
					max: "auto",
					stacked: true,
					reverse: false,
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 10,
					legend: "Date",
					legendOffset: 36,
					legendPosition: "middle",
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: "Value",
					legendOffset: -40,
					legendPosition: "middle",
				}}
				colors={[`${colors.primary[400]}`]}
				lineWidth={4}
				pointSize={10}
				pointColor={`${colors.secondary[400]}`}
				pointBorderWidth={2}
				pointBorderColor={{ from: "serieColor" }}
				enablePointLabel={true}
				pointLabelYOffset={-16}
				useMesh={true}
				legends={[
					{
						anchor: "bottom-right",
						direction: "column",
						justify: false,
						translateX: 100,
						translateY: 0,
						itemsSpacing: 0,
						itemDirection: "left-to-right",
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 12,
						symbolShape: "circle",
						symbolBorderColor: "rgba(0, 0, 0, .5)",
						effects: [
							{
								on: "hover",
								style: {
									itemBackground: "rgba(0, 0, 0, .03)",
									itemOpacity: 1,
								},
							},
						],
					},
				]}
			/>
		</Card>
	);
}
