import { NavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import YellowButton from "../components/buttons/YellowButton";
import ViewCenter from "../components/ViewCenter";

export interface WelcomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const Welcome: FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ViewCenter>
      <Text style={tailwind`text-2xl mb-10`}>Welcome to hashtage!</Text>
      <View style={tailwind`flex-row items-center`}>
        <YellowButton
          text="Signup"
          onPress={() => {
            navigation.navigate("Signup");
          }}
        ></YellowButton>
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
