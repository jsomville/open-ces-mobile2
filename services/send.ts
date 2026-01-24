import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import config from '../app/config';

export const send = async (number: string, amount: number) => {

    const data = await AsyncStorage.getItem('account');
    if (data) {
        const accountData = JSON.parse(data);

        // Perform the transfer request
        const url = `${config.api_base_url}/api/account/${accountData.number}/transferTo`;
        console.log("send transaction to URL:", url);
        const token = await SecureStore.getItemAsync('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const body = {
            number,
            amount
        };

        try {
            const response = await axios.post(url, body, {
                headers,
                validateStatus: (status) => status < 500
            });

            console.log("send transaction response:", response.status, response.data);

            if (response.status === 201) {
                return {
                    status: response.status,
                    message: "OK"
                };
            }
            else {
                return {
                    status: response.status,
                    message: response.data.error
                };
            }
        } catch (error) {
            console.error("Error sending transaction:", error);
            throw error;
        }
    }
    return {
        status: 999,
        message: "Missing current account information"
    };
};