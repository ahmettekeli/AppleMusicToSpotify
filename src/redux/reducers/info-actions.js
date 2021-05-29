import { LIST_INFO, DELETE_INFO_LIST, ADD_INFO, UPDATE_SONG_COUNT, ADD_SONG_INFO } from "../actionTypes";

export const listConversionInfo = () => {
	return {
		type: LIST_INFO,
	};
};

export const deleteInfoList = () => {
	return {
		type: DELETE_INFO_LIST,
	};
};

export const addInfo = (info) => {
	return {
		type: ADD_INFO,
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
