import { scrap } from "../Utils/utility.js";

const getSongsFromAppleMusicPlaylist = async (req, res) => {
	res.status(200).json({
		data: await scrap(req.body.url),
	});
};

export default { getSongsFromAppleMusicPlaylist };
