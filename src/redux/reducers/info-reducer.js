import { LIST_CONVERSION_INFO, DELETE_INFO_LIST, ADD_CONVERSION_INFO } from "../actionTypes";

const initialState = {
	infoList: [],
};

//Apply redux thunk here for async operations
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_CONVERSION_INFO:
			return {
				infoList: action.payload.infoList,
			};
		case ADD_CONVERSION_INFO:
			return {
				infoList: [...state.infoList, action.payload],
			};
		case DELETE_INFO_LIST:
			return {
				infoList: [],
			};
		default:
			return state;
	}
};

export default reducer;
