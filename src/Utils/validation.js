const urlRegex = /^((https?|http):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/

export const validateUrl = (url)=>{
    return urlRegex.test(url);
}