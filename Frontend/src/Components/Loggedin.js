import React, { useState } from "react";
import queryString from "query-string";
import { convertPlaylist, getUserId } from "../Services/SpotifyPlaylistService";
import InfoSection from "./InfoSection";
import "./Loggedin.css";

const Loggedin = (props) => {
	// useEffect(() => {
	// 	const parsedText = queryString.parse(props.location.search);
	// 	const accessToken = parsedText.access_token;
	// 	console.log({ accessToken });
	// });
	let isUrlValid = true;
	const [appleMusicPlaylistUrl, setAppleMusicPlaylistUrl] = useState(""),
		[spotifyPlaylistName, setSpotifyPlaylistName] = useState(""),
		[spotifyPlaylistDescription, setSpotifyPlaylistDescription] = useState(""),
		getSpotifyToken = (searchText) => {
			return queryString.parse(searchText.location.search).access_token;
		},
		validateInput = () => {
			return true;
		},
		clickHandler = async () => {
			if (!validateInput()) {
				//TODO run convertPlaylist on button click, but how to suppply params.
				const params = {
					url: appleMusicPlaylistUrl,
					name: spotifyPlaylistName,
					description: spotifyPlaylistDescription,
				};
				const apiToken = getSpotifyToken(props);
				const userId = await getUserId(apiToken);
				convertPlaylist(userId, apiToken, params);
			} else {
				//Show info about the input not being a valid URL.
				isUrlValid = false;
				console.log("click handler false", isUrlValid);
			}
			//
		},
		showValidations = (isUrlValid) => {
			if (isUrlValid) {
				return <p className="validation-fail">Url is not valid.</p>;
			} else return;
		};

	return (
		<div>
			{/* <h3>Access Token:{getSpotifyToken(props)}</h3> */}
			<label>Apple Music Playlist URL:</label>
			<input
				type="text"
				placeholder="playlist url"
				value={appleMusicPlaylistUrl}
				onChange={(e) => setAppleMusicPlaylistUrl(e.target.value)}
			/>
			<br />
			{showValidations(isUrlValid)}
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
			<br />
			<br />
			<InfoSection />
		</div>
	);
};

export default Loggedin;
