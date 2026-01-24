import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "../globalStyles";

const msg =
  "The simple way to top up your account is to perfrom a bank transfer with your account number in the communication. This transaction will be managed in 24 hrs.";

const bank = "BE88 5231 4071 4541";

const TopUpScreen = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");

  const fetchDetails = async () => {
    const data = await AsyncStorage.getItem("account");

    if (data) {
      const accountData = JSON.parse(data);

      setAccountNumber(accountData.number);
    }
  };

  // Fetch details on component mount
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <Text style={globalStyles.info_label}>{msg}</Text>

      <View style= {globalStyles.columnContainer}>
        <Text style={globalStyles.info_label}>Bank Account : {bank}</Text>
        <TouchableOpacity style={globalStyles.smallButton} onPress={() => {
            Clipboard.setStringAsync(bank)
        }}>
          <MaterialIcons name="content-copy" color="black" />
        </TouchableOpacity>
      </View>

      <View style= {globalStyles.columnContainer}>
        <Text style={globalStyles.info_label}>
          Communication : {accountNumber}
        </Text>
        <TouchableOpacity style={globalStyles.smallButton} onPress={() => {
            Clipboard.setStringAsync(accountNumber)
        }}>
          <MaterialIcons name="content-copy" color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopUpScreen;
