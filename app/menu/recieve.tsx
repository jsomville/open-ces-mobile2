import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import globalStyles from "../globalStyles";

const currencyLogo = require("../../assets/images/currency.png");

const debug_this_ui = true;

const ReceiveScreen = () => {
  const [qrValue, setQrValue] = useState("initial-value");
  const [amount, setAmount] = useState("0.00");

  const updateQRCode = async () => {
    if (debug_this_ui) {
      console.log("receive.tsx - updating QR code");
    }

    const data = await AsyncStorage.getItem("account");
    if (data) {
      const accountData = JSON.parse(data);

      //Validate the amount
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount < 0) {
        if (debug_this_ui) {
          console.log("receive.tsx - Invalid amount:", amount);
        }
        return;
      }

      const dataToEncode = {
        number: accountData.number,
        amount: numericAmount,
        description: "payment",
      };

      setQrValue(JSON.stringify(dataToEncode));
    }
  };

  // Fetch details on component mount
  /*useEffect(() => {
    updateQRCode();
  }, []);*/

  // Update QR code when amount changes
  useEffect(() => {
    updateQRCode();
  }, [amount]);

  return (
    <View style={globalStyles.mainContainer}>
      <View>
        <View style={globalStyles.columnContainer}>
          <Text style={globalStyles.amount_display_text}>Send : </Text>
          <TextInput
            placeholder="0.00"
            style={globalStyles.amount_input_text}
            value={amount}
            onChangeText={setAmount}
            onFocus={() => setAmount("")}
            autoCapitalize="none"
            keyboardType="number-pad"
          />
          <Image source={currencyLogo} style={globalStyles.amount_unit_image} />
        </View>
      </View>
      <View style={{ height: 20 }} />
      <QRCode
        value={qrValue}
        size={250}
        color="black"
        backgroundColor="white"
        logo={currencyLogo}
        logoSize={50}
        logoBackgroundColor="white"
      />
      <View style={{ height: 20 }} />
      <TouchableOpacity
        style={globalStyles.roundedButton}
        onPress={() => {
          updateQRCode();
        }}
      >
        <Text>Update QR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReceiveScreen;
