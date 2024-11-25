import AuthService from './services/AuthService.js';
import ApiService from './services/ApiService.js';
import endpoints from './endpoints/index.js'

class AllegroClient {
    constructor(clientId, clientSecret) {
        this.authService = new AuthService(clientId, clientSecret);
        this.apiService = new ApiService(this.authService);
    }

    async getUser() {
        return this.apiService.request('GET', endpoints.getUser());
    }

    async getOffers() {
        return this.apiService.request('GET', endpoints.getOffers());
    }

    async getOfferById(offerId) {
        return this.apiService.request('GET', endpoints.getOfferById(offerId));
    }

    async getSmartOfferById(offerId) {
        return this.apiService.request('GET', endpoints.getSmartOfferById(offerId));
    }

    async getOfferEvents() {
        return this.apiService.request('GET', endpoints.getOfferEvents());
    }
}

export default AllegroClient;
