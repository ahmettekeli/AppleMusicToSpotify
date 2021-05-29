import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import "./ProgressBar.css";

function ProgressBar(props) {
	const progressBarEl = useRef(null);
	const handleConversionProgress = (infoList) => {
		let defaultInfoCount = 4,
			songCount = props.songCount + defaultInfoCount,
			conversionPercent;
		if (songCount === defaultInfoCount) {
			conversionPercent = 0;
		} else {
			conversionPercent = ((infoList.length || 0) * 100) / songCount;
		}
		//!TODO make this a circle inside the modal. (Material UI)
		//!TODO handle what to do with progressbar when conversion fails
		//!TODO handle conversion abortion.
		progressBarEl.current.style.width = `${conversionPercent}%`;
	};
	useEffect(() => {
		handleConversionProgress(props.infoList);
	}, [props.infoList]);
	return (
		<div className="progressbar-container">
			<div className="progress progress-moved">
				<div ref={progressBarEl} className="progress-bar"></div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		infoList: state.info.infoList,
		songCount: state.info.songCount,
	};
};
export default connect(mapStateToProps)(ProgressBar);
