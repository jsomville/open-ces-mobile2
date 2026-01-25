import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "../globalStyles";
import config from "../config";

const debug_this_ui = false;
const button_size = 40;

import { performLogout } from "../../services/controller";

const MoreScreen = () => {
  // Fetch details on component mount
  useEffect(() => {}, []);

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.actionButtonContainer}>
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.actionButton}
            onPress={() => {
              if (debug_this_ui) {
                console.log("more.tsx - Go to Top Up Screen");
              }
              router.push("/menu/topup");
            }}
          >
            <MaterialIcons name="add-circle" color="black" size={button_size} />
          </TouchableOpacity>
          <Text>Top-up</Text>
        </View>

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.actionButton}
            onPress={() => {
              if (debug_this_ui) {
                console.log("more.tsx - Go to User Info Screen");
              }
              router.push("/menu/user");
            }}
          >
            <MaterialIcons name="person" color="black" size={button_size} />
          </TouchableOpacity>
          <Text>User Info</Text>
        </View>

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.actionButton}
            onPress={() => {
              if (debug_this_ui) {
                console.log("index.tsx - Menu - Logout");
              }
              performLogout();
            }}
          >
            <MaterialIcons name="logout" color="black" size={button_size} />
          </TouchableOpacity>
          <Text>Logout</Text>
        </View>
      </View>
    </View>
  );
};

export default MoreScreen;
