import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import store from "../redux/store";
import { updateLog, addSongInfo, updateSongCount } from "../redux/reducers/info-actions";
import {
	playlistsEndpoint,
	addSongsToPlaylistEndpoint,
	searchEndpoint,
	findPlaylist,
	userEndpoint,
	encodeItem,
} from "../Utils/spotifyUtil.js";

//!TODO implement the option to abort conversion

// const API_URL = process.env.API_URL;
const API_URL = "http://localhost:3004/applemusic/scrap";
const SPOTIFY_LOGIN_URL = "";

export const getPlaylistDataFromAPI = async (url, requestBody) => {
	try {
		const response = await axios.post(url, requestBody);
		console.log({ applePlaylistDataResponse: response.data });
		store.dispatch(updateSongCount(response.data.data.length));
		store.dispatch(updateLog("Playlist data has been retrieved from Apple Music."));
		return response.data;
	} catch (error) {
		console.log({ error });
		store.dispatch(updateLog("Playlist data could not be retrieved from Apple Music."));
	}
};
export const getUserId = async (apiToken) => {
	try {
		const response = await axios.get(userEndpoint(), {
			headers: {
				Authorization: `Bearer ${apiToken}`,
			},
		});
		store.dispatch(updateLog("User has been found on Spotify."));
		return response.data.id;
	} catch (error) {
		console.log({ error });
		store.dispatch(updateLog("User could not be found on Spotify."));
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
				image: response.data.tracks.items[0].album.images[1].url, //0-> 600x600 1-> 300x300 2->64x64
				url: response.data.tracks.items[0].external_urls.spotify,
			};
			store.dispatch(
				addSongInfo({
					id: uuidv4(),
					isSuccess: true,
					song: songData.name,
					artist: songData.artist,
					album: songData.album,
					image: songData.image,
					url: songData.url,
				})
			);
			return songData;
		} else {
			console.log({ song, artist, album, message: "Song could not be found in spotify." });
			store.dispatch(
				addSongInfo({
					id: uuidv4(),
					isSuccess: false,
					song,
					artist,
					album,
					image: null,
				})
			);
		}
		return null;
	} catch (error) {
		console.log({ searchError: error });
		store.dispatch(updateLog("Could not search songs on Spotify."));
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
				// console.log(`Spotify playlist with the name: ${args.name} has been created.`);
				store.dispatch(updateLog(`Playlist with the name: ${args.name} has been created.`));
			}
		}
	} catch (error) {
		console.log({ generatePlaylistError: error });
	}
};
//TODO modify args object.
export const convertPlaylist = async (userId, apiToken, args) => {
	getPlaylistDataFromAPI(API_URL, { url: args.url })
		.then((response) => {
			let songCount = response.data.length;
			getSongUris(response.data, apiToken).then((songUris) => {
				if (songUris.length > 0) {
					generateSpotifyPlaylist(songUris, userId, apiToken, {
						name: args.name,
						description: args.description,
					})
						.then(() => {
							// console.log(
							// 	`Playlist with the name: ${args.name} has been created. ${songUris.length}/${songCount} songs has been found on Spotify.`
							// );
							store.dispatch(
								updateLog(
									`Playlist with the name: ${args.name} has been created. ${songUris.length}/${songCount} songs has been found on Spotify.`
								)
							);
						})
						.catch((err) => {
							//!TODO implement global error handling.
							console.log(err.message);
						});
				}
			});
		})
		.catch((error) => {
			//!TODO implement global error handling.
			console.log({ convertPlaylistError: error });
		});
};

export const handleTokenExpiration = (duration) => {
	const previousDuration = window.localStorage.getItem("expirationDuration"),
		tokenRetrieval = window.localStorage.getItem("tokenRetrieval");
	if (!previousDuration || !tokenRetrieval) {
		window.localStorage.setItem("expirationDuration", duration);
		window.localStorage.setItem("tokenRetrieval", Date.now());
	} else {
		if (Date.now() - tokenRetrieval / 1000 >= previousDuration - 600) {
			window.localStorage.removeItem("expirationDuration");
			window.localStorage.removeItem("tokenRetrieval");
			window.location.href = SPOTIFY_LOGIN_URL;
		}
	}
};
