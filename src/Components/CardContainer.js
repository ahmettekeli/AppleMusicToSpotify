import React from "react";
import { connect } from "react-redux";
import "./CardContainer.css";
import SongCard from "./SongCard";
import InfoCard from "./InfoCard";

//!TODO change name..

const CardContainer = (props) => {
	const handleCards = (props) => {
			return (
				<>
					{handleInfoCards(props.infoList)}
					{handleSongCards(props.songInfoList)}
				</>
			);
		},
		handleInfoCards = (infoCards) => {
			if (infoCards) {
				return infoCards.map((info) => <InfoCard key={info.id} isSuccess={info.isSuccess} data={info.data} />);
			}
		},
		handleSongCards = (songCards) => {
			if (songCards) {
				return songCards.map((info) => (
					<SongCard
						key={info.id}
						isSuccess={info.isSuccess}
						song={info.song}
						artist={info.artist}
						album={info.album}
						image={info.image}
						url={info.url}
					/>
				));
			}
			return null;
		};

	return <div className="info">{handleCards(props)}</div>;
};

const mapStateToProps = (state) => {
	return {
		infoList: state.info.infoList,
		songInfoList: state.info.songInfoList,
	};
};
export default connect(mapStateToProps)(CardContainer);
