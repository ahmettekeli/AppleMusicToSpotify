import React, { useState } from "react";
import queryString from "query-string";
import { convertPlaylist, getUserId } from "../Services/SpotifyPlaylistService";

//TODO: Implement info card creation on playlist conversion.
//TODO: Add progress bar.

function ConversionForm(props) {
	const [appleMusicPlaylistUrl, setAppleMusicPlaylistUrl] = useState(""),
		[spotifyPlaylistName, setSpotifyPlaylistName] = useState(""),
		[spotifyPlaylistDescription, setSpotifyPlaylistDescription] = useState(""),
		[isUrlValid, setIsUrlValid] = useState(true);

	const getSpotifyToken = (searchText) => {
			console.log(searchText);
			return queryString.parse(searchText.location.search).access_token;
		},
		validateInput = () => {
			return false;
		},
		clickHandler = async () => {
			if (!validateInput()) {
				//TODO run convertPlaylist on button click, but how to suppply params.
				const params = {
					url: appleMusicPlaylistUrl,
					name: spotifyPlaylistName,
					description: spotifyPlaylistDescription,
				};
				//TODO remove props.props. Did it for debug purposes.
				const apiToken = getSpotifyToken(props.props);
				const userId = await getUserId(apiToken);
				convertPlaylist(userId, apiToken, params);
			} else {
				//Show info about the input not being a valid URL.
				setIsUrlValid({ isUrlValid: false });
				console.log("click handler false", isUrlValid);
			}
			//
		},
		showValidations = () => {
			if (!isUrlValid) {
				return <p className="validation-fail">Url is not valid.</p>;
			} else return;
		};

	return (
		<>
			{/* <h3>Access Token:{getSpotifyToken(props)}</h3> */}
			<label>Apple Music Playlist URL:</label>
			<input
				type="text"
				placeholder="playlist url"
				value={appleMusicPlaylistUrl}
				onChange={(e) => setAppleMusicPlaylistUrl(e.target.value)}
			/>
			<br />
			{showValidations()}
			<label>Spotify Playlist Name:</label>
			<input
				type="text"
				placeholder="name"
				value={spotifyPlaylistName}
				onChange={(e) => setSpotifyPlaylistName(e.target.value)}
			/>
			<br />
			<label>Spotify Playlist Description:</label>
			<input
				type="text"
				placeholder="description"
				value={spotifyPlaylistDescription}
				onChange={(e) => setSpotifyPlaylistDescription(e.target.value)}
			/>
			<button id="convert" onClick={clickHandler}>
				Convert
			</button>
		</>
	);
}

export default ConversionForm;
