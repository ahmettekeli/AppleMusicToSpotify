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
	successfulConversionInfo: [],
	failedConversionInfo: [],
	songCount: 0,
	activeFilter: null,
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
		case FILTER_FAILED_CONVERSION_INFO: {
			console.log(
				"failed conversions: ",
				[...state.conversionInfo].filter((info) => {
					return info.isSuccess === false;
				})
			);
			return {
				...state,
				failedConversionInfo: [...state.conversionInfo].filter((info) => {
					return info.isSuccess === false;
				}),
			};
		}
		case FILTER_SUCCESSFUL_CONVERSION_INFO: {
			console.log(
				"successful conversions: ",
				[...state.conversionInfo].filter((info) => {
					return info.isSuccess === true;
				})
			);
			return {
				...state,
				successfulConversionInfo: [...state.conversionInfo].filter((info) => {
					return info.isSuccess === true;
				}),
			};
		}
		case SEARCH_CONVERSION_INFO: {
			let searchResult = [];
			if (state.activeFilter) {
				if (state.activeFilter === "success") {
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
				} else {
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
