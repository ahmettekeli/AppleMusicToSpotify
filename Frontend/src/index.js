const { getPlaylistDataFromAPI, getSongUris, generateSpotifyPlaylist } = require("./playlistService");
const env = require("../config");
console.log("api url:", env.apiUrl);
let requestBody = {
	url: "",
};
const form = document.getElementById("inputForm");
form.onsubmit = (e) => {
	e.preventDefault();
	//check if the link is valid here
	requestBody.url = e.target[0].value;
	console.log({ name: e.target[1].value, description: e.target[2].value });
	convertPlaylist({ name: e.target[1].value, description: e.target[2].value });
};

const convertPlaylist = (args) => {
	getPlaylistDataFromAPI(env.apiUrl, requestBody)
		.then((response) => {
			getSongUris(response.data).then((songUris) => {
				console.log(`${songUris.length} songs has been found on Spotify.`);
				generateSpotifyPlaylist(songUris, args);
			});
		})
		.catch((error) => {
			console.log({ error });
		});
};
