import axios from 'axios';// For API consuming
import { HEADERS, URL_TRIPS } from "./Constants";

export const TripsServices = {

    getNewTripsPerRangeMetrics: async (days) => {
        try { 
            const labels = [];
            const values = [];

            const currentDate = new Date(Date.now());

            for (let i=days-1; i>=0 ;i--){
                const newDay= currentDate;
                currentDate.setDate(newDay.getDate()-i);
                values.push(0);
                labels.push(`${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`);
            }
           const url = `${URL_TRIPS}/metrics/trips/new/count/days/range?amount=${days}` 
           const response = await axios.get(url, HEADERS);
            
          
            for (let i=days-1; i>=0 ;i--){
                for(let j=0; j<len(response); j++){
                    if(response[j]==labels[i]){
                       values[i]=response[j].value;
                    }
                }
            }
            console.log(labels, "labels");
            console.log(values, "values")
            return [labels, values];
        }
        catch (error) {
            console.log(`New Trips Per Range Metrics get: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },


    getTripDurationPerRangeMetrics: async (days) => {
        try { 

            const labels = [];
            const values = [];

            const currentDate = new Date(Date.now());

            for (let i=days-1; i>=0 ;i--){
                const newDay= currentDate;
                currentDate.setDate(newDay.getDate()-i);
                values.push(0);
                labels.push(`${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`);
            }

            const url = `${URL_TRIPS}/metrics/trips/duration/days/range?amount=${days}`
            const response = await axios.get(url, HEADERS);
            
  
            for (let i=days-1; i>=0 ;i--){
                for(let j=0; j<len(response); j++){
                    if(response[j]==labels[i]){
                       values[i]=response[j].value;
                    }
                }
            }
            console.log(labels, "labels");
            console.log(values, "values")
            return [labels, values];
        }
        catch (error) {
            console.log(`Trip Duration Per Range Metrics get: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};