const isServerOnline = (req, res) => {
	res.status(200).json({
		message: "Server is online",
	});
};

export default { isServerOnline };