import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import globalStyles from "../globalStyles";

const debug_this_ui = false;
const button_size = 40;

import { performLogout } from "../../services/controller";

const MoreScreen = () => {
  // Fetch details on component mount
  useEffect(() => { }, []);

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
                console.log("more.tsx - Menu - Link this app");
              }
              router.push("/menu/linkThisApp");
            }}
          >
            <MaterialIcons name="link" color="black" size={button_size} />
          </TouchableOpacity>
          <Text>Link this app</Text>
        </View>
      </View>

      <View style={globalStyles.actionButtonContainer}>
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.actionButton}
            onPress={() => {
              if (debug_this_ui) {
                console.log("more.tsx - Menu - Contacts");
              }
              router.push("/menu/contacts");
            }}
          >
            <MaterialIcons name="contacts" color="black" size={button_size} />
          </TouchableOpacity>
          <Text>Contacts</Text>
        </View>

         <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.actionButton}
            onPress={() => {
              if (debug_this_ui) {
                console.log("more.tsx - Menu - Merchants");
              }
              router.push("/menu/merchant");
            }}
          >
            <MaterialIcons name="store" color="black" size={button_size} />
          </TouchableOpacity>
          <Text>Merchants</Text>
        </View>

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.actionButton}
            onPress={() => {
              if (debug_this_ui) {
                console.log("more.tsx - Menu - Logout");
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
