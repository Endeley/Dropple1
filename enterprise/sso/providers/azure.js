export const azureConfig = {
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    redirectUri: `${process.env.APP_URL}/enterprise/sso/callback?provider=azure`,
};
