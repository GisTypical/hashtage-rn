import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

export const getPosts = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.get(`${API_URL}/post`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
