import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import globalStyles from "../globalStyles";
import { useRoute, RouteProp } from '@react-navigation/native';

interface TransactionParams {
  date: string;
  transactionType: string;
  description: string;
  amount: string | number;
}

const OneTransactionsScreen = () => {
    const route = useRoute<RouteProp<{ oneTransaction: TransactionParams }, 'oneTransaction'>>();
    const { date, transactionType, description, amount } = route.params;

    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getFullYear()}/${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}/${parsedDate.getDate().toString().padStart(2, '0')}`;

    const formattedTime = `${parsedDate.getHours()}:${parsedDate.getMinutes().toString().padStart(2, '0')}`;

    const fetchDetails = async () => {
        // Get other information

    }

    // Fetch details on component mount
    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <View style={globalStyles.mainContainer}>
            <Text style={globalStyles.info_label}>
                Date : {formattedDate} {formattedTime}
            </Text>
            <Text style={globalStyles.info_label}>Type: {transactionType}</Text>
            <Text style={globalStyles.info_label}>Description: {description}</Text>
            <Text style={globalStyles.info_label}>Amount: {amount}</Text>
        </View>
    );
};


export default OneTransactionsScreen;