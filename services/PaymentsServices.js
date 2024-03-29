import axios from 'axios';// For API consuming
import { URL_PAYMENTS } from "./Constants";
import { currentUserToken } from '../src/contexts/currentAdmin';



export const PaymentsServices = {

    getHeaders: () => {
        return {headers: { Accept: 'application/json', 'auth-token': currentUserToken.token}};
    },

    loadBallanceToWallet: async (amountInEthers, receiverAddress) => {
        try {
            const url = `${URL_PAYMENTS}/depositToReceiver`;
            return await axios.post(url, {amountInEthers: amountInEthers.toString(), receiverAddress: receiverAddress}, getHeaders(),);
        }
        catch (error) {
            if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
                console.log(`Transaction was not successful, please retry`);
                return await loadBallanceToWallet(amountInEthers, walletAddress);
            } else {
                console.log(`Load Balance to wallet: ${error}`);
                if (error && error.response && error.response.status == 401) return undefined;
                return undefined;
            }
        }
    },

};
