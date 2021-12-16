import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

export const follow = async (userId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.post(`${API_URL}/follow/${userId}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const unfollow = async (userId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.delete(`${API_URL}/follow/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
