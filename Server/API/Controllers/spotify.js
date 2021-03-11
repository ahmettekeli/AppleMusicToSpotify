// require("dotenv").config();
import dotenv from "dotenv";
import axios from "axios";
import { generateRandomString } from "../Utils/utility.js";
import queryString from "querystring";
dotenv.config();
const redirect_uri = process.env.REDIRECT_URI || "http://localhost:3004/spotify/callback";
const stateKey = "spotify_auth_state";

const login = (req, res) => {
		const state = generateRandomString(16);
		console.log(res.cookie);
		res.cookie(stateKey, state);

		const query = queryString.stringify({
			response_type: "code",
			client_id: process.env.SPOTIFY_CLIENT_ID,
			scope: "user-read-private user-read-email playlist-modify-public playlist-modify-private", //add playlist modification scopes.
			redirect_uri,
			state,
		});
		res.redirect("https://accounts.spotify.com/authorize?" + query);
	},
	getToken = async (req, res) => {
		console.log("cookies", req.cookies);
		const requestUrl = "https://accounts.spotify.com/api/token",
			code = req.query.code || null,
			state = req.query.state || null,
			storedState = req.cookies ? req.cookies[stateKey] : null,
			requestParams = {
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
		console.log({ state });
		console.log({ storedState });
		console.log({ stateKey });
		if (state === null || state !== storedState) {
			res.redirect(
				"/#" +
					queryString.stringify({
						error: "state_missmatch",
					})
			);
		} else {
			res.clearCookie("stateKey");
			try {
				response = await axios.post(requestUrl, null, {
					params: requestParams,
					headers: requestHeader,
				});
				const accessToken = response.data.access_token,
					uri = process.env.FRONTEND_URI || "http://localhost:3000";
				res.redirect(uri + "?access_token" + accessToken);
			} catch (error) {
				res.status(200).json({
					error: error,
				});
			}
		}
	},
	refreshToken = async (req, res) => {
		const refresh_token = req.query.refresh_token,
			requestUrl = "https://accounts.spotify.com/api/token",
			requestHeader = {
				Authorization:
					"Basic " +
					new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString(
						"base64"
					),
				contentType: "application/x-www-form-urlencoded",
			},
			requestParams = {
				grant_type: "refresh_token",
				refresh_token: refresh_token,
			};
		try {
			response = await axios.post(requestUrl, null, {
				params: requestParams,
				headers: requestHeader,
			});
			const accessToken = response.data.access_token,
				uri = process.env.FRONTEND_URI || "http://localhost:3000";
			res.redirect(uri + "?access_token" + accessToken);
		} catch (error) {
			res.status(200).json({
				error: error,
			});
		}
	};

export default { login, getToken, refreshToken };