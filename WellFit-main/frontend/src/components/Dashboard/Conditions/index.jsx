import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
	Hidden,
	TableRow,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
} from "@material-ui/core";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export default function Conditions({ userData }) {
	const classes = useStyles();

	const [rows, setRows] = useState([]);

	useEffect(() => {
		if (userData.user) {
			Axios.get(`get-conditions-by-patient-id/${userData.user.Id}`).then(
				(res) => {
					let newRows = [];
					for (let i in res.data) {
						newRows.push(res.data[i]);
					}
					setRows(newRows);
				}
			);
		}
	}, [userData]);

	return (
		<>
			{rows.length > 0 ? (
				<React.Fragment>
					<Typography component="h2" variant="h6" color="primary" gutterBottom>
						Your Conditions
					</Typography>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Start date</TableCell>
								<Hidden smDown>
									<TableCell>Stop date</TableCell>
								</Hidden>
								<TableCell>Description</TableCell>
								<Hidden smDown>
									<TableCell>Code</TableCell>
								</Hidden>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, idx) => (
								<TableRow key={idx}>
									<TableCell>{row.START}</TableCell>
									<Hidden smDown>
										<TableCell>{row.STOP}</TableCell>
									</Hidden>
									<TableCell>{row.DESCRIPTION}</TableCell>
									<Hidden smDown>
										<TableCell>{row.CODE}</TableCell>
									</Hidden>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className={classes.seeMore} />
				</React.Fragment>
			) : (
				<Typography variant="h6" color="secondary">
					You don't have any Conditions Information
				</Typography>
			)}
		</>
	);
}
