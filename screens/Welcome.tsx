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
      <View style={tailwind`items-center w-1/2 justify-between`}>
        <YellowButton
          text="Signup"
          full={true}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        ></YellowButton>
        <TouchableOpacity
          style={tailwind`py-2 px-4 w-full bg-gray-100 rounded-lg mt-3`}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={tailwind`text-center font-bold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </ViewCenter>
  );
};

export default Welcome;
