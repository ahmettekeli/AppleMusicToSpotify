const { scrap } = require("../Utils/scrapper");

const getSongsFromAppleMusicPlaylist = async (req, res) => {
	res.status(200).json({
		data: await scrap(req.body.url),
	});
};

module.exports = { getSongsFromAppleMusicPlaylist };
