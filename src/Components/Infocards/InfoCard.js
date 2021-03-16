import React from "react";
import FailCard from "./FailCard";
import SuccessCard from "./SuccessCard";
import "./InfoCard.css";

const InfoCard = (props) => {
		return createCard(props);
	},
	createCard = (props) => {
		if (props.isSuccess) {
			return <SuccessCard data={props.data}/>;
		}
		return <FailCard data={props.data}/>;
	};

export default InfoCard;
