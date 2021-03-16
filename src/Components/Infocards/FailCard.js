import React from "react";
import {CgCloseO} from "react-icons/cg";
import "./InfoCard.css";

const FailCard = (props) => {
	return (
		<div className="info-card info-fail ">
			<div className="icon">
				<CgCloseO/>
			</div>
			{props.data}
		</div>
	);
};

export default FailCard;
