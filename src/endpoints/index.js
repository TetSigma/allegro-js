import * as userEndpoints from './userEndpoints';

import * as offerEndpoints from './offerEndpoints';


const endpoints = {

    ...userEndpoints,

    ...offerEndpoints,

};


export default endpoints;