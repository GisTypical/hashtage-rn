import { NavigationProp } from "@react-navigation/native";
import { useMutation } from "react-query";
import { register } from "../utils/Auth";
import { User } from "../utils/types";

interface Props {
  navigation: NavigationProp<any>;
}

const useSignup = ({ navigation }: Props) => {
  return useMutation((user: User) => register(user), {
    onSuccess: () => {
      navigation.navigate("Login");
    },
  });
};

export default useSignup;
