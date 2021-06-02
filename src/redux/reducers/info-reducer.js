import { UPDATE_LOG, UPDATE_SONG_COUNT, ADD_SONG_INFO } from "../actionTypes";

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
	songCount: 0,
};

//Apply redux thunk here for async operations
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
		default:
			return state;
	}
};

export default reducer;
