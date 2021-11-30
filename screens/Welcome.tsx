import { NavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import GreenButton from "../components/buttons/GreenButton";
import ViewCenter from "../components/ViewCenter";

export interface WelcomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const Welcome: FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ViewCenter>
      <Text style={tailwind`text-2xl mb-10`}>Welcome to hashtage!</Text>
      <View style={tailwind`flex-row items-center`}>
        <GreenButton
          text="Signup"
          onPress={() => {
            navigation.navigate("Signup");
          }}
        ></GreenButton>
        <TouchableOpacity
          style={tailwind`py-2 px-4`}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </ViewCenter>
  );
};

export default Welcome;
