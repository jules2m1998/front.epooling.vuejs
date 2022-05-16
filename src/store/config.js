export const BASE_URI = 'http://localhost:8000/'
export const formatRequestion = item => {
    let formBody = [];
    for (const property in item) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(item[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}
