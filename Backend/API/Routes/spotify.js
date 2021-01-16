const express = require("express");
const router = express.Router();
const SpotifyAuthController = require("../Controllers/spotify");

router.get("/login", SpotifyAuthController.login);
router.get("/callback", SpotifyAuthController.getToken);

module.exports = router;
