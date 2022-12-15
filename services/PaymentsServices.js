import axios from 'axios';// For API consuming
import { URL_PAYMENTS } from "./Constants";
import { currentUserToken } from '../src/contexts/currentAdmin';



export const PaymentsServices = {

    getHeaders: () => {
        return {headers: { Accept: 'application/json', 'auth-token': currentUserToken.token}};
    },

    loadBallanceToWallet: async (amount,wallet_id) => {
        const detail = {"amountInEthers": amount.toString(),"receiverAddress": wallet_id.toString()}
        try {
            const response = await axios.post(`${URL_PAYMENTS}/depositToReceiver`, detail, PaymentsServices.getHeaders());
            return response;
        }
        catch (error) {
            console.log(`Load Balance to wallet: ${error}`);
            if (error && error.response && error.response.status == 401) return null;
            throw error;
        }
    },


 
};