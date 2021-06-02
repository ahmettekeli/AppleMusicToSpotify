import { UPDATE_LOG, UPDATE_SONG_COUNT, ADD_SONG_INFO } from "../actionTypes";

export const updateLog = (info) => {
	return {
		type: UPDATE_LOG,
		payload: info,
	};
};

export const addSongInfo = (info) => {
	return {
		type: ADD_SONG_INFO,
		payload: info,
	};
};

export const updateSongCount = (count) => {
	return {
		type: UPDATE_SONG_COUNT,
		payload: count,
	};
};
