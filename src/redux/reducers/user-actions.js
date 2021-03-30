import { SPOTIFY_LOGIN, SPOTIFY_LOGOUT } from "../actionTypes";

export const login = () => {
	return {
		type: SPOTIFY_LOGIN,
	};
};

export const logout = () => {
	return {
		type: SPOTIFY_LOGOUT,
	};
};
