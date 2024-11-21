const API_BASE_URL = 'https://api.allegro.pl';


export const getOffers = () => `${API_BASE_URL}/sale/offers`;

export const getOfferById = (offerId) => `${API_BASE_URL}/sale/product-offers/${offerId}`

export const getSmartOfferById = (offerId) => `${API_BASE_URL}/sale/offers/${offerId}/smart`

export const getOfferEvents = () => `${API_BASE_URL}/sale/offer-events`