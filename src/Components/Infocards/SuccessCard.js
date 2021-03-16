import React from "react";
import {CgCheckO} from "react-icons/cg";
import "./InfoCard.css";

const SuccessCard = (props) => {
	return (
		<div className="info-card info-success ">
			<div className="icon">
				<CgCheckO/>
			</div>
			{props.data}
		</div>
	);
};

export default SuccessCard;
