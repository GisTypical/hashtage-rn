import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "react-native-dotenv";
import { Post } from "./types";

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

export const createTweet = async (post: Post) => {
  const formData = new FormData();
  formData.append("text", post.text);
  if (post.imagesUp) {
    formData.append("images", {
      type: "image/*",
      // @ts-ignore
      uri: post.imagesUp.uri,
      name: post.imagesUp.name,
    });
  }
  console.log(formData);
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.post(`${API_URL}/post`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
