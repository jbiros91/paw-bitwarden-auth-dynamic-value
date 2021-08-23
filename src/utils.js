/**
 * Transform javascript object into form urlencoded
 * @param {Object} object
 * @return {string}
 */
export const toFormUrlEncoded = (object) =>
    Object.entries(object)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
