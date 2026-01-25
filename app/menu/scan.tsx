import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import globalStyles from "../globalStyles";

const debug_this_ui = true;

const ScanScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={globalStyles.mainContainer}>
        <Text>We need camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    const jsonScannedData = JSON.parse(data);

    if (debug_this_ui) {
      console.log("scan.tsx - data:", data);
      console.log("scan.tsx - data typeof : ", typeof data);

      console.log("scan.tsx - jsonScannedData: ", jsonScannedData);
      console.log("scan.tsx - jsonScannedData typeof:", typeof jsonScannedData);

      console.log("scan.tsx - number data:", jsonScannedData.number);
      console.log("scan.tsx - amount data:", jsonScannedData.amount);
      console.log("scan.tsx - description data:", jsonScannedData.description);
    }

    AsyncStorage.setItem("lastScannedData", JSON.stringify(jsonScannedData));

    router.replace("/menu/pay");
  };

  return (
    <View style={globalStyles.mainContainer}>
      <CameraView
        style={globalStyles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default ScanScreen;
