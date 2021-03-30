import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AppleMusicToSpotify from "./AppleMusicToSpotify";
import Login from "./Login";
import { conversionTypes } from "../Utils/utils";
import { login } from "../redux/reducers/user-actions";

function Convert(props) {
	const location = useLocation(),
		dispacth = useDispatch(),
		searchQuery = location.search,
		[conversionType, setConversionType] = useState(""),
		handleConversionSelection = (convType) => {
			setConversionType(convType);
		},
		getConversionComponent = () => {
			if (conversionType === conversionTypes.APPLE_MUSIC_TO_SPOTIFY) {
				return <AppleMusicToSpotify query={searchQuery} />;
			}
		},
		checkSpotifyLogin = () => {
			if (props.spotifyLogin) {
				return (
					<>
						<button
							onClick={() => {
								handleConversionSelection(conversionTypes.APPLE_MUSIC_TO_SPOTIFY);
							}}
						>
							Apple Music to Spotify
						</button>
						{getConversionComponent()}
					</>
				);
			}
			return <Login />;
		};

	useEffect(() => {
		if (searchQuery) {
			dispacth(login());
		}
	}, []);
	return (
		<div>
			<h2>Main conversion page is here.</h2>
			{checkSpotifyLogin()}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		spotifyLogin: state.user.spotifyLogin,
	};
};
export default connect(mapStateToProps)(Convert);
