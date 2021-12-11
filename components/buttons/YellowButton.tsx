import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "twrnc";
import AppText from "../AppText";

interface Props {
  text: string;
  full?: boolean;
  onPress: () => void;
}

const YellowButton: FC<Props> = ({ text, onPress, full }) => {
  return (
    <>
      <TouchableOpacity
        style={tailwind`bg-yellow-500 py-2 px-4 rounded-lg items-center ${
          full ? "w-full " : ""
        }`}
        onPress={onPress}
      >
        <AppText>
          <Text style={tailwind`font-bold`}>{text}</Text>
        </AppText>
      </TouchableOpacity>
    </>
  );
};

export default YellowButton;
