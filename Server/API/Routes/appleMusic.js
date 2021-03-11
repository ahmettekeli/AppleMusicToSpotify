import express from "express";
import appleMusicController from "../Controllers/appleMusic.js";
const router = express.Router();

router.post("/scrap", appleMusicController.getSongsFromAppleMusicPlaylist);

export default router;