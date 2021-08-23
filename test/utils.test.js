import { toFormUrlEncoded } from "../src/utils";

describe('testing toFormUrlEncoded util', () => {
    const email = 'john.doe@gmail.com'
    const password = '12456789abc'

    it('should correctly return urlencoded javascript object', () => {
        const result = toFormUrlEncoded({
            email,
            password
        })

        expect(result).toBe(`email=${encodeURIComponent(email)}&password=${password}`)
    })
})
