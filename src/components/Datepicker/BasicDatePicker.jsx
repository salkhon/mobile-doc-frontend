import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function BasicDatePicker({ label, value, onChange }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={["DatePicker"]}>
				<DatePicker
					label={label}
					value={dayjs(value)}
					onChange={onChange}
					disableFuture
					views={["year", "month", "day"]}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
}
