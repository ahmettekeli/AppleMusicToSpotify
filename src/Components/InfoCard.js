import React from "react";
import styled from "styled-components";
import "./InfoCard.css";

const InfoCard = (props) => createCard(props),
	createCard = (props) => {
		let cardClass = "info-card";
		let cardIcon;
		if (props.isSuccess) {
			cardClass += " info-success";
			cardIcon = <i class="fa fa-check-circle" aria-hidden="true"></i>;
		} else {
			cardClass += " info-fail";
			cardIcon = <i class="fa fa-times-circle" aria-hidden="true"></i>;
		}

		return (
			<div className={cardClass}>
				<div className="icon">{cardIcon}</div>
				{props.data}
			</div>
		);
	};

export default InfoCard;
