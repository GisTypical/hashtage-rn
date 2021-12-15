import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

export const getProfile = async (userId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.get(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
