const { createPlaylist, retrievePlaylistData, addSongsToPlaylist, getSongUris } = require("./playlistService");
const { scrap } = require("./scrapper");
const { env } = require("../config.json");

const convertPlaylist = async () => {
		getScrapData()
			// scrap(env.playlistURL)
			.then((data) => {
				getSongUris(data).then((songUris) => {
					console.log(`${songUris.length} songs has been found on Spotify.`);
					generateSpotifyPlaylist(songUris);
				});
			})
			.catch((error) => {
				console.log({ error });
			});
	},
	getScrapData = async () => {
		return await scrap(env.playlistURL);
	},
	generateSpotifyPlaylist = async (uris) => {
		try {
			const listCreattionResponse = await createPlaylist(
				"My Awesome Spotify Playlist",
				"My awesome Spotify Playlist which is converted from Apple Music.",
				true
			);
			if (listCreattionResponse) {
				const playListData = await retrievePlaylistData("My Awesome Spotify Playlist"),
					songAdditionResponse = await addSongsToPlaylist(uris, playListData.id);
				if (songAdditionResponse.status == 201) {
					console.log("Spotify playlist has been created.");
				}
			}
		} catch (error) {
			console.log({ error });
		}
	};

convertPlaylist();
