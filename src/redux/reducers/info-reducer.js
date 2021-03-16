import {
    LIST_CONVERSION_INFO, 
    DELETE_INFO_LIST,
    ADD_CONVERSION_INFO,
    LOGIN, 
    LOGOUT
} from '../actionTypes';

const initialState = {
    infoList:[],
    isLoggedIn: false
}

//Apply redux thunk here for async operations
export default (state = initialState, action) => {
    switch (action.type) {
        case LIST_CONVERSION_INFO:
            return{
                ...state,
                infoList: action.payload.infoList
            }
        case ADD_CONVERSION_INFO:
            return{
                ...state,
                infoList:[...state.infoList, action.payload]
            }
        case DELETE_INFO_LIST:
            return{
                ...state,
                infoList: []
            }
        case LOGIN:
            return{
                ...state,
                isLoggedIn:true
            }
        case LOGOUT:
            return{
                ...state,
                isLoggedIn:false
            }
        default:
            return state;
    }
}