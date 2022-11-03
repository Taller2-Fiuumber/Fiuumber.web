import axios from 'axios';// For API consuming
import { HEADERS, URL_USERS } from "./Constants";
import { User } from '../models/user';

export const UsersService = {
    getUsers: async () => {
        try {

            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/passenger`
            const response = await axios.get(url, HEADERS); //falla ac[a]

            const users = [];
            for (let index = 0; index < response.data.length; index++) {
                let userId = response.data[index].userId
                const url_user = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/${userId}`;
                const response_user = await axios.get(url_user, HEADERS); 
                const user = new User();
                user = response_user.data;
                users[index] = user;
            } 
            
            return users;
        } 
        catch (error) {
            console.log(`UsersService getUser: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    }
};