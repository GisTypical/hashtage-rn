import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import { useMutation } from "react-query";
import { login } from "../utils/Auth";
import { User, Message } from "../utils/types";
import { AuthContext } from "../components/providers/AuthProvider";

const useLogin = () => {
  const { handleLogin } = useContext(AuthContext);

  return useMutation((user: User) => login(user), {
    // On on login success
    onSuccess: async ({ data }: { data: Message }) => {
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
      handleLogin(data.accessToken);
    },
  });
};

export default useLogin;
