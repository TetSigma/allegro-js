import axios from 'axios';

class AuthService {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.tokenUrl = 'https://allegro.pl/auth/oauth/token';
        this.token = null;
        this.tokenExpiry = null;
    }

    async authenticate() {
        if (this.token && new Date() < this.tokenExpiry) {
            return this.token;
        }

        const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
        const response = await axios.post(this.tokenUrl, null, {
            params: { 'grant_type': 'client_credentials' },
            headers: {
                Authorization: `Basic ${credentials}`,
                Accept: 'application/json',
            },
        });

        this.token = response.data.access_token;
        this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

        return this.token;
    }
}

export default AuthService;
