import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import AppText from "../components/AppText";
import Title from "../components/Title";
import Search from "../screens/Search";
import tw from "../utils/tailwind";
import addTweetsRoutes from "./addTweetsRoutes";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{
          headerTitle: () => <Title text="Search"></Title>,
        }}
      ></Stack.Screen>
      {addTweetsRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default SearchStack;
