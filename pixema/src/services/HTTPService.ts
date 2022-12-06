const httpHeaders = {
    'X-API-KEY': 'ba05cb80-202a-462c-a807-4b4a4e9dca41',
    'Content-Type': 'application/json',
};

export default class HTTPService {
    static async get(url: string, headers?: {}) {
        return await fetch(url, {
            headers: {...httpHeaders, ...headers},
            method: 'GET',
        });
    }
};