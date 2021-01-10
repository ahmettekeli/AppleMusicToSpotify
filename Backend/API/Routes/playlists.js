const express = require("express");
const router = express.Router();
const PlaylistController = require("../Controllers/playlists");

router.post("/", PlaylistController.getSongsFromAppleMusicPlaylist);

module.exports = router;
