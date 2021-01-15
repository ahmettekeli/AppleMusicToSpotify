require("dotenv").config();
const axios = require("axios");
const queryString = require("querystring");

const redirect_uri = process.env.REDIRECT_URI || "http://localhost:3003/spotify/callback";

const login = (req, res) => {
		const query = queryString.stringify({
			response_type: "code",
			client_id: process.env.SPOTIFY_CLIENT_ID,
			scope: "user-read-private user-read-email playlist-modify-public playlist-modify-private", //add playlist modification scopes.
			redirect_uri,
		});
		res.redirect("https://accounts.spotify.com/authorize?" + query);
	},
	getToken = async (req, res) => {
		const requestUrl = "https://accounts.spotify.com/api/token",
			code = req.query.code || null;
		console.log({ code });
		const requestParams = {
				grant_type: "authorization_code",
				code,
				redirect_uri,
			},
			requestHeader = {
				Authorization:
					"Basic " +
					new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString(
						"base64"
					),
				contentType: "application/x-www-form-urlencoded",
			};
		try {
			response = await axios.post(requestUrl, null, {
				params: requestParams,
				headers: requestHeader,
			});
			console.log(response.data);
			const accessToken = response.data.access_token,
				uri = process.env.FRONTEND_URI || "http://localhost:3000";
			res.redirect(uri + "?access_token" + accessToken);
		} catch (error) {
			res.status(200).json({
				error: error,
			});
		}
	};

module.exports = { login, getToken };
