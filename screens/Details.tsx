import React, { FC } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

interface Params {
  route: {
    params: string;
  };
}

const Details: FC<Params> = ({ route }) => {
  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <Text>Here are some details</Text>
      <Text>{route.params}</Text>
    </View>
  );
};

export default Details;
