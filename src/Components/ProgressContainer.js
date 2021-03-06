import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProgressCircle from "./ProgressCircle";

function ProgressContainer(props) {
	const [progress, setProgress] = useState(0),
		handleConversionProgress = () => {
			if (props.conversionInfo && props.conversionInfo.length > 0) {
				return (props.conversionInfo.length * 100) / props.songCount;
			}
			return 0;
			//!TODO handle what to do with progressbar when conversion fails
			//!TODO handle conversion abortion.
		};
	useEffect(() => {
		setProgress(handleConversionProgress());
	}, [props.conversionInfo]);
	return <ProgressCircle value={progress} />;
}

ProgressContainer.propTypes = {
	infoList: PropTypes.array,
	conversionInfo: PropTypes.array,
	songCount: PropTypes.number,
};

const mapStateToProps = (state) => {
	return {
		infoList: state.info.infoList,
		conversionInfo: state.info.conversionInfo,
		songCount: state.info.songCount,
	};
};
export default connect(mapStateToProps)(ProgressContainer);
