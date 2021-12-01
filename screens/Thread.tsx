import React from "react";
import { View, Text } from "react-native";

interface Props {
  route: {
    params: string;
  };
}

const Thread = ({ route }: Props) => {
  return (
    <View>
      <Text>Thread</Text>
      <Text>{route.params}</Text>
    </View>
  );
};

export default Thread;
