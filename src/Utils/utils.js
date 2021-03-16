import queryString from "query-string";

export const parseAccessToken = (searchText) => {
    console.log({searchText});
    return queryString.parse(searchText).access_token;
};