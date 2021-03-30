import { SPOTIFY_LOGIN, SPOTIFY_LOGOUT } from "../actionTypes";

const initialState = {
	spotifyLogin: false,
};

//Apply redux thunk here for async operations
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SPOTIFY_LOGIN:
			return {
				spotifyLogin: true,
			};
		case SPOTIFY_LOGOUT:
			return {
				spotifyLogin: false,
			};
		default:
			return state;
	}
};
export default reducer;
