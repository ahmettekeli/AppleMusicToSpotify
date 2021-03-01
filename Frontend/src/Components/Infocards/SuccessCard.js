import React from "react";
import "./InfoCard.css";

const SuccessCard = (props) => {
	return (
		<div className="info-card info-success ">
			<div className="icon">
				<span className="material-icons success-icon">check_circle_outline</span>
			</div>
			{props.info}
		</div>
	);
};

export default SuccessCard;
