const axios = require("axios");
const configs = require("../config.json");
const { playlistsEndpoint, addSongsToPlaylistEndpoint, searchEndpoint, findPlaylist, encodeItem } = require("./utils");
const apiToken = configs.env.token;
const userId = configs.env.userId;

const createPlaylist = async (name, description, isPublic) => {
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
	retrievePlaylistData = async (name) => {
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
	};

module.exports = {
	createPlaylist,
	retrievePlaylistData,
	searchSong,
	addSongsToPlaylist,
	getSongUris,
};
