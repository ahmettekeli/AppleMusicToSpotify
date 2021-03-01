import React from "react";
import FailCard from "./FailCard";
import SuccessCard from "./SuccessCard";
import "./InfoCard.css";

const InfoCard = (props) => {
		return createCard(props);
	},
	createCard = (props) => {
		if (props.isSuccess) {
			return <SuccessCard info={props.info} />;
		}
		return <FailCard info={props.info} />;
	};

export default InfoCard;
