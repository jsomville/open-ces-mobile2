import { Platform } from "react-native";
import Constants from "expo-constants";
import { router } from "expo-router";
import {
  Alert,
  Image,
  Linking,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import globalStyles from "../globalStyles";

import { login } from "../../services/login";

import {
  fetchAboutCurrencies,
  getCurrentAboutCurrency,
} from "../../services/controller";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const currencyLogo = require("../../assets/images/currency.png");

const appLogo = require("../../assets/images/logo.png");

const debug_this_ui = false;

const LoginScreen = () => {
  const version = Constants.expoConfig?.version;

  const [isAppOk, setAppOk] = useState(false);
  const [registerURL, setRegisterURL] = useState("");
  const [latestAppVersion, setLatestAppVersion] = useState("");
  const [latestAppURL, setLatestAppURL] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const register = async () => {
    if (debug_this_ui) {
      console.log("index.tsx - Navigate to Register");
    }

    await Linking.openURL(registerURL);
  };

  // TEMPORARY FUNCTIONS TO AUTO FILL CREDENTIALS
  const setJaneDoe = async () => {
    if (debug_this_ui) {
      console.log("index.tsx - Set Jane Doe");
    }
    setUsername("jane.doe@opences.org");
    setPassword("OpenCES123!");
  };

  const setJohnDoe = async () => {
    if (debug_this_ui) {
      console.log("index.tsx - Set John Doe");
    }
    setUsername("john.doe@opences.org");
    setPassword("OpenCES123!");
  };
  ////******************************* */

  const handleLogin = async () => {
    if (debug_this_ui) {
      console.log("index.tsx - Handle Login");
    }

    if (!username || !password) {
      Alert.alert("Validation Error", "Please enter both email and password");
      return;
    }

    try {
      const result = await login(username, password);

      if (result.status === 200) {
        // Clear sync storage
        await AsyncStorage.clear();
        if (debug_this_ui) {
          console.log("index.tsx - Login Successful");
        }

        router.replace("/menu");
      } else {
        Alert.alert("Login Failed", result.message);
      }
    } catch (error) {
      if (debug_this_ui) {
        console.log("index.tsx - Login error : ", error);
      }

      Alert.alert(
        "Login Error",
        "An error occurred during login. Please try again.",
      );
    }
  };

  const displayLastLogin = async () => {
    try {
      if (debug_this_ui) {
        console.log("index.tsx - Display Last Login");
      }

      const lastLogin = await SecureStore.getItemAsync("lastLogin");
      if (lastLogin) {
        setUsername(lastLogin);
      }
    } catch (error) {
      console.error("Error retrieving last login:", error);
    }
  };

  const checkCurrencyDetails = async () => {
    try {
      if (debug_this_ui) {
        console.log("index.tsx - Check Currency Details");
      }

      //Make sure to refresh Currency About
      await fetchAboutCurrencies();

      const thisCurrency = await getCurrentAboutCurrency();
      if (debug_this_ui){
        console.log("index.tsx - thisCurrency fetched", thisCurrency);
      }

      if (thisCurrency) {
        setRegisterURL(thisCurrency.newAccountWizardURL);

        const appVersion = thisCurrency.androidAppLatestVersion;
        const appURL = thisCurrency.androidAppURL;

        if (Platform.OS === "android") {
          setLatestAppURL(appURL);
          setLatestAppVersion(appVersion);
        }

        if (appVersion === version) {
          setAppOk(true);
        } else {
          await displayAppUpdateAlert(appURL, appVersion);
        }
      }
    } catch (error) {
      console.error("Error checking app version:", error);
    }
  };

  const displayAppUpdateAlert = async (url: string, version:string) => {
    Alert.alert(
      "Update Available",
      `A new version (${version}) is available. Please update the app.`,
      [
        {
          text: "Update",
          onPress: () => {
            Linking.openURL(url);
          },
        },
      ],
    );
  };

  // Fetch details on component mount
  useEffect(() => {
    displayLastLogin();
    checkCurrencyDetails();
  }, []);

  return (
    <View style={globalStyles.loginContainer}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={globalStyles.menuHeaderContainer}>
        <View style={globalStyles.columnContainer}>
          <Image source={currencyLogo} style={globalStyles.login_image} />
        </View>
        <View>
          <View>
            <Text style={globalStyles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={globalStyles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View>
            <Text style={globalStyles.label}>Password</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Enter your password"
                style={globalStyles.password_input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  style={globalStyles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={globalStyles.actionButtonContainer}>
          <Text
            style={globalStyles.hyperlink}
            onPress={() => {
              register();
            }}
          >
            Create new account
          </Text>
          {isAppOk && (
            <TouchableOpacity
              style={globalStyles.roundedButton}
              onPress={() => {
                handleLogin();
              }}
            >
              <Text>Login</Text>
            </TouchableOpacity>
          )}
          {!isAppOk && (
            <TouchableOpacity
              style={globalStyles.roundedButton}
              onPress={() => {
                Linking.openURL(latestAppURL);
              }}
            >
              <Text>Update</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

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

      <View style={globalStyles.footerContainer}>
        <View style={globalStyles.columnContainer}>
          <View style={globalStyles.columnContainer}>
            <Text>Powered by</Text>
            <Image source={appLogo} style={globalStyles.small_logo_image} />
          </View>
          <Text>Version : {version}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
