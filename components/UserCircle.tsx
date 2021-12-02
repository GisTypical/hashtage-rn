import React from "react";
import { Text, View } from "react-native";
import tailwind from "twrnc";

interface Props {
  username: string | undefined;
}

export const UserPictureCircle = ({ username }: Props) => {
  return (
    <View
      style={tailwind`bg-yellow-500 w-12 h-12 ml-4 mt-3 rounded-full justify-center items-center`}
    >
      <Text>{username?.charAt(0).toLocaleUpperCase()}</Text>
    </View>
  );
};

export default UserPictureCircle;
