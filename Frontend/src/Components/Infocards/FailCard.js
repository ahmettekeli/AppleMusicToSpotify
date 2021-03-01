import React from "react";
import "./InfoCard.css";

const FailCard = (props) => {
	return (
		<div className="info-card info-fail ">
			<div className="icon">
				<span className="material-icons fail-icon">highlight_off</span>
			</div>
			{props.info}
		</div>
	);
};

export default FailCard;
