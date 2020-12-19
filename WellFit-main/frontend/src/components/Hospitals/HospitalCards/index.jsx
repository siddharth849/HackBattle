import React from "react";

import {
	Typography,
	Container,
	Grid,
	CardMedia,
	CardContent,
	Card,
} from "@material-ui/core";

import useStyles from "./styles";

const HospitalCards = ({ hospitalList }) => {
	const classes = useStyles();
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{hospitalList.length > 0 ? (
				<main style={{ height: "80vh", overflow: "auto" }}>
					<Container className={classes.cardGrid} maxWidth="xl">
						<Grid container spacing={4}>
							{hospitalList.length > 0 &&
								hospitalList.map((card, idx) => (
									<Grid item key={idx} xs={12} sm={6} md={4} xl={2}>
										<Card className={classes.card}>
											<CardMedia
												className={classes.cardMedia}
												image="https://source.unsplash.com/random"
												title="Image title"
											/>
											<CardContent className={classes.cardContent}>
												<Typography gutterBottom variant="h5" component="h2">
													{card.NAME}
												</Typography>
												<Typography variant="body1">
													{card.ADDRESS},
													<br />
													{card.CITY},
													<br />
													{card.STATE},
													<br />
													{card.ZIP},
													<br />
													{card.PHONE}
												</Typography>
												<br />

												<Typography variant="body2">
													Base: <strong>{card.BASE_COST.toFixed(2)}</strong>
													<br />
													Base Encounter cost:{" "}
													<strong>{card.BASE_ENCOUNTER_COST}</strong>
													<br />
													Total claim cost:{" "}
													<strong>{card.TOTAL_CLAIM_COST}</strong>
													<br />
													Payer coverage: <strong>{card.PAYER_COVERAGE}</strong>
												</Typography>
											</CardContent>
										</Card>
									</Grid>
								))}
						</Grid>
					</Container>
				</main>
			) : (
				<Typography variant="h2">Select disease to see hospitals</Typography>
			)}
		</div>
	);
};

export default HospitalCards;
