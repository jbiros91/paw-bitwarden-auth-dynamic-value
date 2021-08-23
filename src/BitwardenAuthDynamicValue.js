import { HTTPBitwardenAuth } from "./HTTPBitwardenAuth";

@registerDynamicValueClass
class BitwardenAuthDynamicValue {
    static identifier = 'com.jozefbiros.PawExtensions.BitwardenAuthDynamicValue'
    static title = 'Bitwarden Auth'
    static help = 'Help is not provided'
    static inputs = [
        InputField('email', 'Email', "String"),
        InputField("password", "Password", "SecureValue", { placeholder: 'Type a password'})
    ]

    evaluate() {
        const bitwardenAuth = new HTTPBitwardenAuth(new NetworkHTTPRequest())
        return bitwardenAuth.getBearerToken(this.email, this.password)
    }
}
