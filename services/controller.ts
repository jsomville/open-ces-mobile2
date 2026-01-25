import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import config from "../app/config";
import { getAccountFromEmail, getAccountFromPhone } from "./accountService";
import { getCurrency } from "./currency";
import { logout, refreshAccessToken } from "./login";
import { send } from "./send";
import { getTransaction } from "./transaction";
import { getUserDetails } from "./userDetail";
import { getAboutCurrencies } from "./aboutCurrency";

const debug_controller = false;

export const doRefreshAccessToken = async () => {
  if (debug_controller) {
    console.log("Controller - doRefreshAccessToken called");
  }

  const result = await refreshAccessToken();

  if (result === 403) {
    if (debug_controller) {
      console.log(
        "Controller - doRefreshAccessToken - Refresh token expired, logging out...",
      );
    }

    await performLogout();
  }

  return result;
};

export const fetchUserDetails = async () => {
  if (debug_controller) {
    console.log("Controller - fetchUserDetails called");
  }

  let result = await getUserDetails();

  if (result) {
    if (result.status === 403) {
      if (debug_controller) {
        console.log("Controller - fetchUserAccount - Refreshing Access Token");
      }

      // Access token expired, refresh it
      await doRefreshAccessToken();

      // Retry fetching user details
      result = await getUserDetails();
    }

    // Logic here to extract the correct info from the user data
    // get this app currency account from symbol
    const data = await AsyncStorage.getItem("userData");
    if (data) {
      const userData = JSON.parse(data);

      const account = userData.accounts.find(
        (acc: any) => acc.currencyId === config.app_currency_id,
      );

      if (debug_controller) {
        console.log("Controller - fetchUserAccount - Account:", account);
      }

      if (account) {
        // Store account data
        const accountData = JSON.stringify(account);

        if (debug_controller) {
          console.log(
            "Controller - fetchUserAccount - Account data:",
            accountData,
          );
        }

        await AsyncStorage.setItem("account", accountData);
      }
    }
  } else {
    console.log("ERROR : fetchUserDetails failed - no result");
  }

  return result;
};

export const fetchCurrency = async () => {
  if (debug_controller) {
    console.log("Controller - fetchCurrency called");
  }

  const currency = await AsyncStorage.getItem("currency");
  if (currency === null) {
    await getCurrency();
  }
};

export const fetchTransaction = async () => {
  if (debug_controller) {
    console.log("Controller - fetchTransaction called");
  }

  let result = await getTransaction();

  if (result && result.status === 403) {
    if (debug_controller) {
      console.log("Controller - fetchTransaction - Refreshing Access Token");
    }

    // Access token expired, refresh it
    await doRefreshAccessToken();

    // Retry fetching transactions
    result = await getTransaction();
  }

  return result;
};

export const performLogout = async () => {
  if (debug_controller) {
    console.log("Controller - performLogout called");
  }

  const result = await logout();
  if (debug_controller) {
    console.log("Controller - performLogout - logout result:", result);
  }

  // Clear Data
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
  await AsyncStorage.clear();

  router.replace("/login");
};

export const sendTo = async (account: string, amount: number) => {
  if (debug_controller) {
    console.log("Controller - sendTo called with:", account, amount);
  }

  let result = await send(account, amount);

  if (result) {
    if (result.status === 403) {
      if (debug_controller) {
        console.log("Controller - sendTo - Refreshing Access Token");
      }

      // Access token expired, refresh it
      await doRefreshAccessToken();

      result = await send(account, amount);
    }

    if (result) {
      if (result.status === 201) {
        if (debug_controller) {
          console.log("Controller - sendTo - Send successful");
        }

        router.back();
      } else {
        if (debug_controller) {
          console.log(
            "Controller - sendTo - Send failed with status",
            result.status,
          );
        }

        router.back();
      }
    }
  }
  return result;
};

export const fetchAccountFromEmail = async (email: string) => {
  if (debug_controller) {
    console.log("Controller - fetchAccountFromEmail called");
  }

  const symbol = config.app_currency_symbol;

  console.log("Fetching account for email:", email, "symbol:", symbol);

  const result = await getAccountFromEmail(email, symbol);
  if (result.status === 200) {
    const sentAccountDetail = await SecureStore.getItemAsync("sentAccountData");
    // TODO : Store in favorites
  }
  return result;
};

export const fetchAccountFromPhone = async (phone: string) => {
  if (debug_controller) {
    console.log("Controller - fetchAccountFromPhone called");
  }

  const symbol = config.app_currency_symbol;

  console.log("Fetching account for phone:", phone, "symbol:", symbol);

  const result = await getAccountFromPhone(phone, symbol);
  if (result.status === 200) {
    const sentAccountDetail = await SecureStore.getItemAsync("sentAccountData");
    // TODO : Store in favorites
  }
  return result;
};

export const pay = async (account: string, amount: number) => {
  if (debug_controller) {
    console.log("Controller Pay called with:", account, amount);
  }

  let result = await send(account, amount);

  if (result) {
    if (result.status === 403) {
      if (debug_controller) {
        console.log("Controller - pay - Refreshing Access Token");
      }

      // Access token expired, refresh it
      await doRefreshAccessToken();

      result = await send(account, amount);
    }

    if (result) {
      if (result.status === 201) {
        if (debug_controller) {
          console.log("Controller - pay - Successful");
        }
        router.back();
      } else {
        if (debug_controller) {
          console.log("Controller - pay - Failed with status", result.status);
        }
      }
    }
    return result;
  }
};

export const fetchAboutCurrencies = async () => {
  if (debug_controller) {
    console.log("Controller - fetchAboutCurrencies called");
  }

  let result = await getAboutCurrencies();

  return result;
};

export const getCurrentAboutCurrency = async () => {
  if (debug_controller) {
    console.log("Controller - getCurrentAboutCurrency");
  }

  let data = await AsyncStorage.getItem("aboutCurrencies");
  if (!data) {
    await fetchAboutCurrencies();

    data = await AsyncStorage.getItem("aboutCurrencies");
  }

  if (data) {
    const jsonData = JSON.parse(data);

    // Convert to array if it's an object, or use as-is if already an array
    const aboutCurrencies = Array.isArray(jsonData.currencies)
      ? jsonData.currencies
      : Object.values(jsonData);

    const thisCurrency = aboutCurrencies.find(
      (item: any) => item.symbol === config.app_currency_symbol,
    );

    return thisCurrency;
  }

  return null;
};
