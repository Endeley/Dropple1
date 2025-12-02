export const samlConfig = {
    entryPoint: process.env.SAML_ENTRYPOINT,
    issuer: process.env.SAML_ISSUER,
    cert: process.env.SAML_CERT,
    callbackUrl: `${process.env.APP_URL}/enterprise/sso/callback?provider=saml`,
};
