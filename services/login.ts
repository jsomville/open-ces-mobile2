import axios from "axios";

import config from "../app/config";

import * as SecureStore from "expo-secure-store";

export const login = async (username: string, password: string) => {
  try {
    if (config.debug_web_request) {
      console.log("login request");
    }

    const url = `${config.api_base_url}/api/idp/login`;
    const headers = {
      "Content-Type": "application/json",
    };
    const payload = {
      username,
      password,
    };

    // Actual call
    const response = await axios.post(url, payload, {
      headers,
      validateStatus: (status) => status < 500, // treat 4xx as resolved, only 5xx as error
    });

    if (response.status === 200) {
      // Store the access token
      const accessToken = response.data.accessToken;
      await SecureStore.setItemAsync("accessToken", accessToken);

      // Store the refresh token
      const refreshToken = response.data.refreshToken;
      await SecureStore.setItemAsync("refreshToken", refreshToken);

      // Last Login time
      await SecureStore.setItemAsync("lastLogin", username);

      return {
        status: 200,
        message: "Login successful",
      };
    } else {
      return {
        status: response.status,
        message: "Invalid username or password",
      };
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = await SecureStore.getItemAsync("accessToken");

    const url = `${config.api_base_url}/api/idp/logout`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const payload = {};

    // Actual call
    const response = await axios.post(url, payload, {
      headers,
      validateStatus: (status) => status < 500,
    });

    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const refreshAccessToken = async () => {
  // Get refresh token from store
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  if (!refreshToken) return null;

  try {
    // Get a new Access Token
    const url = `${config.api_base_url}/api/idp/refresh`;

    const token = await SecureStore.getItemAsync("accessToken");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      refreshToken,
    };

    const response = await axios.post(url, payload, {
      headers,
      validateStatus: (status) => status < 500,
    });

    if (response.status === 200) {
      const newAccessToken = response.data.accessToken;
      await SecureStore.setItemAsync("accessToken", newAccessToken);

      return newAccessToken;
    } else {
      console.error("Failed to refresh access token:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};
