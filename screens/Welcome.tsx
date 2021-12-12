import { NavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AppText from "../components/AppText";
import YellowButton from "../components/buttons/YellowButton";
import ViewCenter from "../components/ViewCenter";
import tw from "../utils/tailwind";

export interface WelcomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const Welcome: FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ViewCenter>
      <Text style={tw`text-2xl mb-10 font-bold`}>
        <AppText>Welcome to hashtage!</AppText>
      </Text>
      <View style={tw`items-center w-1/2 justify-between`}>
        <YellowButton
          text="Signup"
          full={true}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        ></YellowButton>
        <TouchableOpacity
          style={tw`py-2 px-4 w-full bg-gray-100 rounded-lg mt-3`}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={tw`text-center font-sans-bold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </ViewCenter>
  );
};

export default Welcome;
