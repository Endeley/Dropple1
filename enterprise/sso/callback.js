import { googleClient } from './providers/google';
import { enterpriseProvision } from '../scim/provisionUser';

export default async function handler(req, res) {
    const { code, provider } = req.query;
    let email = null;

    if (provider === 'google') {
        const { tokens } = await googleClient.getToken(code);
        const ticket = await googleClient.verifyIdToken({ idToken: tokens.id_token, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        email = payload.email;
        await enterpriseProvision(email, payload);
    }

    if (!email) return res.status(400).send('Unsupported provider');
    res.redirect('/dashboard');
}
