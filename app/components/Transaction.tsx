import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";


import globalStyles from "../globalStyles";
const currencyLogo = require("../../assets/images/currency.png");

const debug_this_ui = false;

const Transaction = ({ date, transactionType, description, amount }: { date: string; transactionType: string, description: string; amount: string | number }) => {
  const navigation = useNavigation();
  // Parse the date
  const parsedDate = new Date(date);
  const day = parsedDate.getDate(); // Day of the month
  const month = parsedDate.toLocaleString("default", { month: "short" }); // Short month name (e.g., "Jan")

  const formattedAmount = parseFloat(amount as string).toFixed(2);
  const formattedAbsoluteAmount = Math.abs(parseFloat(amount as string)).toFixed(2);
  const isPositive = parseFloat(amount as string) >= 0;

  const displayTransactionDetail = async () => {
    if (debug_this_ui) {
      console.log("Transaction.tsx - Displaying transaction details:");
    }

    router.push({
      pathname: "/menu/oneTransaction",
      params: {
        date,
        transactionType,
        description,
        amount: formattedAmount,
      },
    });
  };

  return (
    <TouchableOpacity onPress={displayTransactionDetail} style={globalStyles.transactionRow}>
      <View style={globalStyles.transactionDate}>
        <Text style={globalStyles.transactionDay}>{day}</Text>
        <Text style={globalStyles.transactionMonth}>{month}</Text>
      </View>
      <View style={globalStyles.transactionDetails}>
        <Text style={globalStyles.transactionType}>
          {transactionType}
        </Text>
        <Text style={globalStyles.transactionDescription}>{description}</Text>
      </View>
      <View style={globalStyles.transactionAmountContainer}>
        <Text style={globalStyles.transactionAmount}>
          <Text style={{ color: isPositive ? 'green' : 'red' }}>
            {isPositive ? '+ ' : '- '}
          </Text>
          {formattedAbsoluteAmount}
        </Text>
        <Image source={currencyLogo} style={globalStyles.small_image} />
      </View>
    </ TouchableOpacity>
  );
};


export default Transaction;