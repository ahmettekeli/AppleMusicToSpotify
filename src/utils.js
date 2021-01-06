const playlistsEndpoint = (userId) => {
		return `https://api.spotify.com/v1/users/${userId}/playlists`;
	},
	addSongsToPlaylistEndpoint = (playListId) => {
		return `https://api.spotify.com/v1/playlists/${playListId}/tracks`;
	},
	searchEndpoint = (song, artist, album) => {
		return `https://api.spotify.com/v1/search?q=track:${song}%20artist:${artist}%20album:${album}&type=track&limit=1`;
	},
	findPlaylist = (playlists, playlistName) => {
		return playlists.items.find((playlist) => playlist.name == playlistName);
	};

module.exports = {
	playlistsEndpoint,
	addSongsToPlaylistEndpoint,
	searchEndpoint,
	findPlaylist,
};
