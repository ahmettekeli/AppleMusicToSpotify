import React from "react";
import { makeStyles } from "@material-ui/core";
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
			<Container maxWidth="sm">
				<Box className={classes.root}></Box>
			</Container>
		</div>
	);
}

export default Home;
