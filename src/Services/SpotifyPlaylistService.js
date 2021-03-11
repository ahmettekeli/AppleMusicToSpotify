import axios from "axios";
import {
	playlistsEndpoint,
	addSongsToPlaylistEndpoint,
	searchEndpoint,
	findPlaylist,
	userEndpoint,
	encodeItem,
} from "../Utils/SpotifyUtil.js";

const API_URL = process.env.API_URL;

export const getPlaylistDataFromAPI = async (url, requestBody) => {
		try {
			const response = await axios.post(url, requestBody);
			return response.data;
		} catch (error) {
			console.log({ error });
		}
	};
export const getUserId = async (apiToken) => {
	try {
		const response = await axios.get(userEndpoint(), {
			headers: {
				Authorization: `Bearer ${apiToken}`,
			},
		});
		return response.data.id;
	} catch (error) {
		console.log({ error });
	}
};
export const createPlaylist = async (name, description, isPublic, userId, apiToken) => {
	let requestBody = {
		name,
		description,
		public: isPublic,
	};
	try {
		const response = await axios.post(playlistsEndpoint(userId), requestBody, {
			headers: {
				Authorization: `Bearer ${apiToken}`,
			},
		});
		return {
			status: response.status,
			message: response.statusText,
		};
	} catch (error) {
		console.log({ createPlaylistError:error });
	}
};
export const retrievePlaylistDataFromSpotify = async (name, userId, apiToken) => {
	try {
		const response = await axios.get(playlistsEndpoint(userId), {
			headers: {
				Authorization: `Bearer ${apiToken}`,
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
		console.log({ retrievePlaylistError:error });
	}
};
export const searchSong = async (song, artist, album, apiToken) => {
	try {
		const response = await axios.get(searchEndpoint(encodeItem(song), encodeItem(artist), encodeItem(album)), {
			headers: {
				Authorization: `Bearer ${apiToken}`,
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
			//TODO Could fire and event and send not found song data.
		}
		return null;
	} catch (error) {
		console.log({ searchError:error });
	}
};
export const getSongUris = async (songs, apiToken) => {
	let songUris = [],
		song;
	for (let item of songs) {
		song = await searchSong(item.song, item.artist, item.album, apiToken);
		if (song) {
			songUris.push(song.uri);
			//TODO Could fire an event and provide found song data.
		}
	}
	return songUris;
};
export const addSongsToPlaylist = async (uriList, playlistId, apiToken) => {
	let requestBody = {
		uris: uriList,
	};
	try {
		const response = await axios.post(addSongsToPlaylistEndpoint(playlistId), requestBody, {
			headers: {
				Authorization: `Bearer ${apiToken}`,
			},
		});
		return {
			status: response.status,
			message: response.statusText,
		};
	} catch (error) {
		console.log({ addSongError:error });
	}
};
export const generateSpotifyPlaylist = async (uris, userId, apiToken, args) => {
	try {
		const listCreationResponse = await createPlaylist(args.name, args.description, true, userId, apiToken);
		if (listCreationResponse) {
			const playListData = await retrievePlaylistDataFromSpotify(args.name, userId, apiToken),
				songAdditionResponse = await addSongsToPlaylist(uris, playListData.id, apiToken);
			if (songAdditionResponse.status === 201) {
				console.log(`Spotify playlist with the name: ${args.name} has been created.`);
				//TODO Could fire and event and send playlist created message.
			}
		}
	} catch (error) {
		console.log({ generatePlaylistError:error });
	}
};
//TODO hide apiUrl, modify args object.
export const convertPlaylist = (userId, apiToken, args) => {
	console.log(userId, args);
	console.log(apiToken);
	//get api url, requestBody,
	getPlaylistDataFromAPI(API_URL, { url: args.url })
		.then((response) => {
			console.log("song data: ", response.data);
			getSongUris(response.data, apiToken).then((songUris) => {
				console.log(`${songUris.length} songs has been found on Spotify.`);
				//TODO Could fire and event and send converted songs statistics.
				generateSpotifyPlaylist(songUris, userId, apiToken, {
					name: args.name,
					description: args.description,
				});
			});
		})
		.catch((error) => {
			console.log({ convertPlaylistError:error });
		});
};

