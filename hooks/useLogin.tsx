import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useMutation } from "react-query";
import { AuthContext } from "../components/providers/AuthProvider";
import { login } from "../utils/Auth";
import { Message, User } from "../utils/types";

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
