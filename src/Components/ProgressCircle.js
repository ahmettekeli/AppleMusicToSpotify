import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { colors } from "../Utils/variables";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		display: "flex",
		justifyContent: "center",
	},
	outerBox: {
		position: "relative",
		display: "inline-flex",
	},
	innerBox: {
		top: "0",
		left: "0",
		bottom: "0",
		right: "0",
		position: "absolute",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	circle: {
		color: colors.success,
	},
}));

function ProgressCircle(props) {
	const classes = useStyles(),
		circleSize = 75;
	return (
		<div className={classes.root}>
			<Box className={classes.outerBox}>
				<CircularProgress
					variant="determinate"
					value={props.value}
					size={circleSize}
					className={classes.circle}
					{...props}
				/>
				<Box className={classes.innerBox}>
					<Typography variant="caption" component="div" color="textSecondary">
						{props.value !== 0 ? `${parseInt(props.value)}%` : null}
					</Typography>
				</Box>
			</Box>
		</div>
	);
}

ProgressCircle.propTypes = {
	value: PropTypes.number,
};

export default ProgressCircle;
