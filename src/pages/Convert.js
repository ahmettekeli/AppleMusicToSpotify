import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppleMusicToSpotify from "./AppleMusicToSpotify";

const conversionTypes = Object.freeze({
	APPLE_MUSIC_TO_SPOTIFY: "AppleToSpotify",
	SPOTIFY_TO_APPLE_MUSIC: "SpotifyToApple",
});

function Convert() {
	const location = useLocation();
	const searchQuery = location.search;
	const [conversionType, setConversionType] = useState("");
	const handleConversionSelection = (convType) => {
			setConversionType(convType);
		},
		getConversionComponent = () => {
			if (conversionType === conversionTypes.APPLE_MUSIC_TO_SPOTIFY) {
				return <AppleMusicToSpotify query={searchQuery} />;
			}
		};
	return (
		<div>
			<h2>Main conversion page is here.</h2>
			<button
				onClick={() => {
					handleConversionSelection(conversionTypes.APPLE_MUSIC_TO_SPOTIFY);
				}}
			>
				Apple Music to Spotify
			</button>
			{getConversionComponent()}
		</div>
	);
}

export default Convert;
