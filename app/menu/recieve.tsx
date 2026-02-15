import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import globalStyles from "../globalStyles";

const currencyLogo = require("../../assets/images/currency.png");

const debug_this_ui = false;

const ReceiveScreen = () => {
  const { width: screenWidth } = useWindowDimensions();
  const qrSize = Math.min(screenWidth * 0.8, 400); // 80% of screen width, max 400

  const [qrValue, setQrValue] = useState("initial-value");
  const [amount, setAmount] = useState("0.00");
  const [description, setDescription] = useState("");

  const sanitizeAmount = (text: string) => {
    const cleaned = text.replace(/,/g, ".").replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");

    if (parts.length <= 1) {
      return cleaned;
    }

    return `${parts[0]}.${parts.slice(1).join("")}`;
  };

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
        description: description,
      };

      setQrValue(JSON.stringify(dataToEncode));
    }
  };

  // Refresh screen
  useEffect(() => {
    updateQRCode();
  }, [amount]);

  return (
    <View style={globalStyles.mainContainer}>
      <View>
        <View style={globalStyles.columnContainer}>
          <Text style={globalStyles.amount_display_text}>Amount : </Text>
          <TextInput
            placeholder="0.00"
            style={globalStyles.amount_input_text}
            value={amount}
            onChangeText={(text) => setAmount(sanitizeAmount(text))}
            onFocus={() => setAmount("")}
            autoCapitalize="none"
            keyboardType="decimal-pad"
            maxLength={7}
          />
          <Image source={currencyLogo} style={globalStyles.amount_unit_image} />
        </View>
        <View >
          <Text style={globalStyles.label}>Description (optional) : </Text>
          <TextInput
            placeholder="Description"
            style={globalStyles.input}
            value={description}
            onChangeText={setDescription}
            autoCapitalize="none"
            maxLength={100}
          />
        </View>
      </View>
      <View style={{ height: 20 }} />
      <QRCode
        value={qrValue}
        size={qrSize}
        color="black"
        backgroundColor="white"
        logo={currencyLogo}
        logoSize={qrSize * 0.16}
        logoBackgroundColor="white"
      />
    </View>
  );
};

export default ReceiveScreen;
