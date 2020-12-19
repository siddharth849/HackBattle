import React, { useContext } from "react";

import {
	Typography,
	Container,
	Grid,
	CardMedia,
	CardContent,
	Card,
	CardHeader,
	CardActions,
	Snackbar,
	Button,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import Axios from "axios";
import useStyles from "./styles";
import UserContext from "../../../context/UserContext";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MealPlanCards = ({ fetchedData }) => {
	const classes = useStyles();
	const { userData, setUserData } = useContext(UserContext);
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const handlePurchase = (point) => {
		Axios.post(`post-modify-patient-calori-point-by-id/${userData.user._id}`, {
			calori: 0,
			point: -point,
		}).then((res) => {
			if (res.data) handleClick();
		});

		let newUser = userData;
		newUser.user.POINTS += -point;

		setUserData({
			token: newUser.token,
			user: newUser.user,
		});
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{fetchedData.length > 0 ? (
				<main style={{ height: "70vh", overflow: "auto" }}>
					<Container className={classes.cardGrid} maxWidth="xl">
						<Grid container spacing={4}>
							{fetchedData.length > 0 &&
								fetchedData.map((card, idx) => {
									return (
										card.food.image && (
											<Grid item key={idx} xs={12} sm={6} md={4} xl={2}>
												<Card className={classes.root}>
													<CardHeader
														title={card.food.label}
														subheader={
															<div>
																$ <strong>{card.price}</strong>
															</div>
														}
													/>
													<CardMedia
														className={classes.media}
														image={card.food.image}
														title="Paella dish"
													/>
													<CardContent>
														<Typography
															variant="body2"
															color="textSecondary"
															component="p"
														>
															Energy:{" "}
															<strong>
																{card.food.nutrients.ENERC_KCAL.toFixed(2)}
															</strong>{" "}
															kcal
															<br />
															Fat:{" "}
															<strong>
																{card.food.nutrients.FAT.toFixed(2)}
															</strong>
															<br />
															Protein:{" "}
															<strong>
																{card.food.nutrients.PROCNT.toFixed(2)}
															</strong>
															<br />
															Carbs:{" "}
															<strong>
																{card.food.nutrients.CHOCDF.toFixed(2)}
															</strong>
															<br />
														</Typography>
													</CardContent>
													<CardActions disableSpacing>
														<Button
															variant="contained"
															color="secondary"
															onClick={() => handlePurchase(card.price)}
														>
															Buy with ❤{card.price} Points
														</Button>
													</CardActions>
												</Card>
											</Grid>
										)
									);
								})}
						</Grid>
					</Container>
				</main>
			) : (
				<Typography variant="h2">Select or search a food</Typography>
			)}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					successfully purchased item
				</Alert>
			</Snackbar>
		</div>
	);
};

export default MealPlanCards;
