import React from "react";

const Login = () => {
	//Checking if already logged in.
	return (
		<a href={process.env.REACT_APP_API_LOGIN_URL}>
			<button>
				<img src={process.env.REACT_APP_SPOTIFY_LOGIN_IMG_URL} alt="login" height="40" width="200"/>
			</button>
		</a>
	);
};

export default Login;
