import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  fetchCurrency,
  fetchUserDetails,
  performLogout,
} from "../../services/controller";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Transaction from "../components/Transaction";
import globalStyles from "../globalStyles";

const currencyLogo = require("../../assets/images/currency.png");

const debug_this_ui = false

const MenuScreen = () => {
  const button_size = 40;

  const [userName, setUserName] = useState("Default User");
  const [accountBalance, setAccountBalance] = useState(0.0);

  const [accountNumber, setAccountNumber] = useState("1234567890");
  const [transactionsList, setTransactionsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const fetchDetails = async () => {
    if (debug_this_ui) {
      console.log("menu.tsx - fetching user details");
    }

    // Get other information
    await fetchCurrency();

    // Get user details
    const result = await fetchUserDetails();
    if (result.status === 200) {
      if (debug_this_ui) {
        console.log("menu.tsx - recieved user details");
      }

      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const userData = JSON.parse(data);

        const user = userData.firstname + " " + userData.lastname;

        if (debug_this_ui) {
          console.log("menu.tsx - user : ", user);
        }

        setUserName(user);
      }

      // Account data
      const data2 = await AsyncStorage.getItem("account");

      if (data2) {
        const accountData = JSON.parse(data2);

        if (debug_this_ui) {
          console.log(
            "menu.tsx - account info : ",
            accountData.number,
            "balance :",
            accountData.balance
          );
        }

        setAccountBalance(accountData.balance);
        setAccountNumber(accountData.number);
        setTransactionsList(accountData.latestTransactions);
      }
    } else {
      console.error(result.status, result.message);
    }
  };

  // Fetch details on component mount
  useEffect(() => {
    fetchDetails();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true); // Show the refresh indicator
    await fetchDetails(); // Fetch the latest data
    setRefreshing(false); // Hide the refresh indicator
  };

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView
        style={globalStyles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={globalStyles.menuHeaderContainer}>
          <View style={globalStyles.columnContainer}>
            <View style={globalStyles.leftColumn}>
              <TouchableOpacity
                onPress={() => {
                  if (debug_this_ui) {
                    console.log("index.tsx - Menu - Go to User Info Screen");
                  }
                  router.push("/menu/user");
                }}
              >
                <MaterialIcons name="person" color="black" size={button_size} />
              </TouchableOpacity>
            </View>
            <View style={globalStyles.middleColumn}>
              <Image source={currencyLogo} style={globalStyles.menu_image} />
            </View>
            <View style={globalStyles.rightColumn}>
              <TouchableOpacity
                onPress={() => {
                  if (debug_this_ui) {
                    console.log("index.tsx - Menu - Logout");
                  }
                  performLogout();
                }}
              >
                <MaterialIcons name="logout" color="black" size={button_size} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={globalStyles.balanceContainer}>
            <Text style={globalStyles.balanceText}>{accountBalance}</Text>
            <Image
              source={currencyLogo}
              style={globalStyles.amount_unit_image}
            />
          </View>
          <Text style={globalStyles.accountNumber}>{userName}</Text>
          <Text style={globalStyles.accountNumber}># {accountNumber}</Text>
        </View>

        <View style={globalStyles.actionButtonContainer}>
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              style={globalStyles.actionButton}
              onPress={() => {
                if (debug_this_ui) {
                  console.log("index.tsx - Menu - Go to Send Screen");
                }
                router.push("/menu/send");
              }}
            >
              <MaterialIcons
                name="arrow-upward"
                color="black"
                size={button_size}
              />
            </TouchableOpacity>
            <Text>Transfer</Text>
          </View>

         

          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              style={globalStyles.actionButton}
              onPress={() => {
                if (debug_this_ui) {
                  console.log("index.tsx - Menu - Go to Receive Screen");
                }
                router.push("/menu/receive");
              }}
            >
              <MaterialIcons
                name="arrow-downward"
                color="black"
                size={button_size}
              />
            </TouchableOpacity>
            <Text>Receive</Text>
          </View>

           <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              style={globalStyles.actionButton}
              onPress={() => {
                if (debug_this_ui) {
                  console.log("index.tsx - Menu - Go to Top Up Screen");
                }
                router.push("/menu/topup");
              }}
            >
              <MaterialIcons
                name="add-circle"
                color="black"
                size={button_size}
              />
            </TouchableOpacity>
            <Text>Top-up</Text>
          </View>

          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              style={globalStyles.actionButton}
              onPress={() => {
                 if (debug_this_ui) {
                  console.log("index.tsx - Menu - More");
                }
              }}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                color="black"
                size={button_size}
              />
            </TouchableOpacity>
            <Text>More</Text>
          </View>
        </View>

        <View style={globalStyles.transactionLogContainer}>
          <View style={globalStyles.transactionLogHeader}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}
            >
              Latest Transactions
            </Text>
            <TouchableOpacity
              style={globalStyles.roundedButton}
              onPress={() => {
                if (debug_this_ui) {
                  console.log("index.tsx - Menu - Go to Transactions Screen");
                }
                router.push("/menu/transactions");
              }}
            >
              <Text>View All</Text>
            </TouchableOpacity>
          </View>

          {Array.isArray(transactionsList) && transactionsList.length > 0 ? (
            transactionsList.map((transaction: any, index: number) => (
              <Transaction
                key={index}
                date={transaction.createdAt}
                description={transaction.description}
                transactionType={transaction.transactionType}
                amount={transaction.amount}
              />
            ))
          ) : (
            <Text>No transactions available.</Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={globalStyles.floatingButton}
        onPress={() => {
          if (debug_this_ui) {
            console.log("index.tsx - Menu - Scan");
          }
          router.push("/menu/scan");
        }}
      >
        <MaterialIcons name="qr-code-scanner" size={60} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default MenuScreen;
