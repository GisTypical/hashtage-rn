import React from "react";
import { TouchableOpacity } from "react-native";
import tailwind from "twrnc";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
}

const Fab = ({ children, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={tailwind`bg-yellow-500 rounded-full absolute bottom-7 right-7 w-14 h-14 items-center justify-center`}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Fab;
