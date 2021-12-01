import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "twrnc";

interface Props {
  text: string;
  onPress: () => void;
}

const GreenButton: FC<Props> = ({ text, onPress }) => {
  return (
    <>
      <TouchableOpacity
        style={tailwind`bg-green-500 py-2 px-4 rounded-lg items-center`}
        onPress={onPress}
      >
        <Text style={tailwind`font-bold`}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

export default GreenButton;