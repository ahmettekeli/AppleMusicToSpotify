import {
	UPDATE_LOG,
	UPDATE_SONG_COUNT,
	ADD_SONG_INFO,
	CLEAR_SONG_INFOS,
	SET_FILTER,
	FILTER_FAILED_CONVERSION_INFO,
	FILTER_SUCCESSFUL_CONVERSION_INFO,
	SEARCH_CONVERSION_INFO,
} from "../actionTypes";

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

export const clearSongInfos = () => {
	return {
		type: CLEAR_SONG_INFOS,
	};
};

export const filterFailedInfo = () => {
	return {
		type: FILTER_FAILED_CONVERSION_INFO,
	};
};

export const filterSuccessfulInfo = () => {
	return {
		type: FILTER_SUCCESSFUL_CONVERSION_INFO,
	};
};

export const searchSongInfo = (searchText) => {
	return {
		type: SEARCH_CONVERSION_INFO,
		payload: searchText,
	};
};

export const setFilter = (filterType) => {
	return {
		type: SET_FILTER,
		payload: filterType,
	};
};
