import React from "react";
import { Text, View } from "react-native";
import tailwind from "twrnc";
import tw from "../utils/tailwind";
import AppText from "./AppText";

interface Props {
  username: string | undefined;
}

export const UserPictureCircle = ({ username }: Props) => {
  return (
    <View
      style={tailwind`bg-yellow-500 w-12 h-12 rounded-full justify-center items-center`}
    >
      <AppText>
        <Text style={tw`text-base text-yellow-900 font-bold`}>
          {username?.charAt(0).toLocaleUpperCase()}
        </Text>
      </AppText>
    </View>
  );
};

export default UserPictureCircle;
