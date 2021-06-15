import {
	UPDATE_LOG,
	UPDATE_SONG_COUNT,
	ADD_SONG_INFO,
	CLEAR_SONG_INFOS,
	SET_FILTER,
	SET_SORTING,
	RESET_FILTER,
	FILTER_FAILED_CONVERSION_INFO,
	FILTER_SUCCESSFUL_CONVERSION_INFO,
	SORT_CONVERSION_INFO_ASCENDING,
	SORT_CONVERSION_INFO_DESCENDING,
	SEARCH_CONVERSION_INFO,
} from "../actionTypes";

import { filterSortControls } from "../../Utils/variables";

const initialState = {
	conversionLog: null,
	conversionInfo: [
		// {
		// 	id: 1,
		// 	isSuccess: true,
		// 	song: "Indigo Night",
		// 	artist: "Tamino",
		// 	album: "Amir",
		// 	image: "https://picsum.photos/seed/picsum/150/150",
		// 	url: "https://open.spotify.com/track/62DFvt3IhKq2i8wyigqeFO?si=4a29c51d297c4d6f",
		// },
		// {
		// 	id: 2,
		// 	isSuccess: true,
		// 	song: "Habibi",
		// 	artist: "Tamino",
		// 	album: "Amir",
		// 	image: "https://picsum.photos/seed/picsum/150/150",
		// 	url: "https://open.spotify.com/track/5juBKIr7vbfAUgFpa34DuO?si=0a9b089738bd461e",
		// },
		// {
		// 	id: 3,
		// 	isSuccess: false,
		// 	song: "Cigar",
		// 	artist: "Tamino",
		// 	album: "Amir",
		// 	image: "https://picsum.photos/seed/picsum/150/150",
		// 	vigar: "https://open.spotify.com/track/01Y7ntOQnQtfcBYQuAR4Jf?si=d651afbfdad54809",
		// },
	],
	tempConversionInfo: [],
	songCount: 0,
	activeFilter: null,
	activeSorting: null,
};

//!TODO Apply redux thunk here for async operations
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LOG:
			return {
				...state,
				conversionLog: action.payload,
			};
		case UPDATE_SONG_COUNT:
			return {
				...state,
				songCount: action.payload,
			};
		case ADD_SONG_INFO:
			return {
				...state,
				conversionInfo: [...state.conversionInfo, action.payload],
			};
		case CLEAR_SONG_INFOS:
			return {
				...state,
				songCount: 0,
				conversionInfo: [],
				conversionLog: "",
			};
		case SET_FILTER: {
			return {
				...state,
				activeFilter: action.payload ? action.payload : null,
			};
		}
		case SET_SORTING: {
			return {
				...state,
				activeSorting: action.payload ? action.payload : null,
			};
		}
		case RESET_FILTER: {
			return {
				...state,
				tempConversionInfo: [...state.conversionInfo],
			};
		}
		case FILTER_FAILED_CONVERSION_INFO: {
			return {
				...state,
				tempConversionInfo: [...state.conversionInfo].filter((info) => {
					return info.isSuccess === false;
				}),
			};
		}
		case FILTER_SUCCESSFUL_CONVERSION_INFO: {
			return {
				...state,
				tempConversionInfo: [...state.conversionInfo].filter((info) => {
					return info.isSuccess === true;
				}),
			};
		}
		case SORT_CONVERSION_INFO_ASCENDING: {
			if ((!state.activeFilter && !state.activeSorting) || state.tempConversionInfo.length === 0) {
				state.tempConversionInfo = [...state.conversionInfo];
			}
			return {
				...state,
				tempConversionInfo: [...state.tempConversionInfo].sort((a, b) => (a.song > b.song && 1) || -1),
			};
		}
		case SORT_CONVERSION_INFO_DESCENDING: {
			if ((!state.activeFilter && !state.activeSorting) || state.tempConversionInfo.length === 0) {
				state.tempConversionInfo = [...state.conversionInfo];
			}
			return {
				...state,
				tempConversionInfo: [...state.tempConversionInfo].sort((a, b) => (a.song < b.song && 1) || -1),
			};
		}
		case SEARCH_CONVERSION_INFO: {
			let searchResult = [];
			if (state.activeFilter) {
				if (state.activeFilter === filterSortControls.FILTER_SUCCESSFUL) {
					//handle searching in success conversion info.
					searchResult = [
						...state.failedConversionInfo.map(
							(info) =>
								info.song.includes(action.payload) ||
								info.artist.includes(action.payload) ||
								info.album.includes(action.payload)
						),
					];
					console.log({ searchResult });
				} else if (state.activeFilter === filterSortControls.FILTER_FAILED) {
					//handle searching in failed conversion info.
					searchResult = [
						...state.failedConversionInfo.map(
							(info) =>
								info.song.includes(action.payload) ||
								info.artist.includes(action.payload) ||
								info.album.includes(action.payload)
						),
					];
					console.log({ searchResult });
				}
			} else {
				//handle searching in all conversion info.
				searchResult = [
					...state.conversionInfo.map(
						(info) =>
							info.song.includes(action.payload) ||
							info.artist.includes(action.payload) ||
							info.album.includes(action.payload)
					),
				];
				console.log({ searchResult });
			}
			return {
				...state,
				searchedConversionInfo: searchResult,
			};
		}
		default:
			return state;
	}
};

export default reducer;
