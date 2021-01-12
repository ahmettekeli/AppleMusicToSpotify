const express = require("express");
const bodyParser = require("body-parser");
const playlistRoutes = require("./API/Routes/playlists");
const app = express();

//CORS settings access for everyone
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Access, Authorization");
	//Browser always send an options request first. If that's the case let's allow browser to send following requests.
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json();
	}
	next();
});

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());
app.use("/playlists", playlistRoutes);

//when no routes to handle the request
app.use((req, res, next) => {
	const error = new Error("Route not found.");
	error.status = 404;
	next(error);
});

//Error handler.
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: `Error: ${error.message}`,
		},
	});
});

module.exports = app;