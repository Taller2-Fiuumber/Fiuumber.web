import axios from 'axios';// For API consuming
import { HEADERS, URL_USERS } from "./Constants";
import { Passenger } from '../models/passenger';
import { Driver } from '../models/driver';
import { Admin } from '../models/admin';
import { currentUserToken } from '../src/contexts/currentAdmin';


export const UsersService = {
    getPassengers: async (skip, take) => {
        try {

            const response = await axios.get(`${URL_USERS}/passenger/page/${skip}&${take}`, HEADERS,);
            const passengers = [];
            for (let index = 0; index < response.data.length; index++) {
                const passenger = new Passenger(
                    response.data[index].userId,
                    response.data[index].user.email,
                    response.data[index].user.firstName,
                    response.data[index].user.lastName,
                    response.data[index].user.username,
                    response.data[index].user.address,
                    response.data[index].user.password,
                    response.data[index].user.blocked,
                    response.data[index].wallet
                  );
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

    getAmountOfPassenger: async () => {
      try {
            const response = await axios.get(`${URL_USERS}/passengers/count`, HEADERS);
            console.log(currentUserToken.token.toString());
            return response.data.amount;
      }
      catch (error) {
          console.log(`UsersService getAmountOfPassenger: ${error}`);
          throw error;
      }
    },
    getAmountOfBlockedPassengers: async () => {
        try {
  
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/passenger/blocked/amount`
            const response = await axios.get(url, HEADERS);
            return response.data.amount;
        }
        catch (error) {
            console.log(`UsersService getAmountOfBlockedPassengers: ${error}`);
            throw error;
        }
      },

    getDrivers: async (skip, take) => {
        try {

            const response = await axios.get(`${URL_USERS}/driver/page/${skip}&${take}`, HEADERS);

            const drivers = [];
            for (let index = 0; index < response.data.length; index++) {
                const driver = new Driver(
                    response.data[index].userId,
                    response.data[index].user.email,
                    response.data[index].user.firstName,
                    response.data[index].user.lastName,
                    response.data[index].user.username,
                    response.data[index].user.address,
                    response.data[index].user.password,
                    response.data[index].user.blocked,
                    response.data[index].wallet,
                    response.data[index].driverVehicle,
                  );
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

    getAmountOfDriver: async () => {
      try {

            const response = await axios.get(`${URL_USERS}/drivers/count`, HEADERS);
            return response.data.amount;
      }
      catch (error) {
          console.log(`UsersService getAmountOfDriver: ${error}`);
          throw error;
      }
    },

    getAmountOfBlockedDrivers: async () => {
        try {
  
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/user/driver/blocked/amount`
            const response = await axios.get(url, HEADERS);
            return response.data.amount;
        }
        catch (error) {
            console.log(`UsersService getAmountOfBlockedDrivers: ${error}`);
            throw error;
        }
      },
      getAmountOfBlockedUsers: async () => {
        try {
  
            const url = 'https://fiuumber-api-users.herokuapp.com/api/users-service/user/passenger/blocked/amount'
            const response = await axios.get(url, HEADERS);
            return response.data;
        }
        catch (error) {
            console.log(`UsersService getAmountOfBlockedUsers: ${error}`);
            throw error;
        }
      },
      

    getAdmins: async (skip, take) => {
        try {

            const response = await axios.get(`${URL_USERS}/administrator/page/${skip}&${take}`, HEADERS);

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

    getAmountOfAdmins: async () => {
        try {

            const response = await axios.get(`${URL_USERS}/administrators/count`, HEADERS);
            return response.data.amount;
        }
        catch (error) {
            console.log(`UsersService getAmountOfAdmins: ${error}`);
            throw error;
        }
    },

    postAdministrator: async (email, firstName, lastName, password) => {
        try {

            const admin = new Admin(-1, email, firstName, lastName, password);
            await axios.post(`${URL_USERS}/administrator`, admin, HEADERS);
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
            //const url = `https://fiuumber-api-users.herokuapp.com/api/trips`
            const response = await axios.post(`${URL_TRIPS}`, HEADERS);




        }
        catch (error) {
            console.log(`UsersService setPrices: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },


    getPassenger: async (id) => {
        try {

            const response_user = await axios.get(`${URL_USERS}/user/${id}`, HEADERS);
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

            const response_user = await axios.get(`${URL_USERS}/driver/${id}`, HEADERS);
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

            const response = await axios.get(`${URL_USERS}/administrator/${id}`, HEADERS);

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

            const response = await axios.post(`${URL_USERS}/user/${id}/blocked`, HEADERS);
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
            const response = await axios.delete(`${URL_USERS}/user/${id}/blocked`, HEADERS);
            return response;
        }
        catch (error) {
            console.log(`UsersService getAdmin: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    getLogInMetricsGoogle: async (currentDate, days) => {
        try {
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/users/logInGoogle/count-per-day-last-days?day=${currentDate}&numberOfDays=${days}`
            const response = await axios.get(url, HEADERS);
     
            const labels = [];
            const values = [];
            for (let i=days-1; i>=0 ;i--){
                values.push(response.data[i].value);
                labels.push(response.data[i].key);
            }

            return [labels, values];
        }
        catch (error) {
            console.log(`LoginMetricsGoogle get: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
    getLogInMetrics: async (currentDate, days) => {
        try {
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/users/logIn/count-per-day-last-days?day=${currentDate}&numberOfDays=${days}`
            const response = await axios.get(url, HEADERS);
            const labels = [];
            const values = [];
            for (let i=days-1; i>=0 ;i--){
                values.push(response.data[i].value);
                labels.push(response.data[i].key);
            }

            return [labels, values];
        }
        catch (error) {
            console.log(`LogInMetrics get: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    getSignInMetricsGoogle: async (currentDate, days) => {
        try { 
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/users/signInGoogle/count-per-day-last-days?day=${currentDate}&numberOfDays=${days}`
            const response = await axios.get(url, HEADERS);
            
            const labels = [];
            const values = [];
            for (let i=days-1; i>=0 ;i--){
                values.push(response.data[i].value);
                labels.push(response.data[i].key);
            }

            return [labels, values];
        }
        catch (error) {
            console.log(`SignInMetricsGoogle get: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },

    getSignInMetrics: async (currentDate, days) => {
        try { 
            const url = `https://fiuumber-api-users.herokuapp.com/api/users-service/users/signIn/count-per-day-last-days?day=${currentDate}&numberOfDays=${days}`
            const response = await axios.get(url, HEADERS);
            
            const labels = [];
            const values = [];
            for (let i=days-1; i>=0 ;i--){
                values.push(response.data[i].value);
                labels.push(response.data[i].key);
            }

            return [labels, values];
        }
        catch (error) {
            console.log(`SignInMetrics get: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};
