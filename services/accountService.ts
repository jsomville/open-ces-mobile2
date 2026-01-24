import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import config from '../app/config';

export const getAccountFromEmail = async (email: string, symbol: string) => {
    try {
        const url = `${config.api_base_url}/api/account/by-email-and-symbol`;
        const token = await SecureStore.getItemAsync('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const body = {
            email,
            symbol
        };

        const response = await axios.post(url, body, {
            headers,
            validateStatus: (status) => status < 500
        });

        if (response.status !== 200) {
            console.log("getAccountFromEmail failed with status:", response.status);
            return {
                status: response.status,
                message: response.data.error,
                accountNumber: ""
            };
        }

        const data = JSON.stringify(response.data);
        await SecureStore.setItemAsync('sentAccountData', data);

        return {
            status: response.status,
            message: "OK",
            accountNumber: response.data.id
        };
    }
    catch (error) {
        console.error("Error sending transaction:", error);
        throw error;
    }
}

export const getAccountFromPhone = async (phone: string, symbol: string) => {
    try {
        const url = `${config.api_base_url}/api/account/by-phone-and-symbol`;
        const token = await SecureStore.getItemAsync('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const body = {
            phone,
            symbol
        };

        const response = await axios.post(url, body, {
            headers,
            validateStatus: (status) => status < 500
        });

        if (response.status !== 200) {
            console.log("getAccountFromPhone failed with status:", response.status);
            return {
                status: response.status,
                message: response.data.error,
                accountNumber: ""
            };
        }

        const data = JSON.stringify(response.data);
        await SecureStore.setItemAsync('sentAccountData', data);

        return {
            status: response.status,
            message: "OK",
            accountNumber: response.data.id
        };
    }
    catch (error) {
        console.error("Error sending transaction:", error);
        throw error;
    }
}