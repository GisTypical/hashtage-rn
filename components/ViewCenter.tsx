import React, { FC } from "react";
import { View } from "react-native";
import tw from "twrnc";

type Props = {
  children: React.ReactNode;
};

const ViewCenter: FC<Props> = ({ children }) => {
  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      {children}
    </View>
  );
};

export default ViewCenter;
