const { getPlaylistDataFromAPI, getSongUris, generateSpotifyPlaylist } = require("./playlistService");
const env = require("../config");
let requestBody = {
	url: "",
};
const form = document.getElementById("inputForm");
form.onsubmit = (e) => {
	e.preventDefault();
	//check if the link is valid here
	requestBody.url = e.target[0].value;
	convertPlaylist();
};

const convertPlaylist = () => {
	getPlaylistDataFromAPI(env.apiUrl, requestBody)
		.then((response) => {
			getSongUris(response.data).then((songUris) => {
				console.log(`${songUris.length} songs has been found on Spotify.`);
				generateSpotifyPlaylist(songUris);
			});
		})
		.catch((error) => {
			console.log({ error });
		});
};
