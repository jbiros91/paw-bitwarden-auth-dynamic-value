import pbkdf2 from "pbkdf2";
import { Buffer } from "buffer";
import {
    RequestMethod,
    RequestHeader,
    TokenResponseField,
    ContentType,
    BITWARDEN_PRELOGIN,
    BITWARDEN_TOKEN,
    CLIENT_ID,
    DEVICE_IDENTIFIER,
    DEVICE_NAME,
    DEVICE_TYPE,
} from "./constants";
import { toFormUrlEncoded } from "./utils";


export class HTTPBitwardenAuth {
    #httpRequest = null

    constructor(httpRequest) {
        this.#httpRequest = httpRequest
    }

    #setRequestBody = (bodyObject, contentType) => {
        if(!contentType)
            throw new Error('Content type have to specified in order to correctly encode request body')

        if(typeof bodyObject !== 'object')
            throw new Error('Request body have to be an object')

        return contentType === ContentType.FORM_URL_ENCODED
            ? toFormUrlEncoded(bodyObject)
            : JSON.stringify(bodyObject)
    }

    #makeRequest = (url, body, contentType) => {
        // all bitwarden authentication endpoints uses POST
        this.#httpRequest.requestMethod = RequestMethod.POST
        this.#httpRequest.requestUrl = url
        this.#httpRequest.requestBody = this.#setRequestBody(body, contentType)
        this.#httpRequest.setRequestHeader(RequestHeader.CONTENT_TYPE, contentType)

        this.#httpRequest.send()

        return JSON.parse(this.#httpRequest.responseBody)
    }


    #makeKey = (email, password) => {
        const sanitizedEmail = email.trim().toLowerCase()

        const response = this.#makeRequest(BITWARDEN_PRELOGIN,   { email: sanitizedEmail }, ContentType.JSON)
        const kdfIterations = Number(response.KdfIterations)

        return pbkdf2.pbkdf2Sync(password, sanitizedEmail, kdfIterations, 32, 'sha256')
    }

    #makeHashedPassword = (password, key) => {
        const hashedPassword = pbkdf2.pbkdf2Sync(key, password, 1, 32, 'sha256')
        return Buffer.from(hashedPassword).toString('base64')
    }

    getBearerToken = (email, password) =>  {
        const key = this.#makeKey(email, password)
        const hashedPassword = this.#makeHashedPassword(password, key)

        const request = this.#makeRequest(BITWARDEN_TOKEN, {
            'grant_type': 'password',
            'client_id': CLIENT_ID,
            scope: 'api offline_access',

            username: email,
            password: hashedPassword,

            deviceType: DEVICE_TYPE,
            deviceName: DEVICE_NAME,
            deviceIdentifier: DEVICE_IDENTIFIER
        }, ContentType.FORM_URL_ENCODED)

        return [request[TokenResponseField.TOKEN_TYPE], request[TokenResponseField.ACCESS_TOKEN]].join(' ')
    }

}
