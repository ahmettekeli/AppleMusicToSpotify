import React from "react";
import "./SongCard.css";

// TODO
const SongCard = (props) => {
		//Burada song card olusturman gerek.
		return <div className="card-container">{getSongCard(props)}</div>;
	},
	getSongCard = (props) => {
		if (props.isFound) {
			return (
				<div className="song-card song-found ">
					<div className="icon">
						<span className="material-icons success-icon">check_circle_outline</span>
					</div>
					{`${props.songName} - ${props.artist} has been added successfully.`}
				</div>
			);
		}
		return (
			<div className="song-card song-not-found ">
				<div className="icon">
					<span className="material-icons fail-icon">highlight_off</span>
				</div>
				{`${props.songName} - ${props.artist} could not be found on Spotify.`}
			</div>
		);
	};

export default SongCard;
