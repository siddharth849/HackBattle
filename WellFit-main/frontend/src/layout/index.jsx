import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
	AppBar,
	CssBaseline,
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	Button,
	Avatar,
	Switch,
} from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";

import UserContext from "../context/UserContext";
import useStyles from "./styles";

function Layout(props) {
	const { userData, setUserData } = useContext(UserContext);

	const {
		setCurrentTheme,
		currentTheme,
		window,
		children,
		componentList,
		location: { pathname },
	} = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleLogout = () => {
		setUserData({
			token: undefined,
			user: undefined,
		});
		localStorage.setItem("auth-token", "");
	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					padding: 20,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: 10,
					}}
				>
					<Avatar
						className={classes.large}
						src="https://avatars.dicebear.com/api/male/adas.svg"
						alt="avatar"
					/>
				</div>
				<Typography>Welcome</Typography>
				<Typography>{userData.user && userData.user.FIRST}</Typography>
			</div>

			<Divider />
			<List style={{ padding: 0 }}>
				{componentList.map((item, index) => (
					<ListItem
						component={Link}
						to={item.url}
						selected={item.url === pathname}
						button
						key={index}
					>
						<ListItemIcon>
							<item.icon />
						</ListItemIcon>
						<ListItemText primary={item.name} />
					</ListItem>
				))}
			</List>
			<Divider />
			<div style={{ flex: 1 }} />
			<div
				style={{
					margin: 20,
					display: "flex",
				}}
			>
				<Switch
					checked={currentTheme}
					onChange={() => {
						setCurrentTheme(!currentTheme);
					}}
				/>
				<Button
					style={{
						marginLeft: "auto",
						marginRight: "auto",
					}}
					variant="contained"
					color="primary"
					onClick={handleLogout}
				>
					LOGOUT
				</Button>
			</div>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="absolute" className={classes.appBar}>
				<Toolbar style={{ minHeight: 48 }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						WellFit
					</Typography>
					<div className={classes.logoutBTN}>
						<div className={classes.logoutBTN}>
							<FavoriteIcon color="secondary" />
							<Typography>{userData.user && userData.user.POINTS}</Typography>
						</div>
						<Button
							variant="contained"
							color="secondary"
							onClick={handleLogout}
						>
							LOGOUT
						</Button>
					</div>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
}

Layout.propTypes = {
	window: PropTypes.func,
};

export default withRouter(Layout);
