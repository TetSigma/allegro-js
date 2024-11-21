import axios from "axios";
import endpoints from "./endpoints";

class AllegroClient{
    constructor(clientId, clientSecret){
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.authUrl = 'https://allegro.pl/auth/oauth/authorize'
        this.tokenUrl = 'https://allegro.pl/auth/oauth/token'
        this.token = null;
        this.tokenExpiry = null;
        this.httpClient = axios.create({
            baseURL: this.authUrl,
            headers:{
                Accept: 'application/vnd.allegro.public.v1+json',
            }
        })
    }
    
    async authenticate(){
        if (this.token && new Date() < this.tokenExpiry){
            return this.token
        }

        const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
        const response = await axios.post(this.authUrl, null, {
            params: {'grant type': 'authorization_code'},
            headers:{
                Authorization: `Basic ${credentials}`
            }
        })

        this.token = response.data.access_token;
        this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
        this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        
        return this.token;
    }
    
    async request(method, endpoint, data = null, params = null){
        await this.authenticate();
        try{
            const response = await this.httpClient.request({
                method,
                url: endpoint,
                data,
                params
            });
            return response.data
        }catch(error){
            console.error('API Request Failed:', error.response?.data || error.message);
            throw error;
        }
    }

    async getUser (){
        return this.request('GET', endpoints.getUser());
    }

    async getOffers(){
        return this.request('GET', endpoints.getOffers());
    }

    async getOfferById(offerId){
        return this.request('GET', endpoints.getOfferById(offerId));
    }

    async getSmartOfferById(offerId){
        return this.request('GET', endpoints.getSmartOfferById(offerId));
    }

    async getOfferEvents(){
        return this.request('GET', endpoints.getOfferEvents());
    }

    

}


module.exports = AllegroClient;