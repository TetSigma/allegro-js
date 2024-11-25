import * as userEndpoints from './userEndpoints.js';

import * as offerEndpoints from './offerEndpoints.js';


const endpoints = {

    ...userEndpoints,

    ...offerEndpoints,

};


export default endpoints;