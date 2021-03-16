import React, { useState } from "react";
import { convertPlaylist, getUserId } from "../Services/spotifyPlaylistService";
import {validateUrl} from "../Utils/validation";
import {parseAccessToken} from "../Utils/utils";

//TODO: Implement info card creation on playlist conversion.
//TODO: Add progress bar.

function ConversionForm(props) {
	const 
		[appleMusicPlaylistUrl, setAppleMusicPlaylistUrl] = useState(""),
		[spotifyPlaylistName, setSpotifyPlaylistName] = useState(""),
		[spotifyPlaylistDescription, setSpotifyPlaylistDescription] = useState(""),
		[isUrlValid, setIsUrlValid] = useState(true);

	const 
		handleConversion = async () => {
			if (!validateUrl(appleMusicPlaylistUrl)) {
				const params = {
					url: appleMusicPlaylistUrl,
					name: spotifyPlaylistName,
					description: spotifyPlaylistDescription,
				};
				const apiToken = parseAccessToken(props.query);
				const userId = await getUserId(apiToken);
				convertPlaylist(userId, apiToken, params);
			} else {
				setIsUrlValid(false);
				console.log("apple music playlist url is not valid", isUrlValid);
			}
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
			<button onClick={handleConversion}>
				Convert
			</button>
		</>
	);
}

export default ConversionForm;
