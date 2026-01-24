import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  fetchAccountFromEmail,
  fetchAccountFromPhone,
  sendTo,
} from "../../services/controller";
import globalStyles from "../globalStyles";

const currencyLogo = require("../../assets/images/currency.png");

const john_info = {
  email: "john.doe@opences.org",
  phone: "+32123456789",
  account: "243-0040-00003",
};

const jane_info = {
  email: "jane.doe@opences.org",
  phone: "+32223456789",
  account: "244-0040-00004",
};

const debug_this_ui = false;

const SendScreen = () => {
  const [sendToEmail, setSendToEmail] = useState(jane_info.email);
  const [sendToPhone, setSendToPhone] = useState(jane_info.phone);
  const [sendToAccount, setSendToAccount] = useState(jane_info.account);
  const [amount, setAmount] = useState("1.01");
  const [accountBalance, setAccountBalance] = useState(0);
  const [isEmailBox_visible, setIsEmailBox_visible] = useState(false);
  const [isPhoneBox_visible, setIsPhoneBox_visible] = useState(false);
  const [isAccountBox_visible, setIsAccountBox_visible] = useState(true);

  const fetchDetails = async () => {
    if (debug_this_ui) {
      console.log("send.tsx - fetch detail");
    }

    // Account data
    const data = await AsyncStorage.getItem("account");
    if (data) {
      if (debug_this_ui) {
        console.log("send.tsx - account info", data);
      }

      const accountData = JSON.parse(data);

      setAccountBalance(accountData.balance);
    }
  };

  const setJaneDoe = async () => {
    if (debug_this_ui) {
      console.log("send.tsx - Set Jane Doe");
    }

    setSendToEmail(jane_info.email);
    setSendToPhone(jane_info.phone);
    setSendToAccount(jane_info.account);
  };

  const setJohnDoe = async () => {
    if (debug_this_ui) {
      console.log("send.tsx - Set John Doe");
    }
    setSendToEmail(john_info.email);
    setSendToPhone(john_info.phone);
    setSendToAccount(john_info.account);
  };

  const sendAction = async () => {
    if (debug_this_ui) {
      console.log("send.tsx - Send Action");
    }

    const amountValue = parseFloat(amount);

    let accountNumber = null;
    if (isAccountBox_visible) {
      accountNumber = sendToAccount;
    } else if (isPhoneBox_visible) {
      const result = await fetchAccountFromPhone(sendToPhone);
      if (result && result.status === 200) {
        accountNumber = result.accountNumber;
      }
    } else if (isEmailBox_visible) {
      const result = await fetchAccountFromEmail(sendToEmail);
      if (result && result.status === 200) {
        accountNumber = result.accountNumber;
      }
    }

    if (!accountNumber) {
      Alert.alert(
        "Invalid Recipient",
        "Could not find account for the provided recipient details."
      );
      return;
    }

    const result = await sendTo(accountNumber, amountValue);
    if (result.status !== 201) {
      if (debug_this_ui) {
        console.log("send.tsx - Send Failed with status ", result.status);
      }
      Alert.alert("Send Failed", result.message);
    }
  };

  const confirmSend = () => {
    if (debug_this_ui) {
      console.log("send.tsx - Confirm Send");
    }

    const amountValue = parseFloat(amount);

    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount greater than zero."
      );
      return;
    }

    if (amountValue > accountBalance) {
      Alert.alert(
        "Insufficient Funds",
        "You do not have enough balance to complete this transaction."
      );
      return;
    }

    Alert.alert(
      "Confirm Send",
      `Are you sure you want to send ${amount} to ${
        isAccountBox_visible
          ? sendToAccount
          : isEmailBox_visible
          ? sendToEmail
          : sendToPhone
      }?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => sendAction(),
        },
      ]
    );
  };

  // Fetch details on component mount
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.menuHeaderContainer}>
        <View style={globalStyles.rowContainerWbackground}>
          <View style={globalStyles.columnContainer}>
            <Text style={globalStyles.amount_display_text}>Send : </Text>
            <TextInput
              placeholder="0.00"
              style={globalStyles.amount_input_text}
              value={amount}
              onChangeText={setAmount}
              onFocus={() => setAmount("")}
              autoCapitalize="none"
              keyboardType="numeric"
            />
            <Image
              source={currencyLogo}
              style={globalStyles.amount_unit_image}
            />
          </View>

          <View style={globalStyles.columnContainer}>
            <Text>Current balance : {accountBalance}</Text>
            <Image source={currencyLogo} style={globalStyles.small_image} />
            <TouchableOpacity
              style={globalStyles.smallButton}
              onPress={() => {
                setAmount(accountBalance.toString());
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>MAX</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={globalStyles.rowContainerWbackground}>
          <View style={globalStyles.columnContainer}>
            <TouchableOpacity
              style={[
                globalStyles.tabButton,
                {
                  backgroundColor: isAccountBox_visible
                    ? globalStyles.activeTabButton.backgroundColor
                    : globalStyles.tabButton.backgroundColor,
                },
              ]}
              onPress={() => {
                setIsAccountBox_visible(true);
                setIsEmailBox_visible(false);
                setIsPhoneBox_visible(false);
              }}
            >
              <Text>Account #</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.tabButton,
                {
                  backgroundColor: isEmailBox_visible
                    ? globalStyles.activeTabButton.backgroundColor
                    : globalStyles.tabButton.backgroundColor,
                },
              ]}
              onPress={() => {
                setIsAccountBox_visible(false);
                setIsEmailBox_visible(true);
                setIsPhoneBox_visible(false);
              }}
            >
              <Text>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.tabButton,
                {
                  backgroundColor: isPhoneBox_visible
                    ? globalStyles.activeTabButton.backgroundColor
                    : globalStyles.tabButton.backgroundColor,
                },
              ]}
              onPress={() => {
                setIsAccountBox_visible(false);
                setIsEmailBox_visible(false);
                setIsPhoneBox_visible(true);
              }}
            >
              <Text>Phone</Text>
            </TouchableOpacity>
          </View>
          {isAccountBox_visible && (
            <TextInput
              placeholder="Account #"
              style={globalStyles.input}
              value={sendToAccount}
              onChangeText={setSendToAccount}
              autoCapitalize="none"
              keyboardType="number-pad"
            />
          )}
          {isEmailBox_visible && (
            <TextInput
              placeholder="Email"
              style={globalStyles.input}
              value={sendToEmail}
              onChangeText={setSendToEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
          {isPhoneBox_visible && (
            <TextInput
              placeholder="Phone"
              style={globalStyles.input}
              value={sendToPhone}
              onChangeText={setSendToPhone}
              autoCapitalize="none"
              keyboardType="phone-pad"
            />
          )}
        </View>
        <View></View>
        <TouchableOpacity
          style={globalStyles.roundedButton}
          onPress={() => {
            confirmSend();
          }}
        >
          <Text>Send now</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={globalStyles.columnContainer}>
          <TouchableOpacity
            style={globalStyles.smallTestButton}
            onPress={() => setJohnDoe()}
          >
            <Text>John Doe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.smallTestButton}
            onPress={() => setJaneDoe()}
          >
            <Text>Jane Doe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendScreen;
