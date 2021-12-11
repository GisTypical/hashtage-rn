import React, { ReactNode } from "react";
import { Text } from "react-native";
import tw from "../utils/tailwind";

interface Props {
  children: ReactNode;
  mb?: boolean;
}

const AppText = ({ children, mb }: Props) => {
  return (
    <Text style={tw.style(`font-sans`, mb ? "mb-1" : "")}>{children}</Text>
  );
};

export default AppText;
