import queryString from "query-string";

const urlRegex = /^((https?|http):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;

export const parseAccessToken = (searchText) => {
	console.log({ searchText });
	return queryString.parse(searchText).access_token;
};

export const validateUrl = (url) => {
	return urlRegex.test(url);
};

export const conversionTypes = Object.freeze({
	APPLE_MUSIC_TO_SPOTIFY: "AppleToSpotify",
	SPOTIFY_TO_APPLE_MUSIC: "SpotifyToApple",
});
