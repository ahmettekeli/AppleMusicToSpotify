import {
	UPDATE_LOG,
	UPDATE_SONG_COUNT,
	ADD_SONG_INFO,
	CLEAR_SONG_INFOS,
	SET_FILTER,
	SET_SORTING,
	FILTER_FAILED_CONVERSION_INFO,
	FILTER_SUCCESSFUL_CONVERSION_INFO,
	SORT_CONVERSION_INFO_ASCENDING,
	SORT_CONVERSION_INFO_DESCENDING,
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

export const filterFailedSongInfo = () => {
	return {
		type: FILTER_FAILED_CONVERSION_INFO,
	};
};

export const filterSuccessfulSongInfo = () => {
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

export const sortSongInfoAscending = () => {
	return {
		type: SORT_CONVERSION_INFO_ASCENDING,
	};
};
export const sortSongInfoDescending = () => {
	return {
		type: SORT_CONVERSION_INFO_DESCENDING,
	};
};

export const setSorting = (sortingType) => {
	return {
		type: SET_SORTING,
		payload: sortingType,
	};
};

export const setFilter = (filterType) => {
	return {
		type: SET_FILTER,
		payload: filterType,
	};
};
