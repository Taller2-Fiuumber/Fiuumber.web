import { CONFIG } from "../config";
import { currentUserToken } from '../src/contexts/currentAdmin';

export const URL_PAYMENTS = `${CONFIG.gatewayURL}${CONFIG.paymentsBasePath}`;
export const URL_USERS = `${CONFIG.gatewayURL}${CONFIG.usersBasePath}`;
export const URL_TRIPS = `${CONFIG.gatewayURL}${CONFIG.tripsBasePath}`//`${CONFIG.gatewayURL}${CONFIG.tripsBasePath}`;
export const URL_AUTH = `${CONFIG.gatewayURL}${CONFIG.authBasePath}`;
// export const HEADERS = { headers: { Accept: 'application/json', 'auth-token': currentUserToken.token}}; 
