const axios = require("axios");
const configs = require("./config.json");
const { playlistsEndpoint, addSongsToPlaylistEndpoint, searchEndpoint, findPlaylist } = require("./utils");
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
			const response = await axios.get(searchEndpoint(song, artist, album), {
				headers: {
					authorization: apiToken,
				},
			});
			const songData = {
				id: response.data.tracks.items[0].id,
				uri: response.data.tracks.items[0].uri,
				name: response.data.tracks.items[0].name,
				artist: response.data.tracks.items[0].artists[0].name,
				album: response.data.tracks.items[0].album.name,
			};
			return songData;
		} catch (error) {
			console.log({ error });
		}
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
		} catch (error) {
			console.log({ error });
		}
	};

module.exports = {
	createPlaylist,
	retrievePlaylistData,
	searchSong,
	addSongsToPlaylist,
};
