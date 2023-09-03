import React from "react";
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

export default function RescheduleConfirmationDialog({
	isOpen,
	oldEvent,
	newEvent,
	handleConfirm,
	handleCancel,
	isRescheduleLoading,
}) {
	return (
		<Dialog
			open={isOpen}
			onClose={handleCancel}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle
				id="alert-dialog-title"
				sx={{
					fontSize: 15,
				}}
			>
				Reschedule appointment with {newEvent?.title} from{" "}
				<b>{oldEvent?.start.toLocaleString()}</b> to{" "}
				<b>{newEvent?.start.toLocaleString()}</b>?
			</DialogTitle>
			<DialogActions>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Box width={90} marginLeft={2}>
					<LoadingButton
                        variant="contained"
                        color="secondary"
						loading={isRescheduleLoading}
						onClick={handleConfirm}
					>
						Confirm
					</LoadingButton>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
