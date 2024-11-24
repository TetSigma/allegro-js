import axios from 'axios';

class ApiService {
    constructor(authService, baseURL = 'https://api.allegro.pl') {
        this.authService = authService;
        this.httpClient = axios.create({
            baseURL,
            headers: {
                Accept: 'application/vnd.allegro.public.v1+json',
            },
        });
    }

    async request(method, url, data = null, params = null) {
        const token = await this.authService.authenticate();
        this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            const response = await this.httpClient.request({ method, url, data, params });
            return response.data;
        } catch (error) {
            console.error('API Request Failed:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default ApiService;
