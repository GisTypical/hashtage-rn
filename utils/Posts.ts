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

export const getThread = async (postId: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.get(`${API_URL}/post/${postId}`, {
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
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.post(`${API_URL}/post`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const commentTweet = async (comment: Post, postId: string) => {
  const formData = new FormData();
  formData.append("text", comment.text);
  if (comment.imagesUp) {
    formData.append("images", {
      type: "image/*",
      // @ts-ignore
      uri: comment.imagesUp.uri,
      name: comment.imagesUp.name,
    });
  }
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.post(`${API_URL}/post/comment/${postId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const retweet = async (postId: string | undefined) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.post(`${API_URL}/post/retweet/${postId}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTweet = async (postId: string | undefined) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.delete(`${API_URL}/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const searchPost = async (searchValue: string) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return axios.get(`${API_URL}/search/${searchValue}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
