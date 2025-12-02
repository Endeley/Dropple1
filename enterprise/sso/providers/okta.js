export const oktaConfig = {
    domain: process.env.OKTA_DOMAIN,
    clientId: process.env.OKTA_CLIENT_ID,
    clientSecret: process.env.OKTA_CLIENT_SECRET,
    redirectUri: `${process.env.APP_URL}/enterprise/sso/callback?provider=okta`,
};
