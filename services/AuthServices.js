import axios from 'axios';// For API consuming
import { UserToken } from '../models/userToken';
import { Admin } from '../models/admin';
import { currentAdmin, currentUserToken } from '../src/contexts/currentAdmin';



import { HEADERS, RAW_HEADERS, URL_AUTH, URL_USERS } from "./Constants";

export const AuthService = {
    getCurrentUserToken: () => currentUserToken,
    setCurrentUserToken: (userToken) => {
        //pasa dos veces??
        // console.log('raviol');
        currentUserToken = userToken;
    },
    //getHeaders: () => { return { headers: {...RAW_HEADERS, 'auth-token': _userToken?.token}}},
    validateLogin: async (email, password) => {
        try {             
            //email = email.replace("@", "%40");
            const url = `https://fiuumber-gateway-1.herokuapp.com/api/auth/administrator/login?email=${email}&password=${password}`
            const response = await axios.get(url, HEADERS); 
            const token = response.data.token;        
            const admin = new Admin(response.data.user.id, response.data.user.email, response.data.user.firstName, response.data.user.lastName, response.data.user.password);
            currentAdmin.setAdmin(admin.adminId, admin.email, admin.firstName, admin.lastName, admin.password);
            currentUserToken.setUserToken(currentAdmin, token);
        }   
        catch (error) {           
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};
