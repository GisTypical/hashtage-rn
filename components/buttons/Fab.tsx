import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "twrnc";

interface Props {}

const Fab = (props: Props) => {
  return (
    <TouchableOpacity
      style={tailwind`bg-yellow-500 rounded-full absolute bottom-8 right-8`}
    >
      <Text>+</Text>
    </TouchableOpacity>
  );
};

export default Fab;
