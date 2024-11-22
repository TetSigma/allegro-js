import axios from 'axios';
import AllegroClient from '../src/AllegroClient';

jest.mock('axios');

describe('AllegroClient', () => {
    let client;
    const clientId = 'testClientId';
    const clientSecret = 'testClientSecret';

    beforeEach(() => {
        client = new AllegroClient(clientId, clientSecret);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should authenticate and set token', async () => {
        const mockTokenResponse = {
            data: {
                access_token: 'mockAccessToken',
                expires_in: 3600
            }
        };

        axios.post.mockResolvedValueOnce(mockTokenResponse);

        const token = await client.authenticate();

        expect(token).toBe('mockAccessToken');
        expect(client.token).toBe('mockAccessToken');
        expect(client.tokenExpiry).toBeInstanceOf(Date);
    });

    test('should make a GET request to get user', async () => {
        const mockUser Response = { id: 'user123', name: 'Test User' }; 
        axios.create.mockReturnValue({
            request: jest.fn().mockResolvedValue({ data: mockUser Response })
        });

        const user = await client.getUser ();
        expect(user).toEqual(mockUser Response); 
        expect(axios.create().request).toHaveBeenCalledWith({
            method: 'GET',
            url: expect.stringContaining('/sale/users/me'),
            data: undefined,
            params: undefined
        });
    });

    test('should make a GET request to get offers', async () => {
        const mockOffersResponse = [{ id: 'offer123', title: 'Test Offer' }];
        axios.create.mockReturnValue({
            request: jest.fn().mockResolvedValue({ data: mockOffersResponse })
        });

        const offers = await client.getOffers();

        expect(offers).toEqual(mockOffersResponse);
        expect(axios.create().request).toHaveBeenCalledWith({
            method: 'GET',
            url: expect.stringContaining('/sale/offers'),
            data: undefined,
            params: undefined
        });
    });

    test('should handle API request errors', async () => {
        const mockErrorResponse = { message: 'API Error' };
        axios.create.mockReturnValue({
            request: jest.fn().mockRejectedValue({ response: { data: mockErrorResponse } })
        });

        await expect(client.getUser ()).rejects.toThrow('API Request Failed:');
    });
});