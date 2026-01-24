import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";


import { fetchTransaction } from "../../services/controller";
import Transaction from "../components/Transaction";
import globalStyles from "../globalStyles";

const TransactionsScreen = () => {
  const [transactionsList, setTransactionsList] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {

      const result = await fetchTransaction();
      if (result.status === 200) {
        console.log("transactions - received transaction data");

        const data = await AsyncStorage.getItem("transactions");

        if (data) {
          const transactionList = JSON.parse(data);

          setTransactionsList(transactionList);
        };
      }
      else {
        console.error(result.status, result.message);
      }   
    };

    fetchInfo();
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      {Array.isArray(transactionsList) && transactionsList.length > 0 ? (
        transactionsList.map((transaction: any, index: number) => (
          <Transaction
            key={index}
            date={transaction.createdAt}
            description={transaction.description}
            transactionType={transaction.transactionType}
            amount={transaction.amount}
          />
        ))
      ) : (
        <Text>No transactions available.</Text>
      )}
    </View>
  );
};

export default TransactionsScreen;