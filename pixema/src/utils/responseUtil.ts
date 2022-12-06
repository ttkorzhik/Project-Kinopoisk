export const responseToJSONHandler = (response: Response) => {
    if (response.ok) {
        return response.json()
    } else {
        throw new Error(response.statusText)
    }
};
