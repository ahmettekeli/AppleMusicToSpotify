export const playlistsEndpoint = (userId) => {
	return `https://api.spotify.com/v1/users/${userId}/playlists`;
};
export const addSongsToPlaylistEndpoint = (playListId) => {
	return `https://api.spotify.com/v1/playlists/${playListId}/tracks`;
};
export const searchEndpoint = (song, artist, album) => {
	return `https://api.spotify.com/v1/search?q=track:${song}%20artist:${artist}%20album:${album}&type=track&limit=1`;
};
export const userEndpoint = () => {
	return `https://api.spotify.com/v1/me`;
};
export const findPlaylist = (playlists, playlistName) => {
	return playlists.items.find((playlist) => playlist.name === playlistName);
};
export const encodeItem = (item) => {
	let splitPart = "";
	if (item.includes("(")) {
		splitPart = item.split("(");
		item = splitPart[0];
	}
	if (item.includes("Single")) {
		splitPart = item.split("-");
		item = splitPart[0];
	}
	return encodeURIComponent(item.replace("'", ""));
};
