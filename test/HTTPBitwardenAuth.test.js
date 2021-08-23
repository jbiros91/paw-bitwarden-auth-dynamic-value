import { HTTPBitwardenAuth } from "../src/HTTPBitwardenAuth";
import {
    ContentType,
    RequestHeader,
    TokenResponseField
} from "../src/constants";


describe('testing HTTPBitwardenAuth ', () => {

    it('should return bearer token', () => {
        const sendSpy = jest.fn()
        const setRequestHeaderSpy = jest.fn()
        const accessToken = Math.random()
        const request = {
            send: sendSpy,
            setRequestHeader: setRequestHeaderSpy,
            responseBody: JSON.stringify({
                KdfIterations: '343',
                [TokenResponseField.ACCESS_TOKEN]: accessToken,
                [TokenResponseField.TOKEN_TYPE]: 'Bearer'
            })
        }
        const sut = new HTTPBitwardenAuth(request)
        const result = sut.getBearerToken('john.doe@gmail.com', '123456789abc')


        // prelogin and access token request are using different content type in headers
        expect(setRequestHeaderSpy).toHaveBeenNthCalledWith(1, RequestHeader.CONTENT_TYPE, ContentType.JSON)
        expect(setRequestHeaderSpy).toHaveBeenNthCalledWith(2, RequestHeader.CONTENT_TYPE, ContentType.FORM_URL_ENCODED)


        // have to send 2 request one for prelogin and access token
        expect(sendSpy).toHaveBeenCalledTimes(2)


        expect(result).toBe(`Bearer ${accessToken}`)
    })
})
