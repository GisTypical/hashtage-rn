import axios from "axios";
import { User } from "./types";
import { API_URL } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = (user: User) => {
  return axios.post(`${API_URL}/register`, user);
};

export const login = (user: User) => {
  return axios.post(`${API_URL}/login`, user);
};

export const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  return axios.post(`${API_URL}/refresh-token`, null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
