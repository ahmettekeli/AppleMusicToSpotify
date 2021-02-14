import React from "react";
import "./InfoCard.css";

// TODO
const InfoCard = (props) => {
		return <div className="card-container">{createCard(props)}</div>;
	},
	createCard = (props) => {
		if (props.isSuccess) {
			return (
				<div className="info-card info-success ">
					<div className="icon">
						<span className="material-icons success-icon">check_circle_outline</span>
					</div>
					{props.info}
				</div>
			);
		}
		return (
			<div className="info-card info-fail ">
				<div className="icon">
					<span className="material-icons fail-icon">highlight_off</span>
				</div>
				{props.info}
			</div>
		);
	};

export default InfoCard;
