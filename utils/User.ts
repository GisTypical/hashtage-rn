import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "react-native-dotenv";
import { UserProfile } from "./types";

export const editUser = async (values: UserProfile) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios({
    method: "put",
    url: `${API_URL}/user`,
    data: values,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
