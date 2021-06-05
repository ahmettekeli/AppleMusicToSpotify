import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { colors } from "../Utils/variables";

const useStyles = makeStyles({
	content: {
		display: "flex",
		justifyContent: "center",
		color: colors.warning,
	},
});

function ConversionLogField(props) {
	const classes = useStyles();
	return (
		<Typography color="textSecondary" component="h5" variant="h5" className={classes.content}>
			{props.conversionLog}
		</Typography>
	);
}

const mapStateToProps = (state) => {
	return {
		conversionLog: state.info.conversionLog,
	};
};
export default connect(mapStateToProps)(ConversionLogField);
