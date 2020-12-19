import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: theme.spacing(3),
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	sideButtons: {
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(3),
		justifyContent: "space-evenly",
	},
}));

export default useStyles;
