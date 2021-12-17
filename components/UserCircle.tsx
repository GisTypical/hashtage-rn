import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Text, TouchableHighlight } from "react-native";
import tailwind from "twrnc";
import tw from "../utils/tailwind";
import { UserProfile } from "../utils/types";
import AppText from "./AppText";

interface Props {
  author?: UserProfile;
  navigation?: NavigationProp<any>;
  disabled?: boolean;
}

export const UserPictureCircle = ({ author, navigation, disabled }: Props) => {
  return (
    <TouchableHighlight
      style={tailwind`bg-yellow-500 w-12 h-12 rounded-full justify-center items-center`}
      onPress={() => navigation?.navigate("Profile", author?.id)}
      underlayColor={"rgb(217, 119, 6)"}
      disabled={disabled}
    >
      <AppText>
        <Text style={tw`text-base text-yellow-900 font-bold`}>
          {author?.username?.charAt(0).toLocaleUpperCase()}
        </Text>
      </AppText>
    </TouchableHighlight>
  );
};

export default UserPictureCircle;
