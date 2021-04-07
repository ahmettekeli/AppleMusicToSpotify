import React from "react";
import "./InfoCard.css";

const InfoCard = (props) => createCard(props),
	createCard = (props) => {
		let cardClass = "info-card";
		let cardIcon = <i className="fa fa-check-circle" aria-hidden="true"></i>;
		if (props.isSuccess) {
			cardClass += " info-success";
		} else {
			cardClass += " info-fail";
			cardIcon = <i className="fa fa-times-circle" aria-hidden="true"></i>;
		}

		return (
			<div className={cardClass}>
				<div className="icon">{cardIcon}</div>
				<div className="info-content">
					<p>{props.data}</p>
				</div>
			</div>
		);
	};

export default InfoCard;
