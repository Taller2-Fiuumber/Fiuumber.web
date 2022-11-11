import axios from 'axios';// For API consuming
import { userToken } from '../models/userToken';
import { admin } from '../models/admin';

//import { HEADERS, RAW_HEADERS, URL_AUTH, URL_USERS } from "./Constants";
// import { Passenger } from '../models/passenger';
// import { Driver, DriverData } from '../models/driver';
// import { DriverVehicle } from '../models/driver_vehicle';
// import { Vehicle } from '../models/vehicle';

let _userToken = null;
export const AuthService = {
    getCurrentuserToken: () => _userToken,
    setCurrentuserToken: (userToken) => {_userToken = userToken},
    //getHeaders: () => { return { headers: {...RAW_HEADERS, 'auth-token': _userToken?.token}}},
    login: async (email, password) => {
        try {             
            //email = email.replace("@", "%40");
            const url = `https://fiuumber-gateway-1.herokuapp.com/api/auth/administrator/login?email=${email}&password=${password}`
            const response = await axios.get(url, HEADERS); 
            const token = response.data.token;        
            const admin = new Admin(response.data.user.id, response.data.user.email, response.data.user.firstName, response.data.user.lastName, response.data.user.password);
            const userToken = new userToken(admin, token);
            return userToken;
        }   
        catch (error) {           
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },


    //Funciones choreadas de Mobile (ver que tienen llamados a funciones random que acá no existen)
    // updatePassenger: async (passenger: Passenger): Promise<boolean> => {
    //     try {
    //         if (_userToken != null) {
    //             const url = `${URL_USERS}/passenger`;
    //             await axios.put(url, passenger, AuthService.getHeaders(),);
    //             _userToken.user = passenger;
    //             return true;
    //         }
    //         return false;
    //     }
    //     catch (error: any) {
    //         console.log(error);
    //         throw error;
    //     }
    // },
    // updateDriver: async (driver: Driver): Promise<boolean> => {
    //     try {
    //         if (_userToken != null) {
    //             const url = `${URL_USERS}/driver`;
    //             const driver_data = new DriverData(
    //                 driver.user.userId,
    //                 driver.user.email,
    //                 driver.user.firstName,
    //                 driver.user.lastName,
    //                 driver.user.address,
    //                 driver.user.password,
    //                 driver.user.username,
    //                 driver.wallet,
    //                 driver.driverVehicle
    //             )
    //             console.log("driver_data", driver_data)
    //             await axios.put(url, driver_data, AuthService.getHeaders(),);
    //             return true;
    //         }
    //         return false;
    //     }
    //     catch (error: any) {
    //         console.log(error);
    //         throw error;
    //     }
    // },
    // getCurrentDriver: async (): Promise<Driver | undefined> => {
    //     try {
    //         if (_userToken != null) {
    //             const driver_url = `${URL_USERS}/driver/${_userToken.user.id}`;

    //             let user =  await axios.get(driver_url, AuthService.getHeaders(),);
    //             return user.data
    //         }
    //         return undefined;
    //     }
    //     catch (error: any) {
    //         console.log(error);
    //         throw error;
    //     }
    // },
    // getCurrentPassenger: async (): Promise<Passenger | undefined> => {
    //     try {
    //         if (_userToken != null) {
    //             const passenger_url = `${URL_USERS}/passenger/${_userToken.user.id}`;

    //             let user =  await axios.get(passenger_url, AuthService.getHeaders(),);
    //             return user.data
    //         }
    //         return undefined;
    //     }
    //     catch (error: any) {
    //         console.log(error);
    //         throw error;
    //     }
    // },
};
