import React from "react";
import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { colors } from "../Utils/variables";

const useStyles = makeStyles({
	root: {
		margin: "0",
		padding: "0",
		display: "flex",
		backgroundColor: colors.warning,
		height: "100vh",
	},
});

function Home() {
	const classes = useStyles();

	return (
		<div>
			{/* <CssBaseline /> */}
			<Container maxWidth="sm">
				{/* <Box sx={{ bgcolor: colors.headerBackground, height: "100vh" }} /> */}
				<Box className={classes.root}></Box>
			</Container>
		</div>
	);
}

export default Home;
