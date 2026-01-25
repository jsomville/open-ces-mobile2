import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import globalStyles from "../globalStyles";

import { pay } from "../../services/controller";

const currencyLogo = require("../../assets/images/currency.png");

const debug_this_ui = true;

const PayScreen = () => {
  const [amount, setAmount] = useState("0.00");
  const [account, setAccount] = useState("123-4567-89001");

  const fetchDetails = async () => {
    try {
      // Account data
      const data = await AsyncStorage.getItem("lastScannedData");
      if (data) {
        if (debug_this_ui) {
          console.log("pay.tsx - raw data:", data);
          console.log("pay.tsx - data type:", typeof data);
        }

        const scannedData = JSON.parse(data);
        if (debug_this_ui) {
          console.log("pay.tsx - parsed scanned data:", scannedData);
          console.log("pay.tsx - scanned data type:", typeof scannedData);
        }

           const scannedData2 = JSON.parse(data);
        if (debug_this_ui) {
          console.log("pay.tsx - parsed scanned data:", scannedData2);
          console.log("pay.tsx - scanned data type:", typeof scannedData2 );
        } 

        if (scannedData2.number) {
          setAccount(scannedData2.number);
        }
        if (scannedData2.amount) {
          setAmount(scannedData2.amount.toString());
        }
      }
    } catch (error) {
      console.error("pay.tsx - Error fetching scanned data:", error);
    }
  };

  const payAction = async () => {
    if (debug_this_ui) {
      console.log("pay.tsx - Paying", amount, "to", account);
    }

    const result = await pay(account, parseFloat(amount));
  };

  // Fetch details on component mount
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.columnContainer}>
        <Text style={globalStyles.label}>To Account : {account}</Text>
      </View>
      <View style={globalStyles.columnContainer}>
        <Text style={globalStyles.amount_display_text}>Send : </Text>
        <TextInput
          placeholder="0.00"
          style={globalStyles.amount_input_text}
          value={amount}
          onChangeText={setAmount}
          onFocus={() => setAmount("0.00")}
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <Image source={currencyLogo} style={globalStyles.amount_unit_image} />
      </View>
      <TouchableOpacity
        style={globalStyles.smallButton}
        onPress={() => {
          payAction();
          console.log("payAction");
        }}
      >
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PayScreen;
