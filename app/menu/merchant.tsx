import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import globalStyles from "../globalStyles";

const debug_this_ui = false;

const MerchantsScreen = () => {


    const fetchDetails = async () => {
        // Get other information
        
    }

    // Fetch details on component mount
    useEffect(() => {
        fetchDetails();
    }, []);

    return (
    <View style={globalStyles.mainContainer}>
       
    </View>
  );
};


export default MerchantsScreen;