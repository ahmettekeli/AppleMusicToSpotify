import React from "react";
import PropTypes from "prop-types";
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
		<Typography color="textSecondary" component="h6" variant="h6" className={classes.content}>
			{props.conversionLog}
		</Typography>
	);
}

ConversionLogField.propTypes = {
	conversionLog: PropTypes.string,
};

const mapStateToProps = (state) => {
	return {
		conversionLog: state.info.conversionLog,
	};
};
export default connect(mapStateToProps)(ConversionLogField);
