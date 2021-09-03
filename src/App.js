import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Convert from "./pages/Convert";
import Home from "./pages/Home";
import { makeStyles } from "@material-ui/core";
import { colors } from "./Utils/variables";
import "./App.css";
import "./Services/localizationService";

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
				<Header />
				<br />
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/convert">
						{/** Show if logged in. Double check */}
						<Convert />
					</Route>
					<Route path="/">
						{/** Show if logged in. Double check */}
						<Home />
					</Route>
				</Switch>
			</div>
			<Footer />
		</div>
	);
}
export default App;
