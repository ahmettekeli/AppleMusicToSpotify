const express = require("express");
const router = express.Router();
const SpotifyAuthController = require("../Controllers/spotifyAuth");

router.get("/login", SpotifyAuthController.login);
router.get("/callback", SpotifyAuthController.getToken);

module.exports = router;
