import React from "react";
// import dotenv from "dotenv";
// dotenv.config();
// const API_LOGIN_URL = process.env.API_LOGIN_URL;
const API_LOGIN_URL = "https://apple-music-playlist-scrap-api.herokuapp.com/spotify/login";
// const loginUrl = "https://localhost:3004/spotify/login";

// const Login = (currentUser) => {
// 	if (!currentUser.id) {
// 		//Checking if already logged in.
// 		return (
// 			<a className="login-a" href={loginUrl}>
// 				Login
// 			</a>
// 		);
// 	}
// 	return null;
// };

const Login = () => {
	//Checking if already logged in.
	return (
		<a className="login-a" href={API_LOGIN_URL}>
			Login to Spotify
		</a>
	);
};

export default Login;
