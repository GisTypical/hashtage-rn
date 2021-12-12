import React from "react";
import { Text } from "react-native";
import tw from "../utils/tailwind";
import AppText from "./AppText";

interface Props {
  text: string;
}

const Title = ({ text }: Props) => {
  return (
    <AppText>
      <Text style={tw`text-xl font-bold`}>{text}</Text>
    </AppText>
  );
};

export default Title;
