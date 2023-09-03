import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
	GridRowModes,
	DataGrid,
	GridToolbarContainer,
	GridActionsCellItem,
	GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Chip, Stack } from "@mui/material";

/**
 * `cols` prop format:
 * [{
 *      field: "name",
 *      headerName: "Name",
 *      type: "number",
 *      width: 80,
 *      align: "left",
 *      headerAlign: "left",
 *      valueOptions: ["Market", "Finance", "Development"],
 * }]
 */
export default function CRUDTable({
	cols,
	data,
	onChange,
	what = "Records",
	suggestedRows = null,
}) {
	data = data.map((d) => ({
		...d,
		id: randomId(),
	}));

	const [rows, setRows] = React.useState(data);
	const [rowModesModel, setRowModesModel] = React.useState({});

	function handleRowEditStop(params, event) {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	}

	function handleEditClick(id) {
		return () =>
			setRowModesModel({
				...rowModesModel,
				[id]: { mode: GridRowModes.Edit },
			});
	}

	function handleSaveClick(id) {
		return () =>
			setRowModesModel({
				...rowModesModel,
				[id]: { mode: GridRowModes.View },
			});
	}

	function handleDeleteClick(id) {
		return () => setRows(rows.filter((row) => row.id !== id));
	}

	function handleCancelClick(id) {
		return () => {
			setRowModesModel({
				...rowModesModel,
				[id]: { mode: GridRowModes.View, ignoreModifications: true },
			});

			const editedRow = rows.find((row) => row.id === id);
			if (editedRow.isNew) {
				setRows(rows.filter((row) => row.id !== id));
			}
		};
	}

	function processRowUpdate(newRow) {
		const updatedRow = { ...newRow, isNew: false };
		const updatedRows = rows.map((row) =>
			row.id === newRow.id ? updatedRow : row
		);
		setRows(updatedRows);
		onChange(newRow, updatedRows);
		return updatedRow;
	}

	function handleRowModesModelChange(newRowModesModel) {
		setRowModesModel(newRowModesModel);
	}

	const columns = cols.map((c) => ({
		...c,
		editable: true,
	}));
	columns.push({
		field: "actions",
		type: "actions",
		headerName: "Actions",
		flex: 1,
		align: "right",
		cellClassName: "actions",
		getActions: ({ id }) => {
			const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

			if (isInEditMode) {
				return [
					<GridActionsCellItem
						icon={<SaveIcon />}
						label="Save"
						sx={{
							color: "primary.main",
						}}
						onClick={handleSaveClick(id)}
					/>,
					<GridActionsCellItem
						icon={<CancelIcon />}
						label="Cancel"
						className="textPrimary"
						onClick={handleCancelClick(id)}
						color="inherit"
					/>,
				];
			}

			return [
				<GridActionsCellItem
					icon={<EditIcon />}
					label="Edit"
					className="textPrimary"
					onClick={handleEditClick(id)}
					color="inherit"
				/>,
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={handleDeleteClick(id)}
					color="inherit"
				/>,
			];
		},
	});

	return (
		<Box
			sx={{
				height: 500,
				width: "100%",
				"& .actions": {
					color: "text.secondary",
				},
				"& .textPrimary": {
					color: "text.primary",
				},
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slots={{
					toolbar: EditToolbar,
				}}
				slotProps={{
					toolbar: {
						setRows,
						setRowModesModel,
						cols,
						what,
						suggestedRows,
					},
				}}
			/>
		</Box>
	);
}

function EditToolbar({ setRows, setRowModesModel, cols, what, suggestedRows }) {
	function handleClick(e, rowName) {
		const id = randomId();
		setRows((oldRows) => [
			...oldRows,
			// if rowName is present (from suggestedRows) set that as first column value
			{ id, [cols[0]?.field]: rowName ?? "", isNew: true },
		]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: cols[0]?.field },
		}));
	}

	return (
		<GridToolbarContainer>
			<Button
				color="primary"
				startIcon={<AddIcon />}
				onClick={handleClick}
			>
				Add {what}
			</Button>

			{suggestedRows && (
				<Stack direction="row" overflow="auto">
					{suggestedRows.map((row) => (
						<Chip
							label={row}
							onClick={(e) => handleClick(e, row)}
						/>
					))}
				</Stack>
			)}
		</GridToolbarContainer>
	);
}
