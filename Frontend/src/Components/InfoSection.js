import React from "react";
import "./InfoSection.css";
import SongCard from "./SongCard";
import InfoCard from "./InfoCard";

// TODO
const InfoSection = (props) => {
	return (
		<div className="info">
			<SongCard isFound={false} songName={"Letting Go"} artist={"Anton Fargau Petrini"} />
			<SongCard isFound={true} songName={"Alivio"} artist={"Sound Emotions"} />
			<SongCard isFound={false} songName={"Windmill"} artist={"Daniel Bror Palm"} />
			<InfoCard isSuccess={true} info="Playlist has been created successfully" />
		</div>
	);
};
export default InfoSection;
