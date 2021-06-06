import React from "react";
import { useTranslation } from "react-i18next";
// import dotenv from "dotenv";
// dotenv.config();
// const API_LOGIN_URL = process.env.API_LOGIN_URL;
// const API_LOGIN_URL = "https://apple-music-playlist-scrap-api.herokuapp.com/spotify/login";
const API_LOGIN_URL = "http://localhost:3004/spotify/login";

const Login = () => {
	const { t } = useTranslation();
	//Checking if already logged in.
	return <a href={API_LOGIN_URL}>{t("login")}</a>;
};

export default Login;
