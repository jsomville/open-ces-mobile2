import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "../globalStyles";
import config from "../config";

const msg =
  "The simple way to top up your account is to perfrom a bank transfer with your account number in the communication. This transaction will be managed in 24 hrs.";

const bank = "BE12 1234 1234 1234";

const debug_this_ui = true;

const TopUpScreen = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [topUpURL, setTopUpURL] = useState<string>("");

  const fetchDetails = async () => {
    if (debug_this_ui) {
      console.log("topup.tsx - fetch detail");
    }

    const data = await AsyncStorage.getItem("account");
    if (data) {
      const accountData = JSON.parse(data);

      if (debug_this_ui) {
        console.log("topup.tsx - account info", accountData);
      }

      setAccountNumber(accountData.number);

      await setUrL(accountData.number);
    }
  };

  const setUrL = async (accountNumber: string) => {
    const currency = await AsyncStorage.getItem("currency");
    if (currency) {
      const jsonData = JSON.parse(currency);

      if (debug_this_ui) {
        console.log("topup.tsx - currency info", jsonData);
      }

      const currencyData = jsonData.find(
        (item: any) => item.symbol === config.app_currency_symbol,
      );

      if (currencyData) {
        const url = currencyData.topOffWizardURL + accountNumber;

        if (debug_this_ui) {
          console.log("topup.tsx - top Up URL", url);
        }

        setTopUpURL(url);
      }
    }
  };

  const topUpLink = async () => {
    if (topUpURL) {
      await Linking.openURL(topUpURL);
    } else {
      console.log("Top Up URL not available");
    }
  };

  // Fetch details on component mount
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <Text style={globalStyles.info_label}>{msg}</Text>

      <View style={globalStyles.columnContainer}>
        <Text style={globalStyles.info_label}>Bank Account : {bank}</Text>
        <TouchableOpacity
          style={globalStyles.smallButton}
          onPress={() => {
            Clipboard.setStringAsync(bank);
          }}
        >
          <MaterialIcons name="content-copy" color="black" />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.columnContainer}>
        <Text style={globalStyles.info_label}>
          Communication : {accountNumber}
        </Text>
        <TouchableOpacity
          style={globalStyles.smallButton}
          onPress={() => {
            Clipboard.setStringAsync(accountNumber);
          }}
        >
          <MaterialIcons name="content-copy" color="black" />
        </TouchableOpacity>
      </View>
      <View style={globalStyles.columnContainer}>
        <Text
          style={globalStyles.hyperlink}
          onPress={() => {
            topUpLink();
          }}
        >
          Top-Up
        </Text>
      </View>
    </View>
  );
};

export default TopUpScreen;
