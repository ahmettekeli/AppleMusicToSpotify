export const LIST_CONVERSION_INFO = "LIST_CONVERSION_INFO";
export const DELETE_INFO_LIST = "DELETE_INFO_LIST";
export const ADD_CONVERSION_INFO = "ADD_CONVERSION_INFO";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const listConversionInfo = ()=>{
    return {
        type:LIST_CONVERSION_INFO
    }
};

export const deleteInfoList = ()=>{
    return {
        type:DELETE_INFO_LIST
    }
};

export const addConversionInfo = (info)=>{
    return {
        type:ADD_CONVERSION_INFO,
        payload:info
    }
    
};
export const login = ()=>{
    return {
        type:LOGIN
    }
};

export const logout = ()=>{
    return {
        type:LOGOUT
    }
}