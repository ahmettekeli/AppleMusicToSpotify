const express = require("express");
const router = express.Router();
const appleMusicController = require("../Controllers/appleMusic");

router.post("/scrap", appleMusicController.getSongsFromAppleMusicPlaylist);

module.exports = router;