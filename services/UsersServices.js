import axios from 'axios';// For API consuming
import { HEADERS, URL_USERS } from "./Constants";
import { User } from '../models/user';
import { Passenger } from '../models/passenger';
import { Driver } from '../models/driver';
import { Admin } from '../models/admin';



export const UsersService = {
    getPassengers: async () => {
        try { 

            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/passenger`
            const response = await axios.get(url, HEADERS); 

            const passengers = [];
            for (let index = 0; index < response.data.length; index++) {
                let userId = response.data[index].userId
                let wallet = response.data[index].wallet
                const url_user = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/${userId}`;
                const response_user = await axios.get(url_user, HEADERS); 
                const passenger = new Passenger( response_user.data.id,
                    response_user.data.email,
                    response_user.data.firstName,
                    response_user.data.lastName,
                    response_user.data.username,
                    response_user.data.address,
                    response_user.data.password,
                    wallet);
                //passenger = response_user.data;
                console.log(passenger);
                passengers[index] = passenger;
            } 
            
            return passengers;
        } 
        catch (error) {
            console.log(`UsersService getPassengers: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    getDrivers: async () => {
        try { 

            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/driver`
            const response = await axios.get(url, HEADERS); 

            const drivers = [];
            for (let index = 0; index < response.data.length; index++) {
                let userId = response.data[index].userId
                const url_user = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/${userId}`;
                const response_user = await axios.get(url_user, HEADERS); 
                const driver = new Driver();
                driver = response_user.data;
                console.log(driver);
                drivers[index] = driver;
            } 
            
            return drivers;
        } 
        catch (error) {
            console.log(`UsersService getDrivers: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    getAdmins: async () => {
        try { 

            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/administrator`
            const response = await axios.get(url, HEADERS); 

            const admins = [];
            for (let index = 0; index < response.data.length; index++) {
                
                const admin = new Admin();
                console.log(response.data[index])
                admin = response.data[index];
                console.log(admin);
                admins[index] = admin;
            } 
            
            return admins;
        } 
        catch (error) {
            console.log(`UsersService getAdmins: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    }
};