import axios from 'axios';// For API consuming
import { HEADERS, URL_USERS } from "./Constants";
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
                    response_user.data.blocked,
                    wallet);
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
                let wallet = response.data[index].wallet
                let vehicle = response.data[index].driverVehicle
                const url_user = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/${userId}`;
                const response_user = await axios.get(url_user, HEADERS); 
                const driver = new Driver(response_user.data.id,
                    response_user.data.email,
                    response_user.data.firstName,
                    response_user.data.lastName,
                    response_user.data.username,
                    response_user.data.address,
                    response_user.data.password,
                    response_user.data.blocked,
                    wallet,
                    vehicle);
                // driver = response_user.data;
                //console.log(driver);
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
                
                const admin = new Admin(response.data[index].id, response.data[index].email, response.data[index].firstName, response.data[index].lastName, response.data[index].password,  response.data[index].createdAt);

                admins[index] = admin;
            } 
            
            return admins;
        } 
        catch (error) {
            console.log(`UsersService getAdmins: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    postAdministrator: async (email, firstName, lastName, password) => {
        try { 
            
            const admin = new Admin(-1, email, firstName, lastName, password);
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/administrator`
            await axios.post(url, admin, HEADERS);
            return true;

        }   
        catch (error) {
            console.log(`UsersService postAdmin: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    validateLogin: async (email, password) => {
        try {             
            email = email.replace("@", "%40");
            const url = `https://fiuumber-gateway-1.herokuapp.com/api/auth/administrator/login?email=${email}&password=${password}`
            const response = await axios.get(url, HEADERS); 
            const token = response.data.token;
            const admin = new Admin(response.data.user.id, response.data.user.email, response.data.user.firstName, response.data.user.lastName, response.data.user.password,  response.data.user.createdAt);

            return {
                'admin': admin,
                'token': token
            };
        }   
        catch (error) {
            return null;
        }
    },
      
    setPrices: async () => {
        try { 

            //Acá se cargarian las nuevas tarifas a Trips.
            const url = `https://fiuumber-api-users.herokuapp.com/api/trips`
            const response = await axios.post(url, HEADERS); 

            
            
            
        } 
        catch (error) {
            console.log(`UsersService setPrices: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },


    getPassenger: async (id) => {
        try { 

            const url_user = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/${id}`;
            const response_user = await axios.get(url_user, HEADERS); 
            const passenger = new Passenger( response_user.data.id,
                response_user.data.email,
                response_user.data.firstName,
                response_user.data.lastName,
                response_user.data.username,
                response_user.data.address,
                response_user.data.password,
                response_user.data.blocked,
                null);
            return passenger;
        } 
        catch (error) {
            console.log(`UsersService getPassenger: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    getDriver: async (id) => {
        try { 

            const url_user = `https://fiuumber-api-users.herokuapp.com/api/users-service/driver/${id}`;
            const response_user = await axios.get(url_user, HEADERS); 
            let driverVehicle = response_user.data.driverVehicle;
            const driver = new Driver(
                    response_user.data.user.id,
                    response_user.data.user.email,
                    response_user.data.user.firstName,
                    response_user.data.user.lastName,
                    response_user.data.user.username,
                    response_user.data.user.address,
                    response_user.data.user.password,
                    response_user.data.user.blocked,
                    null,
                    driverVehicle);
            return driver;
        } 
        catch (error) {
            console.log(`UsersService getDriver: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    getAdmin: async (id) => {
        try { 

            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/administrator/${id}`
            const response = await axios.get(url, HEADERS); 

            const admin = new Admin(response.data.id, response.data.email, response.data.firstName, response.data.lastName, response.data.password,  response.data.createdAt);
            return admin;
        } 
        catch (error) {
            console.log(`UsersService getAdmin: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    blockUser: async (id) => {
        try { 

            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/${id}/blocked`
            const response = await axios.post(url, HEADERS); 
            return response;
        } 
        catch (error) {
            console.log(`UsersService getAdmin: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    unblockUser: async (id) => {
        try { 
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/${id}/blocked`
            const response = await axios.delete(url, HEADERS); 
            return response;
        } 
        catch (error) {
            console.log(`UsersService getAdmin: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};