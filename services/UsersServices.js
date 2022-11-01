import axios from 'axios';// For API consuming
import { HEADERS, URL_USERS } from "./Constants";
import { User } from '../models/user';

export const UsersService = {
    getUser: async (userId) => {
        try {
            // const url = `${URL_USERS}/user/${userId}`;
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/${userId}`;
            //const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/user`;
            //const url = `http://localhost:8081/api/users-service/user/${userId}`;
            const response = await axios.get(url, HEADERS); //falla ac[a]
            const user = new User();
            user = response.data;
            
            return user;
        } 
        catch (error) {
            console.log(`UsersService getUser: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    }
};