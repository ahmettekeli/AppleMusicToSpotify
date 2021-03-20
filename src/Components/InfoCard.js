import React from "react";
import { CgCheckO, CgCloseO } from "react-icons/cg";
import "./InfoCard.css";

const InfoCard = (props) => {
		return createCard(props);
	},
	createCard = (props) => {
		let cardClass = "info-card";
		let cardIcon;
		if (props.isSuccess) {
			cardClass += " info-success";
			cardIcon = <CgCheckO />;
		} else {
			cardClass += " info-fail";
			cardIcon = <CgCloseO />;
		}

		return (
			<div className={cardClass}>
				<div className="icon">{cardIcon}</div>
				{props.data}
			</div>
		);
	};

export default InfoCard;
