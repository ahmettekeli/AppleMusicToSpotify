import React from "react";
import { connect } from "react-redux";
import "./InfoSection.css";
import InfoCard from "./InfoCard";

const InfoSection = (props) => {
	const handleInfoCards = (infoList) => {
		if (infoList) {
			return infoList.map((info) => <InfoCard key={info.id} isSuccess={info.isSuccess} data={info.data} />);
		}
		return null;
	};
	return <div className="info">{handleInfoCards(props.infoList)}</div>;
};

const mapStateToProps = (state) => {
	return {
		infoList: state.info.infoList,
	};
};
export default connect(mapStateToProps)(InfoSection);
