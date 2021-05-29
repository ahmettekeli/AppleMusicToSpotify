import queryString from "query-string";

const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export const parseAccessToken = (searchText) => {
	return queryString.parse(searchText).access_token;
};

export const validateUrl = (url) => {
	return urlRegex.test(url);
};

export const conversionTypes = Object.freeze({
	APPLE_MUSIC_TO_SPOTIFY: "AppleToSpotify",
	SPOTIFY_TO_APPLE_MUSIC: "SpotifyToApple",
});
