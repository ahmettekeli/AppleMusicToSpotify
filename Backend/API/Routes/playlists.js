const express = require("express");
const router = express.Router();
const PlaylistController = require("../Controllers/playlists");

router.post("/", PlaylistController.getSongsFromAppleMusicPlaylist);
router.get("/", PlaylistController.isServerOnline);

module.exports = router;
