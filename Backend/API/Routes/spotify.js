const express = require("express");
const router = express.Router();
const SpotifyAuthController = require("../Controllers/spotify");

router.get("/login", SpotifyAuthController.login);
router.get("/callback", SpotifyAuthController.getToken);
router.get("/refreshtoken", SpotifyAuthController.refreshToken);

module.exports = router;
