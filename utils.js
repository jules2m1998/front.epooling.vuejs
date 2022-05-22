import {BASE_URI} from "@/store/config";

export const getData = async (url) => {
    const response = await fetch(BASE_URI + url, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        return null
    }
};

export const getUrl = (url) => {
    return BASE_URI + url;
}

export const objectDiff = (obj1, obj2, ignore = []) => {
    let diff = {};
    if (obj1 && obj2) {
        for (let key in obj1) {
            if (obj2[key] !== obj1[key] && ignore.indexOf(key) === -1) {
                diff[key] = obj1[key];
            }
        }
    }
    return diff;
}

export const make_request = async (url, method, body, header) => {
    const response = await fetch(BASE_URI + url, {
        method: method,
        headers: {
            Accept: "application/json",
            ...header
        },
        body: body
    });
    return response
}