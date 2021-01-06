const { createPlaylist, retrievePlaylistData, searchSong, addSongsToPlaylist } = require("./playlistService");

let song = "sirens",
	artist = "monolink",
	album = "sirens";

(async () => {
	await createPlaylist("MyTestPlaylist", "This is a test Playlist", true);
	const playListData = await retrievePlaylistData("MyTestPlaylist"),
		songData = await searchSong(song, artist, album);
	await addSongsToPlaylist([songData.uri], playListData.id);
})();
