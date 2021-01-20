import React from "react";
const loginUrl = "https://apple-music-playlist-scrap-api.herokuapp.com/spotify/login";
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
		<a className="login-a" href={loginUrl}>
			Login
		</a>
	);
};

export default Login;
