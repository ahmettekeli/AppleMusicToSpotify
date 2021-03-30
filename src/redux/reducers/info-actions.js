import { LIST_CONVERSION_INFO, DELETE_INFO_LIST, ADD_CONVERSION_INFO } from "../actionTypes";

export const listConversionInfo = () => {
	return {
		type: LIST_CONVERSION_INFO,
	};
};

export const deleteInfoList = () => {
	return {
		type: DELETE_INFO_LIST,
	};
};

export const addConversionInfo = (info) => {
	return {
		type: ADD_CONVERSION_INFO,
		payload: info,
	};
};
