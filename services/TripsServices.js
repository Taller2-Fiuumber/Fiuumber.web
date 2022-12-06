import axios from 'axios';// For API consuming
import { URL_TRIPS } from "./Constants";
import { currentUserToken } from '../src/contexts/currentAdmin';


export const TripsServices = {

    getHeaders: () => {
        return {headers: { Accept: 'application/json', 'auth-token': currentUserToken.token}};
    },

    getNewTripsPerRangeMetrics: async (days) => {
        try { 
            const labels = [];
            const real_labels = [];
            const values = [];

            const currentDate = new Date(Date.now());

            for (let i=days-1; i>=0 ;i--){
                const newDay = new Date();
                newDay.setDate(currentDate.getDate() - i);
                const resultDay = newDay.toLocaleDateString("en-CA", {year: "numeric", month: "2-digit", day: "2-digit"});
                const realResultDay = newDay.toLocaleDateString("en-UK", {year: "numeric", month: "2-digit", day: "2-digit"});
                values.push(0);
                labels.push(resultDay);
                real_labels.push(realResultDay);
            }
           const url = `${URL_TRIPS}/metrics/trips/new/count/days/range?amount=${days}` 
           const response = await axios.get(url, TripsServices.getHeaders());

          let datas = response.data;
            for (let i=0; i<days; i++){
                for(let j=0; j<datas.length; j++){
                    if(datas[j]._id == labels[i]){
                       values[i]=datas[j].count;
                    }
                }
            }
            return [real_labels, values];
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

            for (let i=0; i<120 ; ){
                if(i==110){
                    labels.push(`> 110`)
                } else {
                    labels.push(`${i}-${i+10}`)
                }
                i = i + 10;
                values.push(0);
            }

            const url = `${URL_TRIPS}/metrics/trips/duration/days/range?amount=${days}`
            const response = await axios.get(url, TripsServices.getHeaders());
            
            let datas = response.data;
            for (let i=0; i<datas.length; i++){
                for(let j = 0; j<labels.length; j++) {
                    if((datas[i]._id >= j*10) && (datas[i]._id < (j*10)+10)){
                        values[j] = values[j] + datas[i].count;
                    }
                    if((datas[i]._id >= 110)){
                        values[12] = values[12] + datas[i].count;
                    }
                }
            }

            return [labels, values];
        }
        catch (error) {
            console.log(`Trip Duration Per Range Metrics get: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },
};