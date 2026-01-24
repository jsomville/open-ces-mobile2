import axios from 'axios';

import config from '../app/config';

export const register = async (symbol: string, firstname: string, lastname: string, email: string, phone: string, region: string, password: string) => {

    // Perform the transfer request
    const url = `${config.api_base_url}/api/register`;
    const headers = {
        'Content-Type': 'application/json',
    };
    const body = {
        firstname,
        lastname,
        email,
        phone,
        region,
        password,
        symbol
    };

    try {
        const response = await axios.post(url, body, {
            headers,
            validateStatus: (status) => status < 500
        });

        if (response.status == 201) {
            return {
                status: response.status,
                message: "OK"
            };
        }
        else {
            console.log("Registration failed with status", response.status, "and message", response.data.error);
            return {
                status: response.status,
                message: response.data.error
            };
        }
    } catch (error) {
        console.error("Error registrering", error);
        throw error;
    }

};