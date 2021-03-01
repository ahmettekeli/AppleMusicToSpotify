import React from "react";
import "./InfoSection.css";
import InfoCard from "./Infocards/InfoCard";

// TODO
const InfoSection = (props) => {
	return (
		<div className="info">
			<InfoCard isSuccess={false} info="Letting Go - Anton Fargau Petrini" />
			<InfoCard isSuccess={true} info="Alivio - Sound Emotions" />
			<InfoCard isSuccess={false} info="Windmill - Daniel Bror Palm" />
			<InfoCard isSuccess={true} info="Playlist has been created successfully" />
		</div>
	);
};
export default InfoSection;
