
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import config from '../app/config';

export const getCurrency = async () => {
  try {

    console.log('get currency Request');

    const url = `${config.api_base_url}/api/currency`;

    const token = await SecureStore.getItemAsync('accessToken');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const response = await axios.get(url, {
      headers,
      validateStatus: (status) => status < 500 // treat 4xx as resolved, only 5xx as error
    });

    if (response.status === 200) {

      const currency =  JSON.stringify(response.data);

      if (config.debug_web_request) {
        console.log('Currency retrieved:', currency);
      } 

      //Store Currency list
      await AsyncStorage.setItem('currency', currency);

      return {
        status: 200,
        message: "OK",
      };
    } else {
      return {
        status: response.status,
        message: "Error retrieving user details"
      };
    }

  } catch (error) {
      console.error('User detail failed:', error);
      throw error;
  }
};


