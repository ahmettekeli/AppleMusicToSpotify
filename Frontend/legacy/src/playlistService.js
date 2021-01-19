const regeneratorRuntime = require("regenerator-runtime");
const axios = require("axios");
const env = require("../config");
const { playlistsEndpoint, addSongsToPlaylistEndpoint, searchEndpoint, findPlaylist, encodeItem } = require("./utils");
const apiToken = env.token;
const userId = env.userId;

const getPlaylistDataFromAPI = async (url, requestBody) => {
		try {
			const response = await axios.post(url, requestBody);
			return response.data;
		} catch (error) {
			console.log({ error });
		}
	},
	createPlaylist = async (name, description, isPublic) => {
		let requestBody = {
			name,
			description,
			public: isPublic,
		};
		try {
			const response = await axios.post(playlistsEndpoint(userId), requestBody, {
				headers: {
					authorization: apiToken,
				},
			});
			return {
				status: response.status,
				message: response.statusText,
			};
		} catch (error) {
			console.log({ error });
		}
	},
	retrievePlaylistDataFromSpotify = async (name) => {
		try {
			const response = await axios.get(playlistsEndpoint(userId), {
				headers: {
					authorization: apiToken,
				},
			});
			const createdPlaylist = findPlaylist(response.data, name);
			let data = {
				id: createdPlaylist.id,
				name: createdPlaylist.name,
				description: createdPlaylist.description,
				public: createdPlaylist.public,
				uri: createdPlaylist.uri,
				songCount: createdPlaylist.tracks.total,
			};
			return data;
		} catch (error) {
			console.log({ error });
		}
	},
	searchSong = async (song, artist, album) => {
		try {
			const response = await axios.get(searchEndpoint(encodeItem(song), encodeItem(artist), encodeItem(album)), {
				headers: {
					authorization: apiToken,
				},
			});
			if (response.data.tracks.items[0]) {
				const songData = {
					uri: response.data.tracks.items[0].uri,
					name: response.data.tracks.items[0].name,
					artist: response.data.tracks.items[0].artists[0].name,
					album: response.data.tracks.items[0].album.name,
				};
				return songData;
			} else {
				console.log({ song: song, artist: artist, album, message: "Song could not be found in spotify." });
			}
			return null;
		} catch (error) {
			console.log({ error });
		}
	},
	getSongUris = async (songs) => {
		let songUris = [],
			song;
		for (let item of songs) {
			song = await searchSong(item.song, item.artist, item.album);
			if (song) {
				songUris.push(song.uri);
			}
		}
		return songUris;
	},
	addSongsToPlaylist = async (uriList, playlistId) => {
		let requestBody = {
			uris: uriList,
		};
		try {
			const response = await axios.post(addSongsToPlaylistEndpoint(playlistId), requestBody, {
				headers: {
					authorization: apiToken,
				},
			});
			return {
				status: response.status,
				message: response.statusText,
			};
		} catch (error) {
			console.log({ error });
		}
	},
	generateSpotifyPlaylist = async (uris, args) => {
		try {
			const listCreattionResponse = await createPlaylist(args.name, args.description, true);
			if (listCreattionResponse) {
				const playListData = await retrievePlaylistDataFromSpotify(args.name),
					songAdditionResponse = await addSongsToPlaylist(uris, playListData.id);
				if (songAdditionResponse.status == 201) {
					console.log(`Spotify playlist with the name: ${args.name} has been created.`);
				}
			}
		} catch (error) {
			console.log({ error });
		}
	};

module.exports = {
	createPlaylist,
	retrievePlaylistDataFromSpotify,
	getPlaylistDataFromAPI,
	searchSong,
	addSongsToPlaylist,
	getSongUris,
	generateSpotifyPlaylist,
};
