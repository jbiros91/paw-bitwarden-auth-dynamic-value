// For Cloud-hosted, https://identity.bitwarden.com/connect/token.

// For Self-hosted, https://your.domain.com/identity/connect/token.
// preLoginRequest.requestUrl = 'https://vault.bitwarden.com/api/accounts/prelogin'

// tokenRequest.requestUrl = 'https://vault.bitwarden.com/identity/connect/token'

const BITWARDEN_BASE_URL = 'https://vault.bitwarden.com'
export const BITWARDEN_PRELOGIN = `${BITWARDEN_BASE_URL}/api/accounts/prelogin`
export const BITWARDEN_TOKEN = `${BITWARDEN_BASE_URL}/identity/connect/token`

export const RequestMethod = {
    GET: 'GET',
    POST: 'POST'
}

export const RequestHeader = {
    CONTENT_TYPE: 'Content-Type'
}

export const ContentType = {
    JSON: 'application/json',
    FORM_URL_ENCODED: 'application/x-www-form-urlencoded; charset=utf-8'

}
export const TokenResponseField = {
    TOKEN_TYPE: 'token_type',
    ACCESS_TOKEN: 'access_token'

}

/**
 * The enum strings come from:
 * https://github.com/bitwarden/server/blob/b19628c6f85a2cd5f1950ac222ba14840a88894d/src/Core/Enums/DeviceType.cs.
 */
export const DEVICE_TYPE = '7' // MacOs Desktop
/**
 * deviceName should probably be like "Linux", "Android".
 * Can be used custom name of application in order to differentiate paw logins fromthose made by the official cliens
 */
export const DEVICE_NAME = 'paw extension'
export const DEVICE_IDENTIFIER = bundle.appId
export const CLIENT_ID = 'connector' // seen in bitwarden/jslib

