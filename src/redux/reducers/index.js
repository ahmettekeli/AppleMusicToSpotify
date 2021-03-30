import info from "./info-reducer";
import user from "./user-reducer";
import { combineReducers } from "redux";

export default combineReducers({
	info,
	user,
});
