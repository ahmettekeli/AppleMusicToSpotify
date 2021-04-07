import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import store from "../redux/store";
import { addConversionInfo } from "../redux/reducers/info-actions";
import {
	playlistsEndpoint,
	addSongsToPlaylistEndpoint,
	searchEndpoint,
	findPlaylist,
	userEndpoint,
	encodeItem,
} from "../Utils/spotifyUtil";

// const API_URL = process.env.API_URL;
const API_URL = "http://localhost:3004/applemusic/scrap";
export const getPlaylistDataFromAPI = async (url, requestBody) => {
	try {
		const response = await axios.post(url, requestBody);
		console.log({ applePlaylistDataResponse: response });
		store.dispatch(
			addConversionInfo({
				id: uuidv4(),
				isSuccess: true,
				data: "Playlist data has been retrieved from Apple Music.",
			})
		);
		console.log({ state: store.getState() });
		return response.data;
	} catch (error) {
		console.log({ error });
		store.dispatch(
			addConversionInfo({
				id: uuidv4(),
				isSuccess: false,
				data: "Playlist data could not be retrieved from Apple Music.",
			})
		);
	}
};
export const getUserId = async (apiToken) => {
	try {
		const response = await axios.get(userEndpoint(), {
			headers: {
				Authorization: `Bearer ${apiToken}`,
			},
		});
		store.dispatch(
			addConversionInfo({
				id: uuidv4(),
				isSuccess: true,
				data: "User has been found on Spotify.",
			})
		);
		return response.data.id;
	} catch (error) {
		console.log({ error });
		store.dispatch(
			addConversionInfo({
				id: uuidv4(),
				isSuccess: false,
				data: "User could not be found on Spotify.",
			})
		);
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
		console.log({ createPlaylistError: error });
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
		console.log({ retrievePlaylistError: error });
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
			store.dispatch(
				addConversionInfo({
					id: uuidv4(),
					isSuccess: true,
					data: `${songData.name} - ${songData.artist}`,
				})
			);
			return songData;
		} else {
			console.log({ song: song, artist: artist, album, message: "Song could not be found in spotify." });
			store.dispatch(
				addConversionInfo({
					id: uuidv4(),
					isSuccess: false,
					data: `${song} - ${artist}`,
				})
			);
		}
		return null;
	} catch (error) {
		console.log({ searchError: error });
		store.dispatch(
			addConversionInfo({
				id: uuidv4(),
				isSuccess: false,
				data: "Could not search songs on Spotify.",
			})
		);
	}
};
export const getSongUris = async (songs, apiToken) => {
	let songUris = [],
		song;
	for (let item of songs) {
		song = await searchSong(item.song, item.artist, item.album, apiToken);
		if (song) {
			songUris.push(song.uri);
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
		console.log({ addSongError: error });
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
				store.dispatch(
					addConversionInfo({
						id: uuidv4(),
						isSuccess: true,
						data: `Playlist with the name: ${args.name} has been created.`,
					})
				);
			}
		}
	} catch (error) {
		console.log({ generatePlaylistError: error });
	}
};
//TODO modify args object.
export const convertPlaylist = (userId, apiToken, args) => {
	getPlaylistDataFromAPI(API_URL, { url: args.url })
		.then((response) => {
			getSongUris(response.data, apiToken).then((songUris) => {
				console.log(`${songUris.length} songs has been found on Spotify.`);
				store.dispatch(
					addConversionInfo({
						id: uuidv4(),
						isSuccess: true,
						data: `${songUris.length} songs has been found on Spotify.`,
					})
				);
				generateSpotifyPlaylist(songUris, userId, apiToken, {
					name: args.name,
					description: args.description,
				});
			});
			setTimeout(() => {
				console.log("final state:", store.getState());
			}, 5000);
		})
		.catch((error) => {
			console.log({ convertPlaylistError: error });
		});
};
