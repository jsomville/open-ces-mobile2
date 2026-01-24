import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import config from '../app/config';

export const getAboutCurrencies = async () => {
  try {

    const url = `${config.api_base_url}/api/about/currencies`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.get(url, {
      headers,
      validateStatus: (status) => status < 500 // treat 4xx as resolved, only 5xx as error
    });

    if (response.status === 200) {

      const data = JSON.stringify(response.data);

      if (config.debug_web_request) {
        console.log('aboutCurrency.ts - about currencies data:', data); 
      }

      await AsyncStorage.setItem('aboutCurrencies', data);
      
      return {
        status: 200,
        message: "OK"
      };
    }
    else {
      return {
        status: response.status,
        message: "Error retrieving about currencies"
      };
    }

  } catch (error) {
      console.error('Retrieving about currencies failed:', error);
      throw error;
  }
};


