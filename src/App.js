import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Convert from "./pages/Convert";
import { makeStyles } from "@material-ui/core";
// import AppleMusicToSpotify from "./pages/AppleMusicToSpotify";
import { colors } from "./Utils/variables";
import "./App.css";

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: colors.lightBackground,
	},
	content: {
		minHeight: "80vh",
	},
});

function App() {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<Navbar />
				<br />
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/convert">
						{/** Show if logged in. Double check */}
						<Convert />
					</Route>
					{/* <Route path="/applemusic-spotify">
					<AppleMusicToSpotify />
				</Route> */}
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default App;
