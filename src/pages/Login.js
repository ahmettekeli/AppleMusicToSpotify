import React from "react";
// import dotenv from "dotenv";
// dotenv.config();
// const API_LOGIN_URL = process.env.API_LOGIN_URL;
// const API_LOGIN_URL = "https://apple-music-playlist-scrap-api.herokuapp.com/spotify/login";
const API_LOGIN_URL = "http://localhost:3004/spotify/login";

const Login = () => {
	//Checking if already logged in.
	return <a href={API_LOGIN_URL}>Login to Spotify</a>;
};

export default Login;
