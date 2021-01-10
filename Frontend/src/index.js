const { getPlaylistDataFromAPI, getSongUris, generateSpotifyPlaylist } = require("./playlistService");
const env = require("../config");
const requestBody = {
	url: env.playlistURL,
};

const convertPlaylist = async () => {
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

convertPlaylist();
