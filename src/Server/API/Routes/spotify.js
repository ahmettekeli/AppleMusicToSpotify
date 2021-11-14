import express from "express";
import SpotifyAuthController from "../Controllers/spotify.js";
const router = express.Router();

router.get("/login", SpotifyAuthController.login);
router.get("/callback", SpotifyAuthController.getToken);
router.get("/refreshtoken", SpotifyAuthController.refreshToken);

export default router;