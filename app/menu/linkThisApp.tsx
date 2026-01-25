import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import globalStyles from "../globalStyles";
import { getCurrentAboutCurrency } from "@/services/controller";

const currencyLogo = require("../../assets/images/currency.png");

const debug_this_ui = false;

const LinkThisAppScreen = () => {
  const [qrValue, setQrValue] = useState("");

  const updateQRCode = async () => {
    if (debug_this_ui) {
      console.log("linkThisApp.tsx - updating QR code");
    }

    const thisCurrency = await getCurrentAboutCurrency();
    if (thisCurrency && thisCurrency.androidAppURL) {
      setQrValue(thisCurrency.androidAppURL);
      if (debug_this_ui) {
        console.log("QR code set to:", thisCurrency.androidAppURL);
      }
    }
  };

  // Fetch details on component mount
  useEffect(() => {
    updateQRCode();
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Scan to download the app
      </Text>
      <View style={{ height: 20 }} />
      {qrValue ? (
        <QRCode
          value={qrValue}
          size={250}
          color="black"
          backgroundColor="white"
          logo={currencyLogo}
          logoSize={50}
          logoBackgroundColor="white"
        />
      ) : (
        <Text>Loading QR code...</Text>
      )}
      <View style={{ height: 20 }} />
    </View>
  );
};

export default LinkThisAppScreen;
