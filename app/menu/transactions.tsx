import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { fetchTransaction } from "../../services/controller";
import Transaction from "../components/Transaction";
import globalStyles from "../globalStyles";

const debug_this_ui = false;

const TransactionsScreen = () => {
  const [transactionsList, setTransactionsList] = useState([]);

  const fetchDetails = async () => {
    if (debug_this_ui) {
      console.log("transactions.tsx - fetching transaction details");
    }

    const result = await fetchTransaction();
    if (result.status === 200) {
      if (debug_this_ui) {
        console.log("transactions.tsx - received transaction details");
      }

      const data = await AsyncStorage.getItem("transactions");

      if (data) {
        const transactionList = JSON.parse(data);

        setTransactionsList(transactionList);
      }
    } else {
      console.error(result.status, result.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <ScrollView style={globalStyles.transactionScrollViewContainer}>
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
    </ScrollView>
  );
};

export default TransactionsScreen;
