import { LIST_INFO, DELETE_INFO_LIST, ADD_INFO, UPDATE_SONG_COUNT, ADD_SONG_INFO } from "../actionTypes";

const initialState = {
	infoList: [
		// {
		// 	id: 1,
		// 	isSuccess: true,
		// 	data: "Spotify login is successful",
		// },
		// {
		// 	id: 2,
		// 	isSuccess: false,
		// 	data: "Playlist already exists.",
		// },
		// {
		// 	id: 3,
		// 	isSuccess: true,
		// 	data: "Some success message.",
		// },
		// {
		// 	id: 4,
		// 	isSuccess: true,
		// 	data: "Some success message.",
		// },
		// {
		// 	id: 5,
		// 	isSuccess: true,
		// 	data: "Some success message.",
		// },
	],
	songInfoList: [
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
		case LIST_INFO:
			return {
				...state,
				infoList: action.payload.infoList,
			};
		case ADD_INFO:
			return {
				...state,
				infoList: [...state.infoList, action.payload],
			};
		case DELETE_INFO_LIST:
			return {
				...state,
				infoList: [],
			};
		case UPDATE_SONG_COUNT:
			return {
				...state,
				songCount: action.payload,
			};
		case ADD_SONG_INFO:
			return {
				...state,
				songInfoList: [...state.songInfoList, action.payload],
			};
		default:
			return state;
	}
};

export default reducer;