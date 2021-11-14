import axios from "axios";
import { generateRandomString } from "../Utils/utility.js";
import dotenv from "dotenv";
dotenv.config();

const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const stateKey = "spotify_auth_state";

const login = (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	const query = new URLSearchParams({
		response_type: "code",
		client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
		scope: "user-read-private user-read-email playlist-modify-public playlist-modify-private", //add playlist modification scopes.
		redirect_uri,
		state,
	}).toString();
	res.redirect(process.env.REACT_APP_SPOTIFY_AUTH_URI + query);
};

const getToken = async (req, res) => {
	const code = req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies ? req.cookies[stateKey] : null;
	const requestParams = {
		grant_type: "authorization_code",
		code,
		redirect_uri,
	};
	const requestHeader = {
		Authorization:
			"Basic " +
			new Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toString(
				"base64"
			),
		contentType: "application/x-www-form-urlencoded",
	};

	if (state === null || state !== storedState) {
		res.redirect(
			"/#" +
				new URLSearchParams({
					error: "state_missmatch",
				})
		).toString();
	} else {
		res.clearCookie("stateKey");
		try {
			let response = await axios.post(process.env.REACT_APP_SPOTIFY_TOKEN_REQUEST_URI, null, {
				params: requestParams,
				headers: requestHeader,
			});
			const accessToken = response.data.access_token;
			const uri = process.env.REACT_APP_FRONTEND_URI;
			res.redirect(uri + process.env.REACT_APP_REDIRECT_URI_PREFIX + accessToken);
		} catch (error) {
			res.status(200).json({
				error: error.message,
			});
		}
	}
};

const refreshToken = async (req, res) => {
	const refresh_token = req.query.refresh_token;
	const requestHeader = {
		Authorization:
			"Basic " +
			new Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toString(
				"base64"
			),
		contentType: "application/x-www-form-urlencoded",
	};
	const requestParams = {
		grant_type: "refresh_token",
		refresh_token: refresh_token,
	};

	try {
		response = await axios.post(process.env.REACT_APP_SPOTIFY_TOKEN_REQUEST_URI, null, {
			params: requestParams,
			headers: requestHeader,
		});
		const accessToken = response.data.access_token,
			uri = process.env.REACT_APP_FRONTEND_URI;
		res.redirect(uri + "?access_token" + accessToken);
	} catch (error) {
		res.status(200).json({
			error: error.message,
		});
	}
};

export default { login, getToken, refreshToken };
