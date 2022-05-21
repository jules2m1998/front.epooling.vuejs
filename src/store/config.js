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

export const formDataRequest = item => {
    let formBody = new FormData();
    for (const property in item) {
        formBody.append(property, item[property]);
    }
    return formBody;
}

export const send_request_with_token = async (url, method, body, headers= {}) => {
    const _url = BASE_URI + url
    console.log(_url)
    return await fetch(_url, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            ...headers
        },
        body: body
    })
}